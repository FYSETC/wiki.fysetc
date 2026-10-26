import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

// Validate the entire graph before writing any generated files.
export function buildNavigation(config, documents) {
  config = {categories: [], articles: [], ...config};
  if (config.version !== 1 || !Array.isArray(config.categories) || !Array.isArray(config.articles)) throw new Error('Invalid navigation/tree.json format');
  const categories = new Map();
  const assigned = new Set();
  const children = new Map([['', []]]);
  const add = (parent, item) => {
    if (!children.has(parent)) children.set(parent, []);
    children.get(parent).push(item);
  };
  for (const category of config.categories) {
    if (!/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(category.id) || categories.has(category.id) || !category.zh?.trim() || !category.en?.trim()) throw new Error('Invalid or duplicate category: ' + category.id);
    categories.set(category.id, category);
  }
  for (const category of config.categories) {
    const parent = category.parent || '';
    if (parent && !categories.has(parent)) throw new Error('Missing parent: ' + parent);
    const visited = new Set([category.id]);
    let ancestor = parent;
    while (ancestor) {
      if (visited.has(ancestor)) throw new Error('Category cycle: ' + category.id);
      visited.add(ancestor);
      ancestor = categories.get(ancestor)?.parent || '';
    }
    if (category.intro && !documents.has(category.intro)) throw new Error('Missing category introduction: ' + category.intro);
    add(parent, {category, order: category.order ?? 100});
  }
  for (const article of config.articles) {
    if (!documents.has(article.doc)) throw new Error('Missing document: ' + article.doc);
    if (assigned.has(article.doc)) throw new Error('Document assigned twice: ' + article.doc);
    const parent = article.parent || '';
    if (parent && !categories.has(parent)) throw new Error('Missing article parent: ' + parent);
    assigned.add(article.doc);
    add(parent, {article, order: article.order ?? 100});
  }
  for (const items of children.values()) {
    for (const item of items) if (!Number.isFinite(item.order)) throw new Error('Navigation order must be a number');
    items.sort((a, b) => a.order - b.order);
  }
  const translations = {};
  function render(parent) {
    return (children.get(parent) || []).map(({category, article}) => {
      if (article) return {type: 'doc', id: article.doc};
      const key = 'sidebar.wikiSidebar.category.' + category.zh;
      translations[key] = {message: category.en};
      translations[key + '.link.generated-index.title'] = {message: category.en};
      const items = render(category.id);
      // An HTML placeholder retains empty folders without creating fake documents.
      if (!items.length) items.push({type: 'html', value: '<span>—</span>', defaultStyle: true});
      return {type: 'category', label: category.zh, collapsed: true,
        link: category.intro ? {type: 'doc', id: category.intro} : {type: 'generated-index', title: category.zh, slug: '/category/' + category.id}, items};
    });
  }
  const sidebar = render('');
  const unassigned = [...documents.values()].filter(doc => !assigned.has(doc.id) && !config.categories.some(category => category.intro === doc.id));
  if (unassigned.length) {
    sidebar.push({type: 'category', label: '未归档文档', items: unassigned.map(doc => ({type: 'doc', id: doc.id}))});
    translations['sidebar.wikiSidebar.category.未归档文档'] = {message: 'Unfiled documents'};
  }
  return {sidebar, translations, unassigned: unassigned.map(doc => doc.id)};
}

export function syncManagedNavigation(root) {
  const docsDir = path.join(root, 'i18n/zh-Hans/docusaurus-plugin-content-docs/current');
  const documents = new Map();
  for (const name of fs.readdirSync(docsDir).filter(name => name.endsWith('.md'))) {
    const text = fs.readFileSync(path.join(docsDir, name), 'utf8');
    const meta = YAML.parse(text.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || '') || {};
    const id = meta.id || name.slice(0, -3);
    if (documents.has(id)) throw new Error('Duplicate document ID: ' + id);
    documents.set(id, {id, ...meta});
  }
  const config = {categories: [], articles: [], ...JSON.parse(fs.readFileSync(path.join(root, 'navigation/tree.json'), 'utf8'))};
  const result = buildNavigation(config, documents);
  const translationsFile = path.join(root, 'i18n/en/docusaurus-plugin-content-docs/current.json');
  const translations = JSON.parse(fs.readFileSync(translationsFile, 'utf8'));
  for (const key of Object.keys(translations)) if (key.startsWith('sidebar.wikiSidebar.category.')) delete translations[key];
  Object.assign(translations, result.translations);
  const catalog = {categories: config.categories.filter(category => !category.parent).sort((a, b) => (a.order ?? 100) - (b.order ?? 100)).map(category => ({
    ...category, icon: category.icon || 'folder',
    path: category.intro ? String(documents.get(category.intro).slug || '/' + category.intro).replace(/^\//, '') : 'category/' + category.id,
  }))};
  fs.writeFileSync(path.join(root, 'navigation/catalog.json'), JSON.stringify(catalog, null, 2) + '\n');
  fs.writeFileSync(path.join(root, 'sidebars.js'), '// Generated from navigation/tree.json. Edit navigation in the CMS.\nmodule.exports = ' + JSON.stringify({wikiSidebar: result.sidebar}, null, 2) + ';\n');
  fs.writeFileSync(translationsFile, JSON.stringify(translations, null, 2) + '\n');
  return {managed: true, categories: config.categories.map(cat => ({name: cat.zh, documents: config.articles.filter(doc => doc.parent === cat.id).length})), unassigned: result.unassigned};
}
