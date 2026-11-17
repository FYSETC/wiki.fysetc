import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import {readFolderNavigation} from './sync-navigation.mjs';

test('filesystem moves change folder membership while absolute article URLs remain stable', t => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'wiki-folders-'));
  t.after(() => fs.rmSync(root, {recursive: true, force: true}));
  const zh = path.join(root, 'i18n/zh-Hans/docusaurus-plugin-content-docs/current');
  const en = path.join(root, 'i18n/en/docusaurus-plugin-content-docs/current');
  for (const dir of [zh, en]) {
    fs.mkdirSync(path.join(dir, 'controllers'), {recursive: true});
    fs.writeFileSync(path.join(dir, 'controllers/Spider.md'), '---\nid: Spider\nslug: /Spider\n---\nBody\n');
    fs.writeFileSync(path.join(dir, 'controllers/_category_.json'), JSON.stringify({key: 'controllers', label: dir === zh ? '控制板' : 'Controllers', link: {type: 'generated-index', slug: '/category/controllers'}}));
  }
  let result = readFolderNavigation(root);
  assert.equal(result.catalog.categories[0].path, 'category/controllers');
  assert.equal(result.translations['sidebar.wikiSidebar.category.controllers'].message, '控制板');
  assert.equal(result.catalog.categories[0].en, 'Controllers');
  for (const dir of [zh, en]) {
    fs.mkdirSync(path.join(dir, 'hardware/new-subfolder'), {recursive: true});
    fs.renameSync(path.join(dir, 'controllers/Spider.md'), path.join(dir, 'hardware/new-subfolder/Spider.md'));
  }
  result = readFolderNavigation(root);
  assert.equal(result.catalog.categories[0].id, 'hardware');
  assert.equal(result.catalog.categories[0].path, 'Spider');
  assert.equal(result.documents[0].source, 'hardware/new-subfolder/Spider.md');
  assert.equal(result.documents[0].slug, '/Spider');
  // English is the canonical document source even before a translation exists.
  fs.writeFileSync(path.join(en, 'hardware/new-subfolder/English-only.md'), '---\nid: English-only\nslug: /English-only\n---\nEnglish\n');
  assert.ok(readFolderNavigation(root).documents.some(doc => doc.id === 'English-only'));
});

test('changing a category from a deleted landing document to an automatic page updates its public entry', t => {
  const temporary=path.resolve(os.tmpdir());
  const root=fs.mkdtempSync(path.join(temporary,'wiki-category-home-'));
  t.after(()=>{
    const resolved=fs.realpathSync(root);
    assert.ok(resolved.startsWith(fs.realpathSync(temporary)+path.sep)&&path.basename(resolved).startsWith('wiki-category-home-'));
    fs.rmSync(resolved,{recursive:true,force:true});
  });
  for(const locale of ['en','zh-Hans']) {
    const dir=path.join(root,'i18n',locale,'docusaurus-plugin-content-docs/current/controllers');
    fs.mkdirSync(dir,{recursive:true});
    fs.writeFileSync(path.join(dir,'intro.md'),'---\nid: intro\nslug: /Controllers\n---\nIntro');
    fs.writeFileSync(path.join(dir,'board.md'),'---\nid: board\nslug: /Board\n---\nBoard');
    fs.writeFileSync(path.join(dir,'_category_.json'),JSON.stringify({key:'controllers',label:locale==='en'?'Controllers':'控制板',link:{type:'doc',id:'controllers/intro'}}));
  }
  assert.equal(readFolderNavigation(root).catalog.categories[0].path,'Controllers');
  for(const locale of ['en','zh-Hans']) {
    const dir=path.join(root,'i18n',locale,'docusaurus-plugin-content-docs/current/controllers');
    fs.unlinkSync(path.join(dir,'intro.md'));
    fs.writeFileSync(path.join(dir,'_category_.json'),JSON.stringify({key:'controllers',label:locale==='en'?'Controllers':'控制板',link:{type:'generated-index',slug:'/category/controllers'}}));
  }
  const result=readFolderNavigation(root);
  assert.equal(result.catalog.categories[0].path,'category/controllers');
  assert.equal(result.documents.length,1);
  assert.equal(result.translations['sidebar.wikiSidebar.category.controllers'].message,'控制板');
});

test('all homepage recommendations and fixed footer entries point to existing documents', () => {
  const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
  const site=JSON.parse(fs.readFileSync(path.join(root,'navigation/site-links.json'),'utf8'));
  const slugs=new Set(readFolderNavigation(root).documents.map(doc=>doc.slug.replace(/^\/+|\/+$/g,'')));
  assert.equal(site.schemaVersion,1);
  for(const section of ['products','guides','footerDocuments']) {
    assert.ok(Array.isArray(site[section]));
    for(const [index,item]of site[section].entries())assert.ok(slugs.has(item.slug),`navigation/site-links.json ${section}[${index}].slug → ${item.slug} has no document`);
  }
});

test('site navigation remains valid when the last product or guide category disappears', async () => {
  const require=createRequire(import.meta.url);
  const paths=['../navigation/catalog.json','../navigation/site-links.json','../docusaurus.config.js'].map(file=>require.resolve(file));
  const original=paths.map(file=>require.cache[file]);
  try {
    require.cache[paths[0]]={exports:{categories:[]}};
    require.cache[paths[1]]={exports:{schemaVersion:1,products:[],guides:[],footerDocuments:[]}};
    delete require.cache[paths[2]];
    const config=await require(paths[2])();
    assert.ok(config.themeConfig.navbar.items.some(item=>item.to==='/docs/'));
    assert.ok(config.themeConfig.navbar.items.every(item=>!item.items||item.items.length));
    assert.ok(!config.themeConfig.footer||config.themeConfig.footer.links.every(group=>group.items.length));
    assert.ok(!JSON.stringify(config.themeConfig).includes('/docs/Tutorial/'));
    assert.ok(!JSON.stringify(config.themeConfig).includes('/docs/overview/'));
  } finally {
    paths.forEach((file,index)=>{if(original[index])require.cache[file]=original[index];else delete require.cache[file];});
  }
});
