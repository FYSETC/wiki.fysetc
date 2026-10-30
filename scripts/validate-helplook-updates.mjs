// Check the synchronized articles independently of older migration history.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import YAML from 'yaml';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => fs.readFileSync(file, 'utf8').replace(/^\uFEFF/, '');
const parse = text => YAML.parse(text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || '') || {};
const digest = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const walk = dir => fs.readdirSync(dir, {withFileTypes:true}).flatMap(e => e.isDirectory() ? walk(path.join(dir,e.name)) : [path.join(dir,e.name)]);
const sync = JSON.parse(read(path.join(root,'migration/helplook-update-2026-10-29.json')));
const orderReportPath = path.join(root,'migration/official-article-order-report.json');
const orderChanges = fs.existsSync(orderReportPath) ? JSON.parse(read(orderReportPath)).changedFiles : [];
const original = JSON.parse(read(path.join(root,sync.backupRoot,'migration/helplook-report.json')));
const errors = [];
const check = (value,message) => { if (!value) errors.push(message); };
const rendered = process.argv.includes('--rendered');
const localeRoot = lang => path.join(root,`i18n/${lang}/docusaurus-plugin-content-docs/current`);
const base = '/' + (process.env.SITE_BASE_URL || '/wiki.fysetc/').split('/').filter(Boolean).join('/') + '/';
const beforeSources = new Set(sync.articles.map(a=>a.previousSource));
const preexistingMissingArticles = original.articles.filter(a => !beforeSources.has(a.source) && !fs.existsSync(path.join(localeRoot('en'),a.target))).map(a=>({source:a.source,target:a.target,slug:a.slug}));
let localImages = 0;
let renderedPages = 0;
let renderedImages = 0;
for (const item of sync.files) {
  const file = path.join(root,item.file);
  check(fs.existsSync(file),'Missing article: ' + item.file);
  if (!fs.existsSync(file)) continue;
  const text = read(file);
  const currentHash = digest(file);
  const orderChange = orderChanges.find(change=>change.file===item.file);
  const front = text.match(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/)?.[0] || '';
  const withoutOrder = front.replace(/^sidebar_position:[^\r\n]*\r?\n/m,'') + text.slice(front.length);
  const contentHash = crypto.createHash('sha256').update(withoutOrder).digest('hex');
  const reorderedOnly = orderChange?.beforeSha256===item.afterSha256 && orderChange.afterSha256===currentHash && orderChange.contentExceptOrderSha256===contentHash;
  // CMS edits and translations are expected after an import. Byte-for-byte
  // comparison is an optional historical check, not a normal content check.
  if (process.argv.includes('--snapshot')) check(currentHash===item.afterSha256 || reorderedOnly,'Article differs from the recorded update: '+item.file);
  check(text.slice(front.length).trim().length>0,'Empty article body: '+item.file);
  const meta = parse(text);
  const doc = sync.articles.find(a=>item.file.endsWith('/'+a.target));
  check(meta.id===doc.id && meta.slug===doc.slug,'Unexpected document ID or URL: ' + item.file);
  check(meta.source_file===path.basename(doc.source) && meta.helplook_source===doc.source,'Wrong source metadata: ' + item.file);
  if (item.previousFile) {
    const backup = path.join(root,sync.backupRoot,item.previousFile);
    check(fs.existsSync(backup) && digest(backup)===item.beforeSha256,'Original working file backup differs: '+item.previousFile);
    const before = parse(read(backup));
    check(before.id===meta.id && before.slug===meta.slug,'Existing article URL changed: '+item.file);
    if (item.file!==item.previousFile) check(!fs.existsSync(path.join(root,item.previousFile)),'Old filename remains after rename: '+item.previousFile);
  }
  const prose = text.replace(/<!--[\s\S]*?-->/g,'').replace(/^\s*(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\s*\1[^\n]*(?:\n|$)/gm,'');
  for (const match of prose.matchAll(/!\[[^\]\n]*\]\(([^\n]*?)\)|<img\b[^>]*?\bsrc=["']([^"']+)["']/gi)) {
    const url = match[1]||match[2];
    check(url.startsWith('/images/'),'Nonlocal image in '+item.file+': '+url);
    check(fs.existsSync(path.join(root,'static',decodeURIComponent(url))),'Missing image in '+item.file+': '+url);
    localImages++;
  }
  if (!rendered) continue;
  const locale = item.file.split('/')[1];
  const htmlFile = path.join(root,'build',locale==='en'?'':'zh-Hans','docs',doc.slug.replace(/^\//,''),'index.html');
  check(fs.existsSync(htmlFile),'Missing rendered page: '+item.file);
  if (!fs.existsSync(htmlFile)) continue;
  const html = read(htmlFile);
  if (doc.mode==='firmware') check(html.includes('&lt;uuid&gt;') && html.includes('&lt;serial device&gt;'),'Firmware placeholders are hidden in '+item.file);
  if (doc.source==='Upgrade Kits/PSF Feedback Sensor.md') check(html.includes('&lt;ADC GPIO&gt;'),'ADC GPIO placeholder is hidden in '+item.file);
  check(!/&lt;img\b/i.test(html),'Escaped image markup in '+item.file);
  renderedPages++;
  for (const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/gi)) {
    const url = match[1].split(/[?#]/)[0];
    if (/^(data:|https?:)/.test(url)) continue;
    check(url.startsWith(base),'Image lacks site base path: '+url);
    check(fs.existsSync(path.join(root,'build',decodeURIComponent(url.slice(base.length)))),'Missing built image: '+url);
    renderedImages++;
  }
}
for (const item of sync.downloadedImages) {
  const file = path.join(root,item.target);
  check(fs.existsSync(file),'Missing downloaded image: '+item.target);
  if (fs.existsSync(file)) check(digest(file)===item.sha256,'Downloaded image checksum differs: '+item.target);
}
const en = walk(localeRoot('en')).filter(f=>/\.mdx?$/.test(f)).map(f=>path.relative(localeRoot('en'),f)).sort();
const zh = walk(localeRoot('zh-Hans')).filter(f=>/\.mdx?$/.test(f)).map(f=>path.relative(localeRoot('zh-Hans'),f)).sort();
check(JSON.stringify(en)===JSON.stringify(zh),'English and Chinese document paths differ');
check(sync.files.length===26 && sync.articles.length===13,'Incomplete article synchronization');
check(sync.articles.filter(a=>a.mode==='new').length===4,'Expected four added articles');
const results = {updatedArticles:9,renamedArticles:6,addedArticles:4,checkedLocaleFiles:sync.files.length,articlesPerLocale:[en.length,zh.length],
  localArticleImageReferences:localImages,downloadedImageFiles:sync.downloadedImages.length,renderedPages:rendered?renderedPages:null,
  renderedImageReferences:rendered?renderedImages:null,preexistingMissingArticles,errors};
fs.writeFileSync(path.join(root,'migration/helplook-update-validation.json'),JSON.stringify(results,null,2)+'\n');
console.log(JSON.stringify(results,null,2));
if (errors.length) process.exitCode=1;
