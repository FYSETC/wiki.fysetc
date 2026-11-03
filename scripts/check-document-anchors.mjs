import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import remarkMath from 'remark-math';
import YAML from 'yaml';

const require = createRequire(import.meta.url);
// Use the installed Docusaurus implementation, including explicit IDs and duplicate suffixes.
const headingsPlugin = require('@docusaurus/mdx-loader/lib/remark/headings/index.js').default;
const {admonitionTitleToDirectiveLabel} = require('@docusaurus/utils');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const documentRoot = locale => path.join(root, 'i18n', locale, 'docusaurus-plugin-content-docs/current');
const normalizeRoute = value => decodeURIComponent(value).replace(/\/$/, '') || '/';
const normalizeId = value => { try { return decodeURIComponent(value); } catch { return value; } };
const mdText = node => node.value ?? (node.children || []).map(mdText).join('');
const walk = (node, callback) => { callback(node); for (const child of node.children || []) walk(child, callback); };
const parser = () => unified().use(remarkParse).use(remarkGfm).use(remarkDirective).use(remarkMath);

async function readDocuments(locale) {
  const docs = [];
  const base = documentRoot(locale);
  for (const relative of (await fs.readdir(base, {recursive: true})).filter(name => /\.mdx?$/.test(name)).sort()) {
    const file = path.join(base, relative);
    const source = await fs.readFile(file, 'utf8');
    const front = source.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
    const meta = YAML.parse(front?.[1] || '') || {};
    const frontLength = front?.[0].length || 0;
    const body = source.slice(frontLength);
    const names = ['secondary', 'info', 'success', 'danger', 'note', 'tip', 'warning', 'important', 'caution'];
    const processed = admonitionTitleToDirectiveLabel(body, names);
    const processor = parser().use(headingsPlugin, {anchorsMaintainCase: false});
    const tree = await processor.run(processor.parse(processed));
    const ids = new Set();
    const headings = [];
    walk(tree, node => {
      if (node.type === 'heading') {
        const id = node.data.hProperties.id;
        ids.add(id);
        headings.push({id, depth: node.depth, text: mdText(node)});
      }
      if (node.attributes?.id) ids.add(node.attributes.id);
      if (node.type === 'html' && !node.value.startsWith('<!--')) {
        for (const match of node.value.matchAll(/\bid\s*=\s*(["'])(.*?)\1/gi)) ids.add(match[2]);
      }
    });
    const links = [];
    walk(parser().parse(body), node => {
      if (['link', 'definition'].includes(node.type) && node.url.includes('#')) {
        const start = node.position.start.offset;
        const segment = body.slice(start, node.position.end.offset);
        const urlStart = node.type === 'link' ? segment.lastIndexOf('](') + 2 : segment.indexOf(']:') + 2;
        const fragment = node.url.slice(node.url.indexOf('#') + 1);
        const hash = segment.indexOf('#', urlStart);
        if (fragment && hash >= 0 && segment.slice(hash + 1, hash + 1 + fragment.length) === fragment) {
          links.push({url: node.url, fragment, offset: frontLength + start + hash + 1, line: source.slice(0, frontLength + start).split('\n').length});
        }
      }
      if (node.type === 'html' && !node.value.startsWith('<!--')) {
        for (const match of node.value.matchAll(/\bhref\s*=\s*(["'])([^"']*#[^"']+)\1/gi)) {
          const url = match[2];
          const fragment = url.slice(url.indexOf('#') + 1);
          const hash = match[0].indexOf('#');
          links.push({url, fragment, offset: frontLength + node.position.start.offset + match.index + hash + 1,
            line: source.slice(0, frontLength + node.position.start.offset + match.index).split('\n').length});
        }
      }
    });
    docs.push({file, relative: relative.replaceAll('\\', '/'), source, meta, ids, headings, links});
  }
  return docs;
}

function translatedHeading(english, chinese, fragment) {
  const index = english.headings.findIndex(heading => heading.id === fragment);
  if (index < 0) return undefined;
  const en = english.headings[index];
  if (english.headings.length === chinese.headings.length &&
      english.headings.every((heading, i) => heading.depth === chinese.headings[i].depth)) {
    return chinese.headings[index];
  }
  // Numbered sections can still be matched if a translated page has extra headings.
  const number = en.text.match(/^\s*(\d+(?:\.\d+)*)(?:[.、\s]|$)/)?.[1];
  if (number) {
    const matches = chinese.headings.filter(heading => heading.depth === en.depth &&
      heading.text.match(/^\s*(\d+(?:\.\d+)*)(?:[.、\s]|$)/)?.[1] === number);
    if (matches.length === 1) return matches[0];
  }
  return undefined;
}

export async function auditDocumentAnchors({fix = false} = {}) {
  const [english, chinese] = await Promise.all([readDocuments('en'), readDocuments('zh-Hans')]);
  const englishByFile = new Map(english.map(doc => [doc.relative, doc]));
  const chineseByFile = new Map(chinese.map(doc => [doc.relative, doc]));
  const routeMap = new Map(chinese.map(doc => [normalizeRoute(doc.meta.slug || '/' + doc.relative.replace(/\.mdx?$/, '')), doc]));
  const changes = [];
  const unresolved = [];
  let checkedLinks = 0;
  let internalLinks = 0;
  for (const doc of chinese) {
    const edits = [];
    for (const link of doc.links) {
      checkedLinks++;
      const base = link.url.slice(0, link.url.indexOf('#')).split('?')[0];
      let target;
      if (!base) target = doc;
      else if (!/^[\w+.-]+:/.test(base) && !base.startsWith('//')) {
        if (/\.mdx?$/.test(base)) {
          const relative = path.posix.normalize(path.posix.join(path.posix.dirname(doc.relative), normalizeId(base)));
          target = chineseByFile.get(relative);
        } else {
          const route = base.replace(/^\/wiki\.fysetc\//, '/').replace(/^\/zh-Hans\//, '/').replace(/^\/?docs\//, '/');
          target = routeMap.get(normalizeRoute(route));
        }
      }
      if (!target) continue; // External sites and attachment fragments are outside this audit.
      internalLinks++;
      const fragment = normalizeId(link.fragment);
      if (target.ids.has(fragment)) continue;
      const translated = translatedHeading(englishByFile.get(target.relative) || {headings: []}, target, fragment);
      const item = {file: doc.relative, line: link.line, url: link.url, target: target.relative};
      if (!translated || !target.ids.has(translated.id)) {
        unresolved.push({...item, englishHeadingCount: englishByFile.get(target.relative)?.headings.length,
          chineseHeadingCount: target.headings.length});
        continue;
      }
      changes.push({...item, from: fragment, to: translated.id, targetHeading: translated.text});
      edits.push({start: link.offset, end: link.offset + link.fragment.length, value: translated.id});
    }
    if (fix && edits.length) {
      let result = doc.source;
      for (const edit of edits.sort((a, b) => b.start - a.start)) result = result.slice(0, edit.start) + edit.value + result.slice(edit.end);
      await fs.writeFile(doc.file, result);
    }
  }
  return {documents: chinese.length, checkedLinks, internalLinks, changedFiles: new Set(changes.map(item => item.file)).size,
    replacements: changes.length, applied: fix, changes, unresolved};
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const report = await auditDocumentAnchors({fix: process.argv.includes('--fix')});
  const reportFile = path.join(root, 'migration/anchor-repair-report.json');
  if (report.applied || process.argv.includes('--report')) await fs.writeFile(reportFile, JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify(report, null, 2));
  if (report.unresolved.length || (!report.applied && report.replacements)) process.exitCode = 1;
}
