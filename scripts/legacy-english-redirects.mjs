import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = await require(path.join(root, 'docusaurus.config.js'))();
const build = path.join(root, 'build');
const base = '/' + config.baseUrl.split('/').filter(Boolean).join('/') + '/';
const basePath = base === '//' ? '/' : base;
const localized = new Set(config.i18n.locales);
const sources = [];
function collect(directory, relative = '') {
  for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
    if (!relative && (localized.has(entry.name) || entry.name === 'assets')) continue;
    const source = path.posix.join(relative, entry.name);
    if (entry.isDirectory()) collect(path.join(directory, entry.name), source);
    else if (entry.name === 'index.html') sources.push(source);
  }
}
collect(build);
for (const source of sources) {
  const target = basePath + source.replace(/index\.html$/, '');
  const destination = path.join(build, 'en', source);
  fs.mkdirSync(path.dirname(destination), {recursive: true});
  fs.writeFileSync(destination, '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Redirecting…</title>' +
    '<meta http-equiv="refresh" content="0;url=' + target + '"><link rel="canonical" href="' + target + '">' +
    '</head><body><a href="' + target + '">Continue to the English page</a><script>location.replace(' + JSON.stringify(target) +
    '+location.search+location.hash);</script></body></html>');
}
console.log('Preserved ' + sources.length + ' legacy /en/ page addresses as redirects.');
