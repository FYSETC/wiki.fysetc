import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import * as Unified from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const parser = (Unified.unified || Unified.default)().use(remarkParse).use(remarkGfm).use(remarkFrontmatter);
const apply = process.argv.includes('--apply');
const files = execFileSync('rg', ['--files', '-g', '*.md', '-g', '*.mdx', '-g', '!node_modules/**', '-g', '!build/**', '-g', '!.docusaurus/**'], {cwd: root, encoding: 'utf8'}).trim().split(/\r?\n/).filter(Boolean);
const span = node => [node.position.start.offset, node.position.end.offset];
const overlaps = (range, other) => range[0] < other[1] && range[1] > other[0];
function analyze(text) {
  const tree = parser.parse(text);
  const protectedRanges = [];
  const units = [];
  const escapeMarkers = [];
  const signatures = {images: [], links: [], code: [], tables: [], listItems: 0};
  const listStarts = [];
  const listOffsets = [];
  let tableImages = 0;
  function visit(node, ancestors = []) {
    if (['code', 'inlineCode', 'yaml', 'toml', 'table'].includes(node.type)) protectedRanges.push(span(node));
    if (['code', 'inlineCode', 'yaml', 'toml'].includes(node.type)) signatures.code.push([node.type, node.value]);
    if (node.type === 'table') signatures.tables.push(text.slice(...span(node)));
    if (node.type === 'listItem') {
      signatures.listItems++;
      const line = text.slice(node.position.start.offset).split(/\r?\n/)[0];
      listStarts.push(line);
      listOffsets.push({offset: node.position.start.offset, line});
    }
    if (['link', 'linkReference'].includes(node.type)) signatures.links.push([node.type, node.url || node.identifier]);
    if (['image', 'imageReference'].includes(node.type)) {
      signatures.images.push([node.type, node.url || node.identifier, node.alt]);
      if (ancestors.some(parent => parent.type === 'table')) tableImages++;
      else {
        const link = ancestors.findLast(parent => ['link', 'linkReference'].includes(parent.type));
        const heading = ancestors.findLast(parent => parent.type === 'heading');
        // Keep setext headings intact rather than turning their underline into a rule.
        const setext = heading && /\r?\n[ \t]*[=-]+[ \t]*$/.test(text.slice(...span(heading)));
        units.push({range: span(setext ? heading : link || node), ancestors});
      }
    }
    for (const child of node.children || []) visit(child, [...ancestors, node]);
  }
  visit(tree);
  for (const match of text.matchAll(/<!--[\s\S]*?-->|<(table|pre|code|script)\b[^>]*>[\s\S]*?<\/\1\s*>/gi)) {
    protectedRanges.push([match.index, match.index + match[0].length]);
    if (/^<table\b/i.test(match[0])) {
      tableImages += (match[0].match(/<img\b/gi) || []).length;
      signatures.tables.push(match[0]);
    }
  }
  const htmlLinks = [...text.matchAll(/<a\b[^>]*>[\s\S]*?<\/a\s*>/gi)].filter(match => /<img\b/i.test(match[0]));
  for (const match of text.matchAll(/<img\b[^>]*>/gi)) {
    const range = [match.index, match.index + match[0].length];
    if (protectedRanges.some(protectedRange => overlaps(range, protectedRange))) continue;
    signatures.images.push(['html', match[0].match(/\bsrc\s*=\s*(["'])(.*?)\1/is)?.[2] || '', match[0].match(/\balt\s*=\s*(["'])(.*?)\1/is)?.[2] || '']);
    const link = htmlLinks.find(link => range[0] >= link.index && range[1] <= link.index + link[0].length);
    const selected = link ? [link.index, link.index + link[0].length] : range;
    // Escape a literal symbol when ending the HTML block would turn it into a list.
    const symbol = text.slice(selected[1]).match(/^\r?\n[ \t]*[+*-][ \t]*(?=\r?\n|$)/);
    if (symbol) escapeMarkers.push(selected[1] + symbol[0].search(/[+*-]/));
    const ancestors = [];
    function locate(node) {
      if (!node.position || selected[0] < node.position.start.offset || selected[1] > node.position.end.offset) return;
      ancestors.push(node);
      for (const child of node.children || []) locate(child);
    }
    locate(tree);
    units.push({range: selected, ancestors});
  }
  return {units: [...new Map(units.map(unit => [unit.range.join(':'), unit])).values()].sort((a, b) => a.range[0] - b.range[0]), signatures, tableImages, listStarts, listOffsets, escapeMarkers};
}

function format(text) {
  const before = analyze(text);
  const newline = text.includes('\r\n') ? '\r\n' : '\n';
  const gaps = new Map();
  const escapes = new Set(before.escapeMarkers);
  function addGap(start, end, indent) {
    const original = text.slice(start, end);
    if (/\r?\n[ \t]*\r?\n/.test(original)) return;
    const gap = newline + newline + indent;
    gaps.set(start + ':' + end, {start, end, value: gap});
  }
  for (const {range: [start, end], ancestors} of before.units) {
    const item = ancestors.findLast(node => node.type === 'listItem');
    let continuation = '';
    if (item) {
      const itemStart = item.position.start.offset;
      const marker = text.slice(itemStart).match(/^(?:[-+*]|\d+[.)])[ \t]+/);
      continuation = ' '.repeat(item.position.start.column - 1 + (marker?.[0].length || 2));
    }
    const lineStart = text.lastIndexOf('\n', start - 1) + 1;
    const linePrefix = text.slice(lineStart, start);
    // A bullet or heading marker belongs with its image; don't strand it on an empty line.
    if (!item && /^[ \t]*[-+*]$/.test(linePrefix)) escapes.add(lineStart + linePrefix.search(/[-+*]/));
    const ownLine = /^[ \t]*(?:(?:[-+*]|\d+[.)])[ \t]+|#{1,6}[ \t]+)?$/.test(linePrefix);
    const beforeStart = ownLine ? lineStart : start;
    let left = beforeStart;
    while (left > 0 && /\s/.test(text[left - 1])) left--;
    addGap(left, beforeStart, ownLine ? '' : continuation);
    let right = end;
    while (right < text.length && /\s/.test(text[right])) right++;
    const existingGap = text.slice(end, right);
    const indent = existingGap.includes('\n') ? existingGap.slice(existingGap.lastIndexOf('\n') + 1) : continuation;
    addGap(end, right, right === text.length ? '' : indent);
  }
  function applyGaps() {
    let result = text;
    const edits = [...gaps.values(), ...[...escapes].map(offset => ({start: offset, end: offset, value: '\\'}))];
    for (const edit of edits.sort((a, b) => b.start - a.start)) result = result.slice(0, edit.start) + edit.value + result.slice(edit.end);
    return result;
  }
  let result = applyGaps();
  let after = analyze(result);
  if (after.signatures.listItems < before.signatures.listItems) {
    // Ending an HTML image paragraph must not absorb the following numbered item.
    for (const item of before.listOffsets.filter(item => !after.listStarts.includes(item.line))) {
      const start = text.lastIndexOf('\n', item.offset - 1) + 1;
      let left = start;
      while (left > 0 && /\s/.test(text[left - 1])) left--;
      addGap(left, start, '');
    }
    result = applyGaps();
    after = analyze(result);
  }
  const content = value => value.replace(/\\([+*-])/g, '$1').replace(/\s/g, '');
  if (content(result) !== content(text)) throw new Error('Document content changed');
  // Blank lines may create paragraphs, but must not alter images, links, code, tables or list membership.
  if (JSON.stringify(before.signatures) !== JSON.stringify(after.signatures)) {
    const differences = Object.keys(before.signatures).filter(key => JSON.stringify(before.signatures[key]) !== JSON.stringify(after.signatures[key]));
    throw new Error('Document structure changed: ' + JSON.stringify(Object.fromEntries(differences.map(key => [key, {before: key === 'listItems' ? before.listStarts : before.signatures[key], after: key === 'listItems' ? after.listStarts : after.signatures[key]}]))));
  }
  return {text: result, images: before.units.length, tableImages: before.tableImages, gapsAdded: gaps.size, literalMarkersEscaped: escapes.size};
}

const changes = [];
const errors = [];
let images = 0;
let tableImages = 0;
for (const relative of files) {
  const file = path.join(root, relative);
  const original = fs.readFileSync(file, 'utf8');
  try {
    const result = format(original);
    images += result.images;
    tableImages += result.tableImages;
    if (result.text !== original) changes.push({file, relative, original, ...result});
  } catch (error) { errors.push({file: relative, error: error.message}); }
}
if (errors.length) { console.log(JSON.stringify({errors}, null, 2)); process.exitCode = 1; }
else {
  for (const change of changes) {
    if (format(change.text).text !== change.text) throw new Error('Formatting is not idempotent: ' + change.relative);
  }
  if (apply) {
    for (const change of changes) if (fs.readFileSync(change.file, 'utf8') !== change.original) throw new Error('Document changed during formatting: ' + change.relative);
    for (const change of changes) fs.writeFileSync(change.file, change.text);
  }
  const report = {apply, scannedDocuments: files.length, changedDocuments: changes.length,
    imageBlocks: images, tableImagesPreserved: tableImages,
    blankLineGapsAdded: changes.reduce((sum, change) => sum + change.gapsAdded, 0),
    literalMarkersEscaped: changes.reduce((sum, change) => sum + change.literalMarkersEscaped, 0),
    files: changes.map(change => ({file: change.relative.replaceAll('\\', '/'), imageBlocks: change.images, blankLineGapsAdded: change.gapsAdded, literalMarkersEscaped: change.literalMarkersEscaped}))};
  fs.writeFileSync(path.join(root, 'migration/image-spacing-report.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({...report, files: report.files.slice(0, 12)}, null, 2));
}
