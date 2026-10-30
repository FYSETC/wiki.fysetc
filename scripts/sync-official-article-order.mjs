// Preview, apply, or check the article order captured from wiki.fysetc.com.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import YAML from 'yaml';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = file => fs.readFileSync(file, 'utf8');
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const slash = value => value.replaceAll('\\', '/');
const norm = value => value.replace(/\.mdx?$/i, '').replace(/\.zh$/i, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const walk = folder => fs.readdirSync(folder, {withFileTypes:true}).flatMap(e => e.isDirectory() ? walk(path.join(folder,e.name)) : [path.join(folder,e.name)]);
const parse = text => YAML.parse(text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || '') || {};
const snapshot = JSON.parse(read(path.join(root,'navigation/official-article-order-2026-10-29.json')));
const migration = JSON.parse(read(path.join(root,'migration/helplook-report.json')));
const reportFile = path.join(root,'migration/official-article-order-report.json');
const folderMap = {Controllers:'controllers','Stepper Drivers':'drivers',Modules:'modules',Sensors:'sensors',Wireless:'wireless',
  'Mechanical Parts':'mechanicals','Upgrade Kits':'upgrade-kits',Displays:'displays',Tutorial:'guides',Cables:'cables',Others:'others'};
const localeRoot = locale => path.join(root,`i18n/${locale}/docusaurus-plugin-content-docs/current`);
const files = ['en','zh-Hans'].flatMap(locale => walk(localeRoot(locale)));
function withoutPosition(text) {
  const front = text.match(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/)?.[0];
  if (!front) throw new Error('Missing frontmatter');
  return front.replace(/^sidebar_position:[^\r\n]*\r?\n/m,'') + text.slice(front.length);
}
function setPosition(text,position) {
  const front = text.match(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/)?.[0];
  if (!front) throw new Error('Missing frontmatter');
  const newline = front.includes('\r\n') ? '\r\n' : '\n';
  const next = /^sidebar_position:/m.test(front) ? front.replace(/^sidebar_position:[^\r\n]*/m,'sidebar_position: '+position)
    : front.replace(/^---\r?\n/,match => match+'sidebar_position: '+position+newline);
  const result = next + text.slice(front.length);
  if (withoutPosition(result)!==withoutPosition(text)) throw new Error('Change affects more than sidebar_position');
  return result;
}

function verify(report) {
  for (const item of report.protectedFiles) if (sha(fs.readFileSync(path.join(root,item.file)))!==item.sha256) throw new Error('Protected file changed: '+item.file);
  for (const category of report.categories) for (const locale of ['en','zh-Hans']) {
    for (const [index,doc] of category.localOrder.entries()) {
      const text = read(path.join(localeRoot(locale),doc.target));
      if (parse(text).sidebar_position !== (index+1)*10) throw new Error('Incorrect position: '+locale+'/'+doc.target);
    }
  }
  for (const item of report.changedFiles) {
    const text = read(path.join(root,item.file));
    if (sha(withoutPosition(text))!==item.contentExceptOrderSha256) throw new Error('Article content or other metadata changed: '+item.file);
  }
}
if (process.argv.includes('--check')) {
  const report = JSON.parse(read(reportFile));
  verify(report);
  console.log(JSON.stringify({categories:report.categories.length,matchedArticles:report.matchedArticles,changedLocaleFiles:report.changedFiles.length,
    printerKitsUnchanged:true,articleContentUnchanged:true,localeOrderMatches:true},null,2));
  process.exit(0);
}

const categories = [];
for (const online of snapshot.categories) {
  if (online.title==='3D Printer Kits') throw new Error('Printer kits must be excluded');
  if (!online.children.length) continue;
  const folder = folderMap[online.title];
  if (!folder) throw new Error('Unknown category: '+online.title);
  const locals = fs.readdirSync(path.join(localeRoot('en'),folder)).filter(name=>/\.mdx?$/.test(name)).map(name=>{
    const target=folder+'/'+name;
    const meta=parse(read(path.join(localeRoot('en'),target)));
    const record=migration.articles.find(a=>a.target===target);
    const keys=[meta.id,meta.title,meta.source_file,name,...[record?.source,record?.translation].filter(Boolean).map(x=>path.posix.basename(x))].filter(Boolean).map(norm);
    return {target,title:meta.title,id:meta.id,position:meta.sidebar_position,keys};
  });
  const matched = [];
  const used = new Set();
  const duplicates = [];
  for (const article of online.children) {
    const candidates = locals.filter(doc=>doc.keys.includes(norm(article.title)));
    if (candidates.length!==1) throw new Error(`Expected one local match for ${online.title}/${article.title}, got ${candidates.length}`);
    const doc=candidates[0];
    if (used.has(doc.target)) { duplicates.push({title:article.title,target:doc.target}); continue; }
    used.add(doc.target);
    matched.push({target:doc.target,title:doc.title,onlineTitle:article.title,onlineUrl:'https://wiki.fysetc.com/docs/'+(article.slug||article.stringId)});
  }
  const extras=locals.filter(d=>!used.has(d.target)).sort((a,b)=>(a.position??Infinity)-(b.position??Infinity) || (path.basename(a.target)<path.basename(b.target)?-1:1))
    .map(d=>({target:d.target,title:d.title,localOnly:true}));
  categories.push({category:online.title,folder,url:'https://wiki.fysetc.com/docs/'+(online.slug||online.stringId),
    matchedCount:matched.length,translationDuplicates:duplicates,localOrder:[...matched,...extras]});
}
const edits=[];
for (const c of categories) for (const [index,doc] of c.localOrder.entries()) for (const locale of ['en','zh-Hans']) {
  const file=path.join(localeRoot(locale),doc.target);
  const before=read(file),position=(index+1)*10,after=setPosition(before,position);
  if (after!==before) edits.push({file:slash(path.relative(root,file)),before,after,previousPosition:parse(before).sidebar_position??null,position,
    beforeSha256:sha(before),afterSha256:sha(after),contentExceptOrderSha256:sha(withoutPosition(before))});
}
const touched=new Set(edits.map(e=>e.file));
const protectedFiles=files.filter(file=>!touched.has(slash(path.relative(root,file)))).map(file=>({file:slash(path.relative(root,file)),sha256:sha(fs.readFileSync(file))}));
const report={source:snapshot.source,fetchedAt:snapshot.time,excludedCategory:'3D Printer Kits',matchedArticles:categories.reduce((n,c)=>n+c.matchedCount,0),
  translationDuplicates:categories.reduce((n,c)=>n+c.translationDuplicates.length,0),categories,protectedFiles,
  changedFiles:edits.map(({before,after,...e})=>e),policy:'Same logical document uses first online occurrence; local-only documents follow all published articles in their existing relative order. Empty online categories and local-only categories remain unchanged.'};
if (process.argv.includes('--apply')) {
  if (fs.existsSync(reportFile)) throw new Error('Order sync already has a report; run --check before applying another captured order.');
  for (const edit of edits) if (sha(read(path.join(root,edit.file)))!==edit.beforeSha256) throw new Error('Document changed during planning: '+edit.file);
  for (const edit of edits) fs.writeFileSync(path.join(root,edit.file),edit.after);
  fs.writeFileSync(reportFile,JSON.stringify(report,null,2)+'\n');
  verify(report);
}
console.log(JSON.stringify({apply:process.argv.includes('--apply'),categories:categories.length,matchedArticles:report.matchedArticles,translationDuplicates:report.translationDuplicates,
  changedLocaleFiles:edits.length,details:categories.map(c=>({category:c.category,matched:c.matchedCount,localOnly:c.localOrder.filter(d=>d.localOnly).map(d=>d.title)}))},null,2));
