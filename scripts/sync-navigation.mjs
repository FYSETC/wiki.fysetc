import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import YAML from 'yaml';

const require = createRequire(import.meta.url);
const normalize = value => String(value).replace(/\.md$/i, '').replace(/(?:\.zh|-zh)$/i, '').toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');

export function syncNavigation(root) {
  const defaultDocsDir = path.join(root, 'i18n/zh-Hans/docusaurus-plugin-content-docs/current');
  const englishDocsDir = path.join(root, 'i18n/en/docusaurus-plugin-content-docs/current');
  const snapshotFile = path.join(root, 'navigation/official-categories.json');
  if (!fs.existsSync(snapshotFile)) return;
  const snapshot = JSON.parse(fs.readFileSync(snapshotFile, 'utf8'));
  const oldSidebar = fs.existsSync(path.join(root, 'sidebars.js')) ? require(path.join(root, 'sidebars.js')).wikiSidebar : [];
  const labels = new Map();
  function visit(items) {
    for (const item of items) {
      if (item.type === 'doc') labels.set(item.id, item.label);
      if (item.items) visit(item.items);
    }
  }
  visit(oldSidebar);
  const translationsFile = path.join(root, 'i18n/en/docusaurus-plugin-content-docs/current.json');
  const translations = fs.existsSync(translationsFile) ? JSON.parse(fs.readFileSync(translationsFile, 'utf8')) : {};
  for (const key of Object.keys(translations).filter(key => key.startsWith('sidebar.wikiSidebar.category.'))) delete translations[key];
  const documents = fs.readdirSync(defaultDocsDir).filter(name => name.endsWith('.md')).map(name => {
    const text = fs.readFileSync(path.join(defaultDocsDir, name), 'utf8');
    const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const meta = match ? YAML.parse(match[1]) : {};
    return {id: meta.id || name.slice(0, -3), title: meta.title, source: meta.source_file, generated: meta.site_generated, category: meta.wiki_category, name};
  }).filter(doc => !String(doc.generated || '').startsWith('navigation-'));
  const byId = new Map(documents.map(doc => [doc.id, doc]));
  const validCategories = new Set([...snapshot.categories.map(category => category.id), 'resources']);
  for (const doc of documents) if (doc.category && !validCategories.has(doc.category)) throw new Error('Invalid wiki_category in ' + doc.name + ': ' + doc.category);
  const candidates = new Map();
  for (const doc of documents) {
    const enFile = path.join(englishDocsDir, doc.name);
    const enText = fs.existsSync(enFile) ? fs.readFileSync(enFile, 'utf8') : '';
    const enMatch = enText.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    const enMeta = enMatch ? YAML.parse(enMatch[1]) : {};
    if (doc.category) {
      labels.set(doc.id, doc.title || doc.id);
      translations['sidebar.wikiSidebar.doc.' + (doc.title || doc.id)] = {message: enMeta.title || doc.title || doc.id};
    }
    for (const alias of [doc.id, doc.name, doc.source, doc.title, enMeta.title].filter(Boolean)) {
      const key = normalize(alias);
      if (!candidates.has(key)) candidates.set(key, new Set());
      candidates.get(key).add(doc.id);
    }
  }
  const manualAliases = new Map(Object.entries(snapshot.aliases || {}).map(([name, id]) => [normalize(name), id]));
  const used = new Set(['overview']);
  const details = [];
  const sidebar = [{type: 'doc', id: 'overview', label: labels.get('overview') || '文档总览'}];
  function docItem(id) { return {type: 'doc', id, label: labels.get(id) || byId.get(id).title || id}; }
  for (const category of snapshot.categories) {
    const matched = [], skipped = [], mergedLanguageVariants = [], categoryOverrides = [], ids = [];
    if (category.intro && byId.has(category.intro) && (!byId.get(category.intro).category || byId.get(category.intro).category === category.id)) { ids.push(category.intro); used.add(category.intro); }
    for (const article of category.articles) {
      const manualId = manualAliases.get(normalize(article.title));
      const keys = [normalize(article.title), normalize(decodeURIComponent(article.url.split('/').pop()))];
      const possible = new Set(keys.flatMap(key => [...(candidates.get(key) || [])]));
      const id = manualId && byId.has(manualId) ? manualId : possible.size === 1 ? [...possible][0] : null;
      if (!id) { skipped.push({...article, reason: possible.size > 1 ? 'ambiguous local match' : 'not found locally'}); continue; }
      if (byId.get(id).category && byId.get(id).category !== category.id) { categoryOverrides.push({...article, documentId: id, assignedCategory: byId.get(id).category}); continue; }
      if (ids.includes(id)) { mergedLanguageVariants.push({...article, documentId: id}); continue; }
      if (used.has(id)) throw new Error('Article assigned twice: ' + id);
      ids.push(id); used.add(id); matched.push({...article, documentId: id});
    }
    for (const doc of documents.filter(doc => doc.category === category.id && !used.has(doc.id))) { ids.push(doc.id); used.add(doc.id); }
    const description = ids.length ? '按 ' + category.en + ' 分类收录本地文档，包含官网匹配文章及手工新增资料。'
      : category.intro ? '官网产品文章暂未在本地匹配，保留已有分类说明。' : '官网目录中的文章暂未在本地匹配，本分类暂不显示文章。';
    const englishDescription = ids.length ? 'Local documents in ' + category.en + ', including official matches and manually added documentation.'
      : category.intro ? 'No official product articles were matched locally. The existing category introduction is retained.' : 'No articles in the official directory were matched to the local documentation.';
    const key = 'sidebar.wikiSidebar.category.' + category.zh;
    translations[key] = {message: category.en};
    translations[key + '.link.generated-index.title'] = {message: category.en};
    translations[key + '.link.generated-index.description'] = {message: englishDescription};
    let link = {type: 'generated-index', title: category.zh, description, slug: '/category/' + category.id};
    if (!ids.length) {
      // Docusaurus drops an empty generated-index category. A real category
      // landing page keeps its route available without adding a fake article.
      const landingId = 'category-' + category.id;
      translations['sidebar.wikiSidebar.doc.' + category.zh] = {message: category.en};
      for (const locale of ['zh-Hans', 'en']) {
        const english = locale === 'en';
        const dir = english ? englishDocsDir : defaultDocsDir;
        const header = {id: landingId, title: english ? category.en : category.zh, slug: '/category/' + category.id, site_generated: 'navigation-empty-category', source_language: english ? 'en' : 'zh'};
        const body = english ? 'No articles from this official category were matched to the local documentation. This category is retained for future additions.' : '官网本分类中的文章暂未在本地资料中匹配到。暂保留分类入口，后续可补充对应文档。';
        fs.writeFileSync(path.join(dir, landingId + '.md'), '---\n' + YAML.stringify(header) + '---\n\n' + body + '\n');
      }
      link = {type: 'doc', id: landingId};
    } else {
      for (const dir of [defaultDocsDir, englishDocsDir]) {
        const staleLanding = path.join(dir, 'category-' + category.id + '.md');
        if (fs.existsSync(staleLanding) && /^site_generated: navigation-empty-category$/m.test(fs.readFileSync(staleLanding, 'utf8'))) fs.unlinkSync(staleLanding);
      }
    }
    const items = ids.length ? ids.map(docItem) : [{type: 'doc', id: 'category-' + category.id}];
    sidebar.push({type: 'category', label: category.zh, collapsed: true, link, items});
    details.push({id: category.id, name: category.en, referenceUrl: category.url, documents: ids, matched, skipped, mergedLanguageVariants, categoryOverrides});
  }
  const starterIds = ['intro', 'first-article'].filter(id => byId.has(id));
  for (const id of starterIds) used.add(id);
  if (starterIds.length) {
    sidebar.push({type: 'category', label: '快速开始', collapsed: true, link: {type: 'doc', id: starterIds[0]}, items: starterIds.map(docItem)});
    translations['sidebar.wikiSidebar.category.快速开始'] = {message: 'Getting started'};
    for (const id of starterIds) {
      const doc = byId.get(id);
      const enFile = path.join(englishDocsDir, doc.name);
      const enText = fs.existsSync(enFile) ? fs.readFileSync(enFile, 'utf8') : '';
      const enMatch = enText.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      const enMeta = enMatch ? YAML.parse(enMatch[1]) : {};
      translations['sidebar.wikiSidebar.doc.' + (labels.get(id) || doc.title || id)] = {message: enMeta.title || doc.title || id};
    }
  }
  const legacy = documents.filter(doc => !used.has(doc.id));
  sidebar.push({type: 'doc', id: 'additional-resources', label: '补充资料'});
  translations['sidebar.wikiSidebar.doc.补充资料'] = {message: 'Additional resources'};
  for (const locale of ['zh-Hans', 'en']) {
    const english = locale === 'en';
    const dir = english ? englishDocsDir : defaultDocsDir;
    // Docusaurus adds the site path and current locale to internal links.
    const base = '/docs/';
    const links = legacy.map(doc => {
      const label = labels.get(doc.id) || doc.title || doc.id;
      const title = english ? translations['sidebar.wikiSidebar.doc.' + label]?.message || doc.id : label;
      return '- [' + title + '](' + base + doc.id + '/)';
    }).join('\n');
    const header = {id: 'additional-resources', title: english ? 'Additional resources' : '补充资料', slug: '/category/resources', site_generated: 'navigation-resource-index', source_language: english ? 'en' : 'zh'};
    const body = english ? 'These documents exist locally but do not match the current official category directory. Their contents and original document URLs are retained.' : '以下文章在本地存在，但未匹配到官网当前的十类目录。保留原有内容和文档地址，供查阅旧版资料。';
    fs.writeFileSync(path.join(dir, 'additional-resources.md'), '---\n' + YAML.stringify(header) + '---\n\n' + body + '\n\n' + links + '\n');
    for (const doc of legacy) {
      const file = path.join(dir, doc.name);
      if (!fs.existsSync(file)) continue; // Docusaurus uses the default-locale fallback.
      let text = fs.readFileSync(file, 'utf8');
      if (!/^displayed_sidebar:/m.test(text)) {
        text = text.replace(/^---\r?\n/, '---\ndisplayed_sidebar: wikiSidebar\n');
        fs.writeFileSync(file, text);
      }
    }
  }
  fs.writeFileSync(path.join(root, 'sidebars.js'), '// Main categories follow navigation/official-categories.json.\nmodule.exports = ' + JSON.stringify({wikiSidebar: sidebar}, null, 2) + ';\n');
  fs.writeFileSync(translationsFile, JSON.stringify(translations, null, 2) + '\n');
  const report = {referenceUrl: snapshot.source, checkedOn: snapshot.checkedOn, localSourceDocuments: documents.length, matchedArticleDocuments: details.reduce((sum, cat) => sum + cat.matched.length, 0), skippedRemoteEntries: details.reduce((sum, cat) => sum + cat.skipped.length, 0), mergedLanguageVariants: details.reduce((sum, cat) => sum + cat.mergedLanguageVariants.length, 0), categories: details, retainedLegacyDocuments: legacy.map(doc => ({id: doc.id, source: doc.source}))};
  return report;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const report = syncNavigation(root);
  console.log(JSON.stringify({categories: report.categories.map(cat => ({name: cat.name, documents: cat.documents.length, skipped: cat.skipped.length})), matchedArticleDocuments: report.matchedArticleDocuments, retainedLegacyDocuments: report.retainedLegacyDocuments.length}, null, 2));
}
