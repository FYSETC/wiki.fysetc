// Import a local HelpLook export. Run without --apply to inspect the plan.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import YAML from 'yaml';
import {formatHelpLook} from './helplook-format.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.resolve(process.argv.find(arg => arg.startsWith('--source='))?.slice(9) || path.join(root, '../helplook_docs/docs'));
const apply = process.argv.includes('--apply');
const slash = value => value.replaceAll('\\', '/');
const norm = value => value.replace(/\.md$/i, '').replace(/\.zh$/i, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const walk = folder => fs.readdirSync(folder, {withFileTypes: true}).flatMap(entry => entry.isDirectory() ? walk(path.join(folder, entry.name)) : [path.join(folder, entry.name)]);
const localeRoot = locale => path.join(root, `i18n/${locale}/docusaurus-plugin-content-docs/current`);
const read = file => fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
function parse(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  return {meta: match ? YAML.parse(match[1]) || {} : {}, body: match ? text.slice(match[0].length) : text, front: match?.[0] || ''};
}
const serialize = (meta, body) => '---\n' + YAML.stringify(meta, {lineWidth: 100}).trimEnd() + '\n---\n\n' + body.trimStart();
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const slugify = name => name.replace(/\.md$/i, '').replace(/\.zh$/i, '').replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-|-$/g, '');
const categories = {
  '3D Printer Kits': ['printer-kits', '3D 打印机套件', 'printer', 20],
  Controllers: ['controllers', '控制板', 'board', 30],
  'Stepper Drivers': ['drivers', '步进电机驱动', 'driver', 40],
  Modules: ['modules', '模块', 'module', 50],
  Sensors: ['sensors', '传感器', 'sensor', 60],
  Wireless: ['wireless', '无线产品', 'wireless', 70],
  'Mechanical Parts': ['mechanicals', '机械部件', 'mechanical', 80],
  'Upgrade Kits': ['upgrade-kits', '升级套件', 'upgrade', 90],
  Displays: ['displays', '显示面板', 'screen', 100],
  Tutorial: ['guides', '教程', 'book', 110],
  Cables: ['cables', '线材', 'folder', 115],
  FAQ: ['faq', '常见问题', 'book', 116],
  Others: ['others', '其他', 'folder', 117],
};
// Names changed in the earlier Wiki import; these are the same articles.
const aliases = {
  CHEETAH: 'Cheetah_Board', CHEETAH_V2_0: 'Cheetah_Board_V20', CHEETAH_V3_0: 'Cheatah_Board_V30',
  'CHEETAH_V2.0': 'Cheetah_Board_V20', 'CHEETAH_V3.0': 'Cheatah_Board_V30',
  'SILENT_2209': 'Silent2209', 'LED_Driver_V1.0': 'FYS_Boost_LED_Driver_V1.0',
  Displays: 'LCDs-and-Displays', Cables: 'Cables-and-Wires',
  'Prusa MMU2S Clone': 'Original-Prusa-MMU2S-clone', 'SB CAN Setup Guide': 'CAN-Setup-Guide',
  '3D Printer Kits': 'category-printer-kits',
};
const aliasMap = new Map(Object.entries(aliases).map(([key, value]) => [norm(key), norm(value)]));
const existing = walk(localeRoot('en')).filter(file => /\.mdx?$/.test(file)).map(file => ({file, relative: slash(path.relative(localeRoot('en'), file)), ...parse(read(file))}));
const byName = new Map();
for (const doc of existing) for (const key of [doc.meta.id, path.basename(doc.file), doc.meta.source_file].filter(Boolean)) byName.set(norm(key), doc);
const sourceFiles = walk(source).filter(file => /\.md$/i.test(file) && categories[slash(path.relative(source, file)).split('/')[0]]);
const groups = new Map();
for (const file of sourceFiles) {
  const relative = slash(path.relative(source, file));
  const key = relative.replace(/\.zh\.md$/i, '.md');
  const group = groups.get(key) || {source: key};
  group[/\.zh\.md$/i.test(file) ? 'zh' : 'en'] = file;
  groups.set(key, group);
}
const documents = [...groups.values()].map(group => {
  const parts = group.source.split('/');
  const basename = path.posix.basename(group.source, '.md');
  const key = norm(basename);
  const old = byName.get(aliasMap.get(key) || key);
  // Keep the Prusa grouping chosen during the local migration review.
  const prusaOthers = parts[0] === '3D Printer Kits' && ['prusammu2sclone', 'prusamk3sclone', 'prusaminiclone'].includes(key);
  const directory = prusaOthers ? 'printer-kits/others' : [categories[parts[0]][0], ...parts.slice(1, -1).map(slugify)].join('/');
  const id = old?.meta.id || slugify(basename);
  return {...group, old, id, slug: old?.meta.slug || '/' + id, target: directory + '/' + (old ? path.basename(old.file) : id + '.md')};
});
if (new Set(documents.map(doc => doc.target.toLowerCase())).size !== documents.length) throw new Error('Duplicate target document');

// Resolve cached image URLs using all export manifests, including renamed images.
const sourceImages = walk(path.join(source, 'images')).filter(file => !/\.(json|html|md|txt)$/i.test(file));
const imageByName = new Map();
for (const file of sourceImages) {
  const name = path.basename(file).toLowerCase();
  if (!imageByName.has(name) || path.dirname(file) === path.join(source, 'images')) imageByName.set(name, file);
}
const cleanUrl = url => {
  try { return decodeURIComponent(url.replaceAll('&amp;', '&')).replace(/[?#].*$/, ''); } catch { return url; }
};
const imageByUrl = new Map();
const imageNames = new Map();
function indexManifest(value, folder) {
  if (Array.isArray(value)) { for (const item of value) indexManifest(item, folder); return; }
  if (!value || typeof value !== 'object') return;
  const name = value.file || value['文件'];
  if (name) {
    const file = [path.join(folder, name), imageByName.get(path.basename(name).toLowerCase()),
      value.original_file && imageByName.get(path.basename(value.original_file).toLowerCase())].find(file => file && fs.existsSync(file));
    if (file) imageByName.set(path.basename(name).toLowerCase(), file);
    if (file && !/^[a-f0-9]{64}\./i.test(name)) imageNames.set(file, path.basename(name));
    if (file) for (const [key, url] of Object.entries(value)) if (typeof url === 'string' && /^https?:\/\//.test(url) && (key.includes('url') || key === '图片地址')) imageByUrl.set(cleanUrl(url), file);
  }
  for (const child of Object.values(value)) if (typeof child === 'object') indexManifest(child, folder);
}
for (const file of walk(path.join(source, 'images')).filter(file => path.basename(file) === 'manifest.json')) indexManifest(JSON.parse(read(file)), path.dirname(file));
// The HelpLook export lost the extension; its Crisp cache retains the same resource ID.
for (const [url, file] of imageByUrl) if (url.includes('/686c8e03211c5_')) imageByUrl.set('https://resource.helplook.net/docker_production/r1hy6v/article/TyhVfzfs/686c8e03211c5', file);
const targetImages = walk(path.join(root, 'static/images'));
const targetByName = new Map(targetImages.map(file => [path.basename(file).toLowerCase(), file]));
const downloaded = {
  'https://docs.duet3d.com/duet_boards/duet_3_mb6hc/duet_3_mb6hc_input_output.jpg': 'duet_3_mb6hc_input_output.jpg',
  'https://github.com/FYSETC/S2210/raw/main/assets/image.png': 's2210-jumper-diagram.png',
};
for (const [url, name] of Object.entries(downloaded)) if (targetByName.has(name)) imageByUrl.set(url, targetByName.get(name));
const imagesByHash = new Map(targetImages.map(file => [hash(file), slash(path.relative(path.join(root, 'static'), file))]));
const copied = new Map();
const imageResolutions = new Map();
const unresolved = new Map();
const incompleteLinks = new Map();
function imageUrl(url, article) {
  const clean = slash(cleanUrl(url.trim())).replace(/^\.?\/(https?:\/\/)/, '$1');
  if (!clean || /^data:/.test(clean)) return url;
  if (imageResolutions.has(clean)) return imageResolutions.get(clean);
  let cached;
  if (clean.startsWith('/images/')) {
    const local = path.join(root, 'static', clean);
    if (fs.existsSync(local)) return url;
  }
  cached = imageByUrl.get(clean) || imageByName.get(path.posix.basename(clean).toLowerCase());
  if (!cached && (clean.includes('/FYSETC/wiki.fysetc/') || clean.startsWith('images/'))) cached = targetByName.get(path.posix.basename(clean).toLowerCase());
  if (!cached) {
    if (!unresolved.has(url)) unresolved.set(url, new Set());
    unresolved.get(url).add(article);
    return url;
  }
  const digest = hash(cached);
  let target = imagesByHash.get(digest);
  if (!target) {
    let name = imageNames.get(cached) || path.basename(cached);
    // Spaces in Markdown destinations require encoding; keep the source filenames on disk.
    let relative = 'images/' + name;
    if (fs.existsSync(path.join(root, 'static', relative)) || copied.has(relative)) {
      if (fs.existsSync(path.join(root, 'static', relative)) && hash(path.join(root, 'static', relative)) === digest) target = relative;
      else { name = path.basename(name, path.extname(name)) + '-' + digest.slice(0, 10) + path.extname(name); relative = 'images/' + name; }
    }
    target ||= relative;
    if (!fs.existsSync(path.join(root, 'static', target))) copied.set(target, cached);
    imagesByHash.set(digest, target);
  }
  const result = '/' + target.split('/').map(encodeURIComponent).join('/');
  imageResolutions.set(clean, result);
  return result;
}

const docLinks = new Map();
for (const doc of documents) {
  for (const key of [path.posix.basename(doc.source, '.md'), doc.id, doc.old?.meta.title].filter(Boolean)) docLinks.set(norm(key), doc);
}
for (const [key, value] of aliasMap) if (docLinks.has(value)) docLinks.set(key, docLinks.get(value));
const official = JSON.parse(read(path.join(root, 'navigation/official-categories.json')));
for (const category of official.categories) for (const article of category.articles || []) {
  const doc = docLinks.get(norm(article.title));
  if (doc) docLinks.set('url:' + cleanUrl(article.url).replace(/\/$/, ''), doc);
}
function linkUrl(url, article) {
  if (!url || url.startsWith('#')) return url;
  let match;
  if (/^https?:\/\/wiki\.fysetc\.com\//i.test(url)) match = docLinks.get('url:' + cleanUrl(url).replace(/\/$/, '')) || docLinks.get(norm(cleanUrl(url).replace(/\/$/, '').split('/').pop()));
  else if (/\.md(?:#|$)/i.test(url) || !/^(?:[a-z]+:|\/)/i.test(url)) match = docLinks.get(norm(cleanUrl(url).split('/').pop()));
  if (match) return '/docs' + match.slug + '/' + (url.includes('#') ? '#' + url.split('#')[1] : '');
  return url;
}
function convert(body, article, sanitize = true) {
  // Preserve prose and code; transform destinations only outside fenced code blocks.
  return body.split(/(^```[^\n]*\n[\s\S]*?^```[^\n]*(?:\n|$))/gm).map((part, index) => {
    if (index % 2) return part;
    return part.replace(/!\[([^\]\n]*)\]\(([^\n]*?)\)/g, (all, alt, url) => {
      const mapped = imageUrl(url, article);
      return mapped === url ? all : `![${alt}](${mapped})`;
    }).replace(/<img\b[^>]*>/gi, tag => {
      const src = tag.match(/\bsrc\s*=\s*(["'])(.*?)\1/is)?.[2];
      if (src === undefined || src === 'h' || !src.trim() || /[\r\n]/.test(src)) {
        imageUrl(src || '(empty image source)', article);
        return '*Image unavailable in the source export.*';
      }
      return tag.replace(/\bsrc\s*=\s*(["'])(.*?)\1/gis, (all, quote, url) => `src=${quote}${imageUrl(url, article)}${quote}`);
    })
      .replace(/(?<!!)\[([^\]\n]*)\]\(([^\n]*?)\)/g, (all, label, url) => {
        if (sanitize && (!url.trim() || /^(h|ht)$/.test(url.trim()))) {
          incompleteLinks.set(article + ':' + label + ':' + url, {article, label, url});
          return label;
        }
        const mapped = linkUrl(url, article);
        return mapped === url ? all : `[${label}](${mapped})`;
      }).replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (all, attributes, label) => {
        const url = attributes.match(/\bhref\s*=\s*(["'])(.*?)\1/is)?.[2];
        if (sanitize && url !== undefined && !url.trim()) {
          incompleteLinks.set(article + ':html:' + label, {article, label, url});
          return label;
        }
        return all;
      });
  }).join('');
}
const report = {sourceDocuments: sourceFiles.length, logicalArticles: documents.length, existingArticles: documents.filter(doc => doc.old).length, newArticles: documents.filter(doc => !doc.old).length, articles: [], images: [], unresolvedImages: []};
const writes = new Map();
const moves = [];
function schedule(file, content) { if (!fs.existsSync(file) || read(file) !== content) writes.set(file, content); }
for (const doc of documents) {
  const actions = {};
  for (const locale of ['en', 'zh-Hans']) {
    const oldFile = doc.old && path.join(localeRoot(locale), doc.old.relative);
    const old = oldFile && fs.existsSync(oldFile) ? parse(read(oldFile)) : null;
    const target = path.join(localeRoot(locale), doc.target);
    // Existing locale content is preserved too, even when the export has a different variant.
    if (old) {
      const converted = convert(old.body, doc.source, false);
      schedule(target, old.front + converted);
      actions[locale] = oldFile === target ? 'preserved' : 'moved';
    } else {
      const from = (locale === 'zh-Hans' ? doc.zh : doc.en) || doc.en || doc.zh;
      const body = formatHelpLook(convert(parse(read(from)).body, doc.source));
      const meta = {...(old?.meta || {}), id: doc.id, title: old?.meta.title || path.posix.basename(doc.source, '.md'), slug: doc.slug,
        source_file: path.basename(from), source_language: /\.zh\.md$/i.test(from) ? 'zh' : 'en', helplook_source: slash(path.relative(source, from))};
      schedule(target, serialize(meta, body));
      actions[locale] = 'imported';
    }
    if (oldFile && oldFile !== target) moves.push([oldFile, target]);
  }
  // Resolve images in every source, including skipped duplicate articles.
  for (const from of [doc.en, doc.zh].filter(Boolean)) convert(parse(read(from)).body, slash(path.relative(source, from)));
  report.articles.push({source: slash(path.relative(source, doc.en || doc.zh)), translation: doc.zh ? slash(path.relative(source, doc.zh)) : null, target: doc.target, slug: doc.slug, actions});
}

// Real folders follow HelpLook; existing file names and slugs stay stable.
for (const [label, [folder, zh, icon, position]] of Object.entries(categories)) for (const locale of ['en', 'zh-Hans']) {
  const file = path.join(localeRoot(locale), folder, '_category_.json');
  const old = fs.existsSync(file) ? JSON.parse(read(file)) : {};
  const metadata = {...old, label: locale === 'en' ? label : zh, key: folder, position, collapsed: true,
    link: old.link || {type: 'generated-index', title: locale === 'en' ? label : zh, slug: '/category/' + folder}, customProps: {icon}};
  schedule(file, JSON.stringify(metadata, null, 2) + '\n');
}
const nested = new Set(documents.map(doc => path.posix.dirname(doc.target)).filter(folder => folder.includes('/')));
for (const directory of nested) for (const locale of ['en', 'zh-Hans']) {
  const categoryFile = path.join(localeRoot(locale), directory, '_category_.json');
  if (fs.existsSync(categoryFile)) continue;
  const doc = documents.find(doc => path.posix.dirname(doc.target) === directory);
  const label = path.posix.dirname(doc.source).split('/').pop();
  const landing = documents.find(doc => path.posix.dirname(doc.target) === directory && norm(path.posix.basename(doc.source, '.md')) === norm(label));
  const metadata = {label, key: directory, position: Number(label.match(/^\d+/)?.[0] || 10), collapsed: true};
  if (landing) metadata.link = {type: 'doc', id: directory + '/' + landing.id};
  schedule(categoryFile, JSON.stringify(metadata, null, 2) + '\n');
}
report.images = [...copied].map(([target, from]) => ({source: slash(path.relative(source, from)), target: 'static/' + target}));
report.unresolvedImages = [...unresolved].map(([url, articles]) => ({url, articles: [...articles]}));
report.incompleteSourceLinks = [...incompleteLinks.values()];
report.plannedFiles = [...writes.keys()].map(file => slash(path.relative(root, file)));
report.summary = {newArticles: report.newArticles, existingArticles: report.existingArticles, translationsImported: report.articles.filter(item => item.actions['zh-Hans'] === 'imported-translation').length, movedArticles: report.articles.filter(item => item.actions.en === 'moved').length, newImages: copied.size, resolvedImageUrls: imageResolutions.size, unresolvedImageUrls: unresolved.size, filesToWrite: writes.size};
if (apply) {
  for (const [file, content] of writes) { fs.mkdirSync(path.dirname(file), {recursive: true}); fs.writeFileSync(file, content); }
  for (const [from, to] of moves) if (fs.existsSync(from) && from !== to) fs.unlinkSync(from);
  for (const [relative, from] of copied) { const to = path.join(root, 'static', relative); fs.mkdirSync(path.dirname(to), {recursive: true}); fs.copyFileSync(from, to, fs.constants.COPYFILE_EXCL); }
  fs.mkdirSync(path.join(root, 'migration'), {recursive: true});
  fs.writeFileSync(path.join(root, 'migration/helplook-report.json'), JSON.stringify(report, null, 2) + '\n');
} else {
  fs.mkdirSync(path.join(root, 'migration'), {recursive: true});
  fs.writeFileSync(path.join(root, 'migration/helplook-plan.json'), JSON.stringify(report, null, 2) + '\n');
}
console.log(JSON.stringify({apply, ...report.summary, plannedFiles: report.plannedFiles.slice(0, 10), unresolved: report.unresolvedImages.slice(0, 15)}, null, 2));
