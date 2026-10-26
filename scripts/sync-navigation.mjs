import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import YAML from 'yaml';

function readCategory(folder) {
  const files = ['_category_.json', '_category_.yml', '_category_.yaml'].filter(name => fs.existsSync(path.join(folder, name)));
  if (files.length > 1) throw new Error('Multiple category metadata files: ' + folder);
  return files.length ? YAML.parse(fs.readFileSync(path.join(folder, files[0]), 'utf8')) || {} : {};
}

// Folders define the sidebar. Only homepage links and English labels are derived here.
export function readFolderNavigation(root) {
  const docsRoot = path.join(root, 'i18n/zh-Hans/docusaurus-plugin-content-docs/current');
  const englishRoot = path.join(root, 'i18n/en/docusaurus-plugin-content-docs/current');
  const documents = [];
  const directories = [];
  function visit(folder, relative = '') {
    for (const entry of fs.readdirSync(folder, {withFileTypes: true})) {
      const file = path.join(folder, entry.name);
      const source = path.posix.join(relative, entry.name);
      if (entry.isDirectory()) { directories.push(source); visit(file, source); }
      else if (/\.mdx?$/.test(entry.name)) {
        const text = fs.readFileSync(file, 'utf8');
        const meta = YAML.parse(text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || '') || {};
        const id = meta.id || entry.name.replace(/\.mdx?$/, '');
        documents.push({id, source, folder: relative, slug: meta.slug || '/' + path.posix.join(relative, id)});
      }
    }
  }
  visit(docsRoot);
  const translations = {};
  const categories = [];
  for (const directory of directories) {
    const articles = documents.filter(doc => doc.folder === directory || doc.folder.startsWith(directory + '/'));
    if (!articles.length) continue;
    const metadata = readCategory(path.join(docsRoot, directory));
    const enFolder = path.join(englishRoot, directory);
    const english = fs.existsSync(enFolder) ? readCategory(enFolder) : {};
    const label = metadata.label || path.posix.basename(directory);
    const key = 'sidebar.wikiSidebar.category.' + (metadata.key || label);
    const englishLabel = english.label || label;
    translations[key] = {message: englishLabel};
    if (metadata.link?.type === 'generated-index') {
      translations[key + '.link.generated-index.title'] = {message: english.link?.title || englishLabel};
      if (metadata.link.description) translations[key + '.link.generated-index.description'] = {message: english.link?.description || metadata.link.description};
    }
    let target;
    if (metadata.link?.type === 'doc') {
      const linked = articles.find(doc => doc.id === metadata.link.id || path.posix.join(doc.folder, doc.id) === metadata.link.id);
      if (!linked) throw new Error('Missing category landing document: ' + directory + '/' + metadata.link.id);
      target = linked.slug;
    } else if (metadata.link?.type === 'generated-index') target = metadata.link.slug || '/category/' + directory;
    else target = articles.find(doc => /^(index|readme)$/i.test(doc.id))?.slug || articles[0].slug;
    if (!directory.includes('/')) categories.push({id: directory, zh: label, en: englishLabel,
      icon: metadata.customProps?.icon || 'folder', position: metadata.position ?? 100,
      path: String(target).replace(/^\//, '').replace(/\/$/, '')});
  }
  categories.sort((a, b) => a.position - b.position || a.id.localeCompare(b.id));
  return {catalog: {categories}, translations, documents};
}

export function syncNavigation(root) {
  const result = readFolderNavigation(root);
  const file = path.join(root, 'i18n/en/docusaurus-plugin-content-docs/current.json');
  const translations = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
  for (const key of Object.keys(translations)) if (key.startsWith('sidebar.wikiSidebar.category.')) delete translations[key];
  Object.assign(translations, result.translations);
  fs.writeFileSync(path.join(root, 'navigation/catalog.json'), JSON.stringify(result.catalog, null, 2) + '\n');
  fs.writeFileSync(file, JSON.stringify(translations, null, 2) + '\n');
  return {source: 'document folders', categories: result.catalog.categories.length, documents: result.documents.length};
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(JSON.stringify(syncNavigation(path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')), null, 2));
}
