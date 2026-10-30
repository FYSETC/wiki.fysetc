// Targeted synchronization of the reviewed October 2026 HelpLook export.
// Preview by default; --apply downloads missing images and writes both locales.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import YAML from 'yaml';
import {formatHelpLook} from './helplook-format.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const oldRoot = path.resolve(root, '../helplook_docs/docs');
const newRoot = path.resolve(root, '../helplook-new-version/docs');
const apply = process.argv.includes('--apply');
const slash = x => x.replaceAll('\\', '/');
const read = x => fs.readFileSync(x, 'utf8').replace(/^\uFEFF/, '').replaceAll('\r\n', '\n');
const walk = x => fs.existsSync(x) ? fs.readdirSync(x, {withFileTypes: true}).flatMap(e => e.isDirectory() ? walk(path.join(x, e.name)) : [path.join(x, e.name)]) : [];
const hash = x => crypto.createHash('sha256').update(x).digest('hex');
const fileHash = x => hash(fs.readFileSync(x));
const clean = x => { try { return decodeURIComponent(x.replaceAll('&amp;', '&')).split(/[?#]/)[0]; } catch { return x; } };
const normalize = x => x.replace(/\.md$/i, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const localeRoot = lang => path.join(root, `i18n/${lang}/docusaurus-plugin-content-docs/current`);
const parse = text => { const m = text.match(/^---\n([\s\S]*?)\n---\n/); return {meta: m ? YAML.parse(m[1]) : {}, body: m ? text.slice(m[0].length) : text}; };
const serialize = (meta, body) => `---\n${YAML.stringify(meta, {lineWidth: 100}).trimEnd()}\n---\n\n${body.trimStart().trimEnd()}\n`;
const oldReport = JSON.parse(read(path.join(root, 'migration/helplook-report.json')));
const specs = [
  ['Controllers/CATALYST.K.md', 'Controllers/CATALYST.K.md', 'controllers/CATALYST.K.md', 'image'],
  ['Controllers/CHAMELEON X5.md', 'Controllers/CHAMELEON X5.md', 'controllers/CHAMELEON-X5.md', 'firmware'],
  ['Controllers/SPIDER.md', 'Controllers/SPIDER_V1-3_F446.md', 'controllers/SPIDER_V1-3_F446.md', 'pins'],
  ['Controllers/SPIDER_V3_H7.md', 'Controllers/SPIDER_V3_H723.md', 'controllers/SPIDER_V3_H723.md', 'pins'],
  ['Modules/H36 Combo V2.md', 'Modules/H36 Combo V2.md', 'modules/H36-Combo-V2.md', 'discord'],
  ['Upgrade Kits/Adventurer AD5M Series Camera.md', 'Upgrade Kits/Adventurer AD5M_AD5M Pro_AD5X_Series Camera.md', 'upgrade-kits/Adventurer-AD5M_AD5M-Pro_AD5X_Series-Camera.md', 'replace'],
  ['Upgrade Kits/FC Product Manual.md', 'Upgrade Kits/PSF Feedback Sensor.md', 'upgrade-kits/PSF-Feedback-Sensor.md', 'replace'],
  ['Upgrade Kits/Sparkx_i7_Led_System.md', 'Upgrade Kits/Sparkx i7 LED Upgrade.md', 'upgrade-kits/Sparkx-i7-LED-Upgrade.md', 'replace'],
  ['Upgrade Kits/X1P1S  door hinge.md', 'Upgrade Kits/X1P1S Door Hinge Upgrade.md', 'upgrade-kits/X1P1S-Door-Hinge-Upgrade.md', 'replace'],
];
const additions = [
  ['Controllers/Catalyst.K_Mainboard_V1.1.md', 'controllers/Catalyst.K_Mainboard_V1.1.md', 1.5],
  ['Modules/Catalyst.K_Tool_V1.1.md', 'modules/Catalyst.K_Tool_V1.1.md'],
  ['Displays/FYSETC Paneldue 5i7i.md', 'displays/FYSETC-Paneldue-5i7i.md'],
  ['Displays/Raspberry Pi 5 DSI Touch Screen MIPI LCD V1.1.md', 'displays/Raspberry-Pi-5-DSI-Touch-Screen-MIPI-LCD-V1.1.md'],
];
const previousSyncPath = path.join(root, 'migration/helplook-update-2026-10-29.json');
const previousSync = fs.existsSync(previousSyncPath) ? JSON.parse(read(previousSyncPath)) : null;
if (apply && previousSync) throw new Error('This reviewed update is already applied. Compare a new export before applying another update.');
const docs = specs.map(([before, source, target, mode]) => {
  const article = oldReport.articles.find(a => a.source === before || a.source === source);
  if (!article) throw new Error('Missing migration mapping: ' + before);
  const previous = previousSync?.articles.find(a => a.source === source);
  return {before, source, target, mode, oldTarget: previous?.target || article.target,
    slug: article.slug, id: parse(read(path.join(localeRoot('en'), previous?.target || article.target))).meta.id};
});
for (const [source, target, position] of additions) {
  const id = path.basename(target, '.md');
  docs.push({source, target, mode: 'new', id, slug: '/' + id.replace(/[._]/g, '-'), position});
}

// Resolve cached URLs to the exact image bytes already in the project.
const staticRoot = path.join(root, 'static');
const byHash = new Map();
for (const file of walk(path.join(staticRoot, 'images'))) byHash.set(fileHash(file), '/' + slash(path.relative(staticRoot, file)));
const cachedImages = walk(path.join(oldRoot, 'images'));
const byName = new Map(cachedImages.map(f => [path.basename(f).toLowerCase(), f]));
const imageMap = new Map();
function indexManifest(value, folder) {
  if (!value || typeof value !== 'object') return;
  const name = value.file || value['文件'];
  if (name) {
    const file = [path.join(folder, name), byName.get(path.basename(name).toLowerCase()), value.original_file && byName.get(path.basename(value.original_file).toLowerCase())].find(f => f && fs.existsSync(f));
    const local = file && byHash.get(fileHash(file));
    if (local) for (const [key, url] of Object.entries(value)) if (typeof url === 'string' && /^https?:\/\//.test(url) && (key.includes('url') || key === '图片地址')) imageMap.set(clean(url), local);
  }
  for (const v of Object.values(value)) if (typeof v === 'object') indexManifest(v, folder);
}
for (const file of cachedImages.filter(f => path.basename(f) === 'manifest.json')) indexManifest(JSON.parse(read(file)), path.dirname(file));
for (const item of [...(oldReport.downloadedImages || []), ...(previousSync?.downloadedImages || [])]) if (item.url && fs.existsSync(path.join(root, item.target))) imageMap.set(clean(item.url), '/' + slash(path.relative(staticRoot, path.join(root, item.target))));

// Matching image sequences also preserve project-specific, already-localized names.
function images(body) {
  return [...body.replace(/^```[^\n]*\n[\s\S]*?^```[^\n]*(?:\n|$)/gm, '').matchAll(/!\[[^\]\n]*\]\(([^\n]*?)\)|<img\b[^>]*?\bsrc=["']([^"']+)["']/gi)].map(m => m[1] || m[2]).filter(Boolean);
}
for (const doc of docs.filter(d => d.before)) {
  const original = images(read(path.join(oldRoot, doc.before))).filter(u => /^https?:/.test(u));
  const current = images(parse(read(path.join(localeRoot('en'), doc.oldTarget))).body);
  if (original.length === current.length && current.every(u => u.startsWith('/images/'))) original.forEach((url, i) => {
    if (!imageMap.has(clean(url))) imageMap.set(clean(url), current[i]);
  });
}

const missing = new Map();
for (const doc of docs) for (const url of images(read(path.join(newRoot, doc.source)))) {
  if (!/^https?:/.test(url) || imageMap.has(clean(url))) continue;
  const entry = missing.get(clean(url)) || {url, articles: []};
  if (!entry.articles.includes(doc.source)) entry.articles.push(doc.source);
  missing.set(clean(url), entry);
}
if (!apply) {
  console.log(JSON.stringify({apply, updatedArticles: specs.length, renamedArticles: specs.filter(([a,b]) => a !== b).length, addedArticles: additions.length, missingImageUrls: missing.size, downloads: [...missing.values()]}, null, 2));
  process.exit(0);
}

// Finish and validate every download before changing documents.
const downloadedImages = [];
const stagedImages = [];
for (const entry of missing.values()) {
  let result;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(entry.url, {signal: AbortSignal.timeout(45000), headers: {'User-Agent': 'FYSETC-Wiki-Local-Document-Sync/1.0'}});
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const bytes = Buffer.from(await response.arrayBuffer());
      const type = response.headers.get('content-type') || '';
      const png = bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
      const jpeg = bytes[0] === 255 && bytes[1] === 216;
      const gif = bytes.subarray(0,3).toString() === 'GIF';
      const webp = bytes.subarray(0,4).toString() === 'RIFF' && bytes.subarray(8,12).toString() === 'WEBP';
      const svg = /<svg\b/i.test(bytes.subarray(0,1000).toString());
      if (!bytes.length || !(png || jpeg || gif || webp || svg)) throw new Error('Not a valid image: ' + type);
      const digest = hash(bytes);
      const extension = png ? '.png' : jpeg ? '.jpg' : gif ? '.gif' : webp ? '.webp' : '.svg';
      const label = path.basename(entry.articles[0], '.md').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g,'');
      const local = byHash.get(digest) || `/images/${label}--${digest.slice(0,16)}${extension}`;
      if (!byHash.has(digest)) { stagedImages.push({file: path.join(staticRoot, local), bytes}); byHash.set(digest, local); }
      result = {url: entry.url, target: 'static' + local, sha256: digest, bytes: bytes.length, reused: !stagedImages.some(s => s.file === path.join(staticRoot, local)), articles: entry.articles};
      imageMap.set(clean(entry.url), local);
      break;
    } catch (error) { if (attempt === 2) throw new Error(`Image download failed: ${entry.url}: ${error.message}`); }
  }
  downloadedImages.push(result);
  console.log('Image ready: ' + result.target);
}

const links = new Map();
for (const a of oldReport.articles) for (const key of [a.source, path.basename(a.source), a.slug]) links.set(normalize(path.basename(key)), a.slug);
for (const d of docs) for (const name of [d.source, d.before, d.id].filter(Boolean)) links.set(normalize(path.basename(name)), d.slug);
const official = JSON.parse(read(path.join(root, 'navigation/official-categories.json')));
for (const c of official.categories) for (const a of c.articles || []) {
  const slug = links.get(normalize(a.title));
  if (slug) links.set('url:' + clean(a.url).replace(/\/$/, ''), slug);
}
const incomplete = [];
function localImage(url) {
  if (!/^https?:/.test(url.trim())) return url;
  const mapped = imageMap.get(clean(url.trim()));
  if (!mapped) throw new Error('Image URL not resolved: ' + url);
  return mapped.split('/').map(encodeURIComponent).join('/');
}
function localLink(url) {
  if (!url || url.startsWith('#')) return url;
  if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(url)) return 'mailto:' + url;
  let slug;
  if (/^https?:\/\/wiki\.fysetc\.com\//i.test(url)) slug = links.get('url:' + clean(url).replace(/\/$/, '')) || links.get(normalize(clean(url).split('/').pop()));
  else if (/\.md(?:#|$)/i.test(url)) slug = links.get(normalize(clean(url).split('/').pop()));
  return slug ? '/docs' + slug + '/' + (url.includes('#') ? '#' + url.split('#')[1] : '') : url;
}
function convert(body, article) {
  return body.split(/(^```[^\n]*\n[\s\S]*?^```[^\n]*(?:\n|$))/gm).map((part,i) => i % 2 ? part : part
    .replace(/!\[([^\]\n]*)\]\(([^\n]*?)\)/g, (all,alt,url) => {
      if (!url.trim() || /^(h|ht)$/.test(url.trim())) { incomplete.push({article,type:'image',url}); return '*Image unavailable in the source export.*'; }
      return `![${alt}](${localImage(url)})`;
    })
    .replace(/<img\b[^>]*>/gi, tag => {
      const src = tag.match(/\bsrc\s*=\s*(["'])(.*?)\1/is)?.[2];
      if (src === undefined || !src.trim() || /^(h|ht)$/.test(src.trim()) || /[\r\n]/.test(src)) { incomplete.push({article,type:'image',url:src||''}); return '*Image unavailable in the source export.*'; }
      return tag.replace(/\bsrc\s*=\s*(["'])(.*?)\1/gis, (all,q,url) => `src=${q}${localImage(url)}${q}`);
    })
    .replace(/(?<!!)\[([^\]\n]*)\]\(([^\n]*?)\)/g, (all,label,url) => {
      if (!url.trim() || /^(h|ht)$/.test(url.trim())) { incomplete.push({article,type:'link',label,url}); return label; }
      return `[${label}](${localLink(url)})`;
    })
    .replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (all,attr,label) => /\bhref\s*=\s*(["'])\s*\1/i.test(attr) ? label : all)
  ).join('');
}

const writes = [];
for (const doc of docs) for (const locale of ['en', 'zh-Hans']) {
  const oldFile = doc.oldTarget && path.join(localeRoot(locale), doc.oldTarget);
  const oldText = oldFile && read(oldFile);
  const current = oldText ? parse(oldText) : null;
  const sourceBody = read(path.join(newRoot, doc.source));
  let body;
  if (doc.mode === 'pins') {
    body = current.body;
    const oldSource = read(path.join(oldRoot, doc.before));
    const oldLines = oldSource.split('\n'), newLines = sourceBody.split('\n');
    if (oldLines.length !== newLines.length) throw new Error('Pin table source changed structure');
    for (let i=0; i<oldLines.length; i++) if (oldLines[i] !== newLines[i]) {
      if (!/rowspan="8">EXP[12]</.test(oldLines[i])) throw new Error('Unexpected Spider edit');
      if (body.includes(oldLines[i])) body = body.split(oldLines[i]).join(newLines[i]);
      else if (!body.includes(newLines[i])) throw new Error('Cannot locate Spider pin table');
    }
  } else if (doc.mode === 'image') {
    body = current.body;
    const before = images(read(path.join(oldRoot, doc.before)))[1];
    const after = images(sourceBody)[1];
    const mappedBefore = imageMap.get(clean(before));
    const mappedAfter = localImage(after);
    const pattern = `![](${mappedBefore})`;
    if (body.includes(pattern)) body = body.replace(pattern, `![PINOUT](${mappedAfter})`);
    else if (!body.includes(`![PINOUT](${mappedAfter})`)) throw new Error('Cannot locate CATALYST.K pinout image');
  } else if (doc.mode === 'discord') {
    body = current.body.replace(/https:\/\/discord\.gg\/4A5QDCYx\b/, '[Discord Server](https://discord.gg/RXuwedUkB9)');
    if (!body.includes('https://discord.gg/RXuwedUkB9')) throw new Error('Cannot locate H36 support link');
  } else if (doc.mode === 'firmware') {
    const replacement = formatHelpLook(convert(sourceBody, doc.source));
    const start = current.body.indexOf('# Firmware Guide');
    const end = current.body.indexOf('# Attachments', start);
    const from = replacement.indexOf('# Firmware Guide');
    const to = replacement.indexOf('# Attachments', from);
    if ([start,end,from,to].some(x => x < 0)) throw new Error('Missing CHAMELEON firmware section');
    body = current.body.slice(0,start) + replacement.slice(from,to) + current.body.slice(end);
  } else body = formatHelpLook(convert(sourceBody, doc.source));
  const renamed = doc.before && doc.before !== doc.source;
  const meta = {...(current?.meta || {}), id: doc.id, slug: doc.slug};
  if (!current || renamed) meta.title = path.basename(doc.source, '.md');
  if (doc.position !== undefined) meta.sidebar_position = doc.position;
  meta.source_file = path.basename(doc.source);
  meta.source_language = 'en';
  meta.helplook_source = doc.source;
  // Preserve existing paragraph spacing and make new standalone images readable.
  body = body.replace(/([^\n])\n(?=[ \t]*!\[)/g, '$1\n\n')
    .replace(/(!\[[^\]\n]*\]\([^\n]*?\))\n(?=[^\s|])/g, '$1\n\n')
    .replace(/(<img\b[^>]*>)\n(?=[^\s|])/gi, '$1\n\n')
    .replace(/([^\n])\n(?=[ \t]*<img\b)/gi, '$1\n\n')
    .replace(/\ballow fullscreen(?=[ >])/g, 'allowfullscreen');
  // Configuration placeholders must remain visible instead of becoming HTML tags.
  body = body.split(/(^```[^\n]*\n[\s\S]*?^```[^\n]*(?:\n|$))/gm)
    .map((part,index) => index % 2 ? part : part.replace(/<(uuid|serial_device|serial device|baud_rate|ADC GPIO)>/g, '&lt;$1&gt;')).join('');
  const text = serialize(meta, body);
  if (images(body).some(url => /^https?:/.test(url))) throw new Error('External image remains: ' + doc.source);
  writes.push({locale, doc, oldFile, beforeHash: oldFile ? fileHash(oldFile) : null, file: path.join(localeRoot(locale), doc.target), text});
}

// Back up the current working files, including uncommitted edits, before applying.
const backupRoot = path.join(root, 'migration', 'helplook-update-backup-2026-10-29');
const backupFile = file => {
  if (!fs.existsSync(file)) return;
  const to = path.join(backupRoot, path.relative(root, file));
  if (!fs.existsSync(to)) { fs.mkdirSync(path.dirname(to), {recursive:true}); fs.copyFileSync(file,to); }
};
for (const w of writes) {
  if (w.oldFile && fileHash(w.oldFile) !== w.beforeHash) throw new Error('Working file changed during synchronization: ' + w.oldFile);
  if (w.oldFile !== w.file && fs.existsSync(w.file) && !previousSync) throw new Error('Rename would overwrite existing file: ' + w.file);
}
for (const w of writes) if (w.oldFile) backupFile(w.oldFile);
backupFile(path.join(root, 'migration/helplook-report.json'));
for (const image of stagedImages) { fs.mkdirSync(path.dirname(image.file), {recursive:true}); if (!fs.existsSync(image.file)) fs.writeFileSync(image.file,image.bytes,{flag:'wx'}); }
for (const w of writes) { fs.mkdirSync(path.dirname(w.file),{recursive:true}); fs.writeFileSync(w.file,w.text); }
// Each source is an explicit file inside the two documentation roots.
for (const w of writes) if (w.oldFile && w.oldFile !== w.file) {
  if (!w.oldFile.startsWith(localeRoot(w.locale) + path.sep)) throw new Error('Unsafe rename source');
  fs.unlinkSync(w.oldFile);
}

const report = structuredClone(oldReport);
for (const doc of docs) {
  let article = report.articles.find(a => a.source === doc.before || a.source === doc.source);
  if (!article) {
    article = {source:doc.source,translation:null,target:doc.target,slug:doc.slug,actions:{en:'imported','zh-Hans':'imported'}};
    report.articles.push(article);
  } else { article.source = doc.source; article.target = doc.target; }
}
report.sourceDocuments = new Set(report.articles.flatMap(a => [a.source,a.translation].filter(Boolean))).size;
report.logicalArticles = report.articles.length;
report.newArticles = report.articles.filter(a => a.actions.en === 'imported').length;
report.existingArticles = report.logicalArticles - report.newArticles;
report.downloadedImages ||= [];
for (const item of downloadedImages) if (!report.downloadedImages.some(a => a.url === item.url)) report.downloadedImages.push(item);
const changedOldSources = new Set(docs.map(d => d.before).filter(Boolean));
report.unresolvedImages = report.unresolvedImages.map(item => ({...item,articles:item.articles.filter(a => !changedOldSources.has(a))})).filter(item => item.articles.length);
report.incompleteSourceLinks = report.incompleteSourceLinks.filter(item => !changedOldSources.has(item.article));
for (const item of incomplete.filter(v => v.type === 'link')) report.incompleteSourceLinks.push({article:item.article,label:item.label,url:item.url});
for (const item of incomplete.filter(v => v.type === 'image')) if (!report.unresolvedImages.some(v => v.url === item.url && v.articles.includes(item.article))) report.unresolvedImages.push({url:item.url || '(empty image source)',articles:[item.article]});
const sync = {date:'2026-10-29',sourceRoot:newRoot,updatedArticles:9,renamedArticles:6,addedArticles:4,localeFiles:writes.length,
  newImageFiles:stagedImages.length,downloadedImages:[...(previousSync?.downloadedImages || []),...downloadedImages],
  articles:docs.map(d => ({source:d.source,previousSource:d.before||null,target:d.target,slug:d.slug,id:d.id,mode:d.mode})),
  incompleteSourceReferences:incomplete,backupRoot:slash(path.relative(root,backupRoot)),
  files:writes.map(w => ({file:slash(path.relative(root,w.file)),previousFile:w.oldFile?slash(path.relative(root,w.oldFile)):null,beforeSha256:w.beforeHash,afterSha256:hash(w.text)}))};
report.latestSync = {date:sync.date,sourceRoot:newRoot,report:'migration/helplook-update-2026-10-29.json',updatedArticles:9,renamedArticles:6,addedArticles:4};
fs.writeFileSync(path.join(root,'migration/helplook-report.json'),JSON.stringify(report,null,2)+'\n');
fs.writeFileSync(previousSyncPath,JSON.stringify(sync,null,2)+'\n');
console.log(JSON.stringify({apply,updatedArticles:9,renamedArticles:6,addedArticles:4,localeFiles:writes.length,newImageFiles:stagedImages.length,incompleteSourceReferences:incomplete.length},null,2));
