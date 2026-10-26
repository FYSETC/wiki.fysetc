import {test} from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
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
