import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import YAML from 'yaml';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const walk = folder => fs.readdirSync(folder, {withFileTypes: true}).flatMap(entry => entry.isDirectory() ? walk(path.join(folder, entry.name)) : [path.join(folder, entry.name)]);
const report = JSON.parse(fs.readFileSync(path.join(root, 'migration/helplook-report.json'), 'utf8'));
const roots = ['en', 'zh-Hans'].map(locale => path.join(root, `i18n/${locale}/docusaurus-plugin-content-docs/current`));
const files = roots.map(folder => walk(folder).filter(file => /\.mdx?$/.test(file)));
const relative = files.map((list, index) => list.map(file => path.relative(roots[index], file)).sort());
const errors = [];
if (JSON.stringify(relative[0]) !== JSON.stringify(relative[1])) errors.push('English and Chinese article paths differ');
const sourcePaths = report.articles.flatMap(article => [article.source, article.translation].filter(Boolean));
if (new Set(sourcePaths).size !== report.sourceDocuments) errors.push('Source coverage differs from source document count');
let imageReferences = 0;
const externalImages = [];
const slugs = [new Set(), new Set()];
const metadata = [new Map(), new Map()];
for (const [locale, list] of files.entries()) for (const file of list) {
  const text = fs.readFileSync(file, 'utf8');
  const meta = YAML.parse(text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || '') || {};
  metadata[locale].set(path.relative(roots[locale], file), meta);
  if (slugs[locale].has(meta.slug)) errors.push('Duplicate page URL: ' + meta.slug);
  slugs[locale].add(meta.slug);
  // Example markup in code blocks is intentionally not a rendered image.
  const prose = text.replace(/^\s*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\s*\1[^\n]*(?:\n|$)/gm, '');
  for (const image of prose.matchAll(/!\[[^\]\n]*\]\(([^\n]*?)\)|<img\b[^>]*?\bsrc=["']([^"']+)["']/gi)) {
    const url = image[1] || image[2];
    if (!url) continue;
    if (url.startsWith('/images/')) {
      imageReferences++;
      if (!fs.existsSync(path.join(root, 'static', decodeURIComponent(url)))) errors.push('Missing image: ' + url + ' in ' + file);
    } else if (/^https?:/.test(url)) externalImages.push({file: path.relative(root, file), url});
    else errors.push('Unresolved image: ' + url + ' in ' + file);
  }
}
for (const article of report.articles) for (const [index, folder] of roots.entries()) {
  const file = path.join(folder, article.target);
  if (!fs.existsSync(file)) errors.push('Missing article: ' + file);
  const meta = metadata[index].get(path.normalize(article.target));
  if (meta?.slug !== article.slug) errors.push('Changed page URL: ' + file);
}
for (const [file, meta] of metadata[0]) {
  const chinese = metadata[1].get(file);
  if (meta.id !== chinese?.id || meta.slug !== chinese?.slug) errors.push('Locale ID or URL differs: ' + file);
}
const hashes = new Map();
const duplicates = [];
const allImages = walk(path.join(root, 'static/images'));
const importedImages = new Set([...report.images, ...(report.downloadedImages || [])].map(item => path.resolve(root, item.target)));
for (const file of importedImages) if (!fs.existsSync(file)) errors.push('Missing imported image: ' + file);
for (const file of allImages.filter(file => !importedImages.has(file)).concat(allImages.filter(file => importedImages.has(file)))) {
  const hash = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  if (hashes.has(hash) && importedImages.has(file)) duplicates.push([path.relative(root, hashes.get(hash)), path.relative(root, file)]);
  hashes.set(hash, file);
}
if (duplicates.length) errors.push('New duplicate images found');
const result = {articlesPerLocale: files.map(list => list.length), sourceDocuments: report.sourceDocuments,
  mappedSourceArticles: report.articles.length, localImageReferences: imageReferences, externalImages,
  newImages: importedImages.size, newDuplicateImages: duplicates, errors};
if (process.argv.includes('--rendered')) {
  const base = '/' + (process.env.SITE_BASE_URL || '/wiki.fysetc/').split('/').filter(Boolean).join('/');
  let pages = 0;
  let renderedImages = 0;
  for (const article of report.articles) for (const locale of ['en', 'zh-Hans']) {
    const prefix = locale === 'en' ? '' : 'zh-Hans/';
    const file = path.join(root, 'build', prefix, 'docs', article.slug.replace(/^\//, ''), 'index.html');
    if (!fs.existsSync(file)) { errors.push('Missing rendered page: ' + file); continue; }
    pages++;
    const html = fs.readFileSync(file, 'utf8');
    if (article.actions.en === 'imported' && /&lt;img\b/i.test(html)) errors.push('Escaped image markup: ' + file);
    for (const image of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/gi)) {
      renderedImages++;
      const url = image[1].split(/[?#]/)[0];
      if (/^(data:|https?:)/.test(url)) continue;
      const correctBase = base === '/' || url.startsWith(base + '/');
      if (!correctBase) { errors.push('Rendered image omits site base path: ' + url + ' in ' + file); continue; }
      const relativeUrl = base === '/' ? url : url.slice(base.length);
      if (!fs.existsSync(path.join(root, 'build', decodeURIComponent(relativeUrl)))) errors.push('Missing rendered image: ' + url + ' in ' + file);
    }
  }
  result.renderedPages = pages;
  result.renderedImageReferences = renderedImages;
}
fs.writeFileSync(path.join(root, 'migration/validation.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result, null, 2));
if (errors.length) process.exitCode = 1;
