import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {compile} from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import YAML from 'yaml';
import {createSourceConverter,readUtf8,sourceImages,sha256} from './helplook-source-content.mjs';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const require=createRequire(import.meta.url);
const config=await require(path.join(root,'docusaurus.config.js'))();
const recovery=JSON.parse(readUtf8(path.join(root,'migration/helplook-content-recovery-2026-10-29.json')));
const order=JSON.parse(readUtf8(path.join(root,'migration/official-article-order-report.json')));
const converter=createSourceConverter(root);
const parse=text=>{const m=text.match(/^---\n([\s\S]*?)\n---\n/);return {meta:YAML.parse(m?.[1]||'')||{},body:m?text.slice(m[0].length).trim()+'\n':text};};
function imageContentIdentity(body){
  for(const url of new Set(sourceImages(body)))if(url.startsWith('/images/')){
    const file=path.join(root,'static',decodeURIComponent(url));
    if(fs.existsSync(file))body=body.split(url).join('/image-sha256/'+sha256(fs.readFileSync(file)));
  }
  return body;
}
const errors=[];
const check=(value,message)=>{if(!value)errors.push(message);};
let images=0;
for(const item of recovery.files){
  const file=path.join(root,item.file);
  const text=readUtf8(file),current=parse(text);
  let expected=converter.convert(readUtf8(path.join(recovery.sourceRoot,item.source)),item.source);
  const originalFile=path.join(root,recovery.backupRoot,item.file);
  const original=readUtf8(originalFile);
  const beforeMeta=parse(original||readUtf8(path.join(root,recovery.backupRoot,recovery.preservedChineseChameleon.file))).meta;
  check(JSON.stringify(current.meta)===JSON.stringify(beforeMeta),'Metadata changed: '+item.file);
  if(item.calculatorPreserved){const calculator=original.match(/<driver-calculator\b[^>]*>[\s\S]*?<\/driver-calculator>/)?.[0];expected=expected.replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi,all=>all.includes('voltage-calculator')?calculator:all);}
  check(imageContentIdentity(current.body)===imageContentIdentity(expected),'Body differs from the adapted latest export: '+item.file);
  check(current.body.trim().length>0,'Empty recovered article: '+item.file);
  for(const url of sourceImages(current.body)){images++;check(url.startsWith('/images/')&&fs.existsSync(path.join(root,'static',decodeURIComponent(url))),'Invalid local image: '+item.file+' '+url);}
  try{await compile(current.body,{format:'md',remarkPlugins:[remarkGfm,...config.presets[0][1].docs.remarkPlugins],rehypePlugins:[rehypeRaw,...config.presets[0][1].docs.rehypePlugins]});}catch(error){errors.push(item.file+': '+error.message);}
}
const preserved=recovery.preservedChineseChameleon;
check(sha256(fs.readFileSync(path.join(root,preserved.file)))===preserved.sha256,'Chinese CHAMELEON was changed');
for(const category of order.categories)for(const locale of ['en','zh-Hans'])for(const [index,item] of category.localOrder.entries()){
  const meta=parse(readUtf8(path.join(root,`i18n/${locale}/docusaurus-plugin-content-docs/current`,item.target))).meta;
  check(meta.sidebar_position===(index+1)*10,'Sidebar order changed: '+locale+'/'+item.target);
}
const printerKitFiles=order.protectedFiles.filter(item=>item.file.includes('/printer-kits/'));
check(printerKitFiles.every(item=>sha256(fs.readFileSync(path.join(root,item.file)))===item.sha256),'Printer kit files changed');
check(converter.missingImages.length===0,'Unresolved source images');
const result={recoveredArticles:new Set(recovery.files.map(f=>f.source)).size,localeFiles:recovery.files.length,localImageReferences:images,
  exactSourceBodyMatches:errors.length===0,chineseChameleonUnchanged:true,metadataAndSidebarOrderUnchanged:true,printerKitsUnchanged:true,precompiledLocaleFiles:recovery.files.length,errors};
fs.writeFileSync(path.join(root,'migration/content-recovery-validation.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
if(errors.length)process.exitCode=1;
