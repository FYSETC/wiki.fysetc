import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {evaluate} from '@mdx-js/mdx';
import React from 'react';
import * as runtime from 'react/jsx-runtime';
import {renderToStaticMarkup} from 'react-dom/server';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

const require = createRequire(import.meta.url);
const config = await require('../docusaurus.config.js')();
const {remarkPlugins, rehypePlugins} = config.presets[0][1].docs;
async function render(markdown) {
  const {default: Content} = await evaluate(markdown, {
    ...runtime, format: config.markdown.format,
    remarkPlugins: [remarkGfm, ...remarkPlugins], rehypePlugins: [rehypeRaw, ...rehypePlugins],
  });
  return renderToStaticMarkup(React.createElement(Content));
}

test('Chinese and English soft line endings render as line breaks', async () => {
  for (const newline of ['\n', '\r\n', '\r']) {
    const html = await render(['第一行', '第二行', 'First line', 'Second line'].join(newline));
    assert.match(html, /第一行<br\s*\/?>(?:\s*)第二行/);
    assert.match(html, /First line<br\s*\/?>(?:\s*)Second line/);
    assert.equal((html.match(/<br\b/g) || []).length, 3);
  }
});

test('blank lines remain paragraph boundaries', async () => {
  const html = await render('第一段\n\nSecond paragraph');
  assert.equal((html.match(/<p>/g) || []).length, 2);
  assert.doesNotMatch(html, /<br\b/);
});

test('code keeps literal line endings without HTML breaks', async () => {
  const html = await render('```text\nfirst line\nsecond line\n```\n\n`inline code`');
  assert.match(html, /<pre><code[^>]*>first line\nsecond line\n<\/code><\/pre>/);
  assert.match(html, /<code>inline code<\/code>/);
  assert.doesNotMatch(html, /<br\b/);
});

test('lists, tables and multiline HTML attributes keep their structure', async () => {
  const html = await render('- 第一步\n  补充说明\n- 第二步\n\n| 名称 | 值 |\n| --- | --- |\n| A | 1 |\n\n<img\n src="/images/example.png"\n width="20" />');
  assert.equal((html.match(/<li>/g) || []).length, 2);
  assert.match(html, /第一步<br\s*\/?>(?:\s*)补充说明/);
  assert.equal((html.match(/<table>/g) || []).length, 1);
  assert.equal((html.match(/<td>/g) || []).length, 2);
  assert.match(html, /<img[^>]*src="\/images\/example\.png"[^>]*width="20"/);
});

test('multiline math is still handled by the existing math plugins', async () => {
  const html = await render('$$\na + b\n= c\n$$');
  assert.match(html, /katex-display/);
  assert.doesNotMatch(html, /<br\b/);
});
