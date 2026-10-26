import {test} from 'node:test';
import assert from 'node:assert/strict';
import {buildNavigation} from './managed-navigation.mjs';

const documents = new Map(['a', 'b', 'c'].map(id => [id, {id}]));
const category = (id, parent = '', order = 10) => ({id, parent, order, zh: id, en: id.toUpperCase()});
test('nested folders, mixed ordering, moving documents and unfiled fallback', () => {
  const config = {version: 1, categories: [category('root'), category('child', 'root', 20)], articles: [{doc: 'a', parent: 'root', order: 10}, {doc: 'b', parent: 'child', order: 10}]};
  const result = buildNavigation(config, documents);
  assert.equal(result.sidebar[0].items[0].id, 'a');
  assert.equal(result.sidebar[0].items[1].items[0].id, 'b');
  assert.deepEqual(result.unassigned, ['c']);
  config.articles[0].parent = 'child';
  assert.equal(buildNavigation(config, documents).sidebar[0].items[0].items[0].id, 'a');
});
test('invalid graphs and missing/duplicate documents fail before generation', () => {
  const valid = {version: 1, categories: [category('root')], articles: [{doc: 'a', parent: 'root'}]};
  for (const change of [
    config => config.categories.push(category('root')),
    config => config.categories[0].parent = 'root',
    config => {config.categories[0].parent = 'child'; config.categories.push(category('child', 'root'));},
    config => config.articles[0].parent = 'missing',
    config => config.articles[0].doc = 'missing',
    config => config.articles.push({doc: 'a'}),
    config => config.categories[0].intro = 'missing',
    config => config.articles[0].order = 'first',
  ]) {
    const config = structuredClone(valid); change(config);
    assert.throws(() => buildNavigation(config, documents));
  }
});
test('empty folders retain their generated index, bilingual labels and stable route', () => {
  const result = buildNavigation({version: 1, categories: [category('empty')], articles: []}, new Map());
  assert.equal(result.sidebar[0].link.slug, '/category/empty');
  assert.equal(result.sidebar[0].items[0].type, 'html');
  assert.equal(result.translations['sidebar.wikiSidebar.category.empty'].message, 'EMPTY');
});
test('CMS may omit empty optional lists', () => {
  assert.deepEqual(buildNavigation({version: 1}, documents).unassigned, ['a', 'b', 'c']);
});
