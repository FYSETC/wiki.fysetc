// Shared source-export adaptation for content auditing and targeted recovery.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {formatHelpLook} from './helplook-format.mjs';

export const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');
export const readUtf8 = file => fs.readFileSync(file,'utf8').replace(/^\uFEFF/,'').replaceAll('\r\n','\n');
const walk = dir => fs.existsSync(dir) ? fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]) : [];
const norm = value => value.replace(/\.mdx?$/i,'').replace(/\.zh$/i,'').toLowerCase().replace(/[^a-z0-9]/g,'');
const clean = value => { try { return decodeURIComponent(value.replaceAll('&amp;','&')).replace(/[?#].*$/,''); } catch { return value; } };
export function sourceImages(body) {
  return [...body.replace(/^```[^\n]*\n[\s\S]*?^```[^\n]*(?:\n|$)/gm,'').matchAll(/!\[[^\]\n]*\]\(([^\n]*?)\)|<img\b[^>]*?\bsrc=["']([^"']+)["']/gi)].map(m=>m[1]||m[2]).filter(Boolean);
}
export function createSourceConverter(root) {
  const report=JSON.parse(readUtf8(path.join(root,'migration/helplook-report.json')));
  const staticRoot=path.join(root,'static');
  const byHash=new Map(walk(path.join(staticRoot,'images')).map(file=>[sha256(fs.readFileSync(file)),'/'+path.relative(staticRoot,file).replaceAll('\\','/')]));
  const cacheRoot=path.resolve(root,'../helplook_docs/docs/images');
  const cache=walk(cacheRoot);
  const byName=new Map(cache.map(file=>[path.basename(file).toLowerCase(),file]));
  const imageMap=new Map();
  function index(value,folder) {
    if (!value||typeof value!=='object') return;
    const name=value.file||value['文件'];
    if (name) {
      const file=[path.join(folder,name),byName.get(path.basename(name).toLowerCase()),value.original_file&&byName.get(path.basename(value.original_file).toLowerCase())].find(f=>f&&fs.existsSync(f));
      const local=file&&byHash.get(sha256(fs.readFileSync(file)));
      if(local) for(const [key,url] of Object.entries(value)) if(typeof url==='string'&&/^https?:\/\//.test(url)&&(key.includes('url')||key==='图片地址')) imageMap.set(clean(url),local);
    }
    for(const child of Object.values(value)) if(typeof child==='object') index(child,folder);
  }
  for(const file of cache.filter(f=>path.basename(f)==='manifest.json')) index(JSON.parse(readUtf8(file)),path.dirname(file));
  for(const image of report.downloadedImages||[]) if(image.url&&fs.existsSync(path.join(root,image.target))) imageMap.set(clean(image.url),'/'+path.relative(staticRoot,path.join(root,image.target)).replaceAll('\\','/'));
  const links=new Map();
  for(const article of report.articles) for(const key of [article.source,article.translation,article.target,article.slug].filter(Boolean)) links.set(norm(path.posix.basename(key)),article.slug);
  for(const snapshot of ['official-categories.json','official-article-order-2026-10-29.json']) {
    const file=path.join(root,'navigation',snapshot);
    if(!fs.existsSync(file)) continue;
    for(const category of JSON.parse(readUtf8(file)).categories) for(const article of category.children||category.articles||[]) {
      const slug=links.get(norm(article.title));
      if(!slug) continue;
      for(const url of [article.url,article.slug&&'https://wiki.fysetc.com/docs/'+article.slug,article.stringId&&'https://wiki.fysetc.com/docs/'+article.stringId].filter(Boolean)) links.set('url:'+clean(url).replace(/\/$/,''),slug);
    }
  }
  const missingImages=[];
  const incomplete=[];
  function imageUrl(url,article) {
    url=url.trim().replace(/^\.?\/(https?:\/\/)/,'$1');
    if(!/^https?:/.test(url)) return url;
    let local=imageMap.get(clean(url));
    if(!local&&url.includes('/FYSETC/wiki.fysetc/')) {
      const candidate='/images/'+clean(url).split('/').pop();
      if(fs.existsSync(path.join(staticRoot,candidate))) local=candidate;
    }
    if(!local) { missingImages.push({article,url}); return url; }
    return local.split('/').map(encodeURIComponent).join('/');
  }
  function linkUrl(url) {
    if(!url||url.startsWith('#')) return url;
    if(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(url)) return 'mailto:'+url;
    let slug;
    if(/^https?:\/\/wiki\.fysetc\.com\//i.test(url)) slug=links.get('url:'+clean(url).replace(/\/$/,''))||links.get(norm(clean(url).replace(/\/$/,'').split('/').pop()));
    else if(/\.md(?:#|$)/i.test(url)) slug=links.get(norm(clean(url).split('/').pop()));
    return slug?'/docs'+slug+'/'+(url.includes('#')?'#'+url.split('#')[1]:''):url;
  }
  function convert(source,article) {
    let body=source.split(/(^```[^\n]*\n[\s\S]*?^```[^\n]*(?:\n|$))/gm).map((part,i)=>i%2?part:part
      .replace(/!\[([^\]\n]*)\]\(([^\n]*?)\)/g,(all,alt,url)=>{
        if(!url.trim()||/^(h|ht)$/.test(url.trim())) {incomplete.push({article,type:'image',url});return '*Image unavailable in the source export.*';}
        return `![${alt}](${imageUrl(url,article)})`;
      })
      .replace(/<img\b[^>]*>/gi,tag=>{
        const src=tag.match(/\bsrc\s*=\s*(["'])(.*?)\1/is)?.[2];
        if(src===undefined||!src.trim()||/^(h|ht)$/.test(src.trim())||/[\r\n]/.test(src)) {incomplete.push({article,type:'image',url:src||''});return '*Image unavailable in the source export.*';}
        return tag.replace(/\bsrc\s*=\s*(["'])(.*?)\1/gis,(all,q,url)=>`src=${q}${imageUrl(url,article)}${q}`);
      })
      .replace(/(?<!!)\[([^\]\n]*)\]\(([^\n]*?)\)/g,(all,label,url)=>{
        if(!url.trim()||/^(h|ht)$/.test(url.trim())) {incomplete.push({article,type:'link',url});return label;}
        return `[${label}](${linkUrl(url)})`;
      })
      .replace(/`[^`\n]*`|<(uuid|serial_device|serial device|baud_rate|ADC GPIO)>/g,(all,placeholder)=>placeholder?'&lt;'+placeholder+'&gt;':all)
    ).join('');
    body=formatHelpLook(body).replace(/\ballow fullscreen(?=[ >])/g,'allowfullscreen');
    // Separate complete image blocks without changing fenced-code examples.
    body=body.split(/(^```[^\n]*\n[\s\S]*?^```[^\n]*(?:\n|$))/gm).map((part,i)=>i%2?part:part
      .replace(/([^\n])\n(?=[ \t]*!\[)/g,'$1\n\n')
      .replace(/(!\[[^\]\n]*\]\([^\n]*?\))\n(?=[^\s|])/g,'$1\n\n')
      .replace(/(<img\b[^>]*>)\n(?=[^\s|])/gi,'$1\n\n')
      .replace(/([^\n])\n(?=[ \t]*<img\b)/gi,'$1\n\n')
    ).join('');
    return body.trim()+'\n';
  }
  return {convert,imageMap,missingImages,incomplete,report};
}
