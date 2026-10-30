import GithubSlugger from 'github-slugger';

// Convert the export's paired MkDocs callouts to Docusaurus callouts.
export function formatHelpLook(body) {
  let fence = null;
  let comment = false;
  let callout = false;
  const result = [];
  const types = {attention: 'warning', caution: 'warning', bug: 'danger', error: 'danger',
    abstract: 'note', example: 'info', question: 'tip', important: 'warning'};
  for (const line of body.split(/\r?\n/)) {
    if (line.includes('<!--')) comment = true;
    if (comment) { result.push(line); if (line.includes('-->')) comment = false; continue; }
    const code = line.match(/^\s*(`{3,}|~{3,})/);
    if (code) {
      if (!fence) fence = code[1][0];
      else if (fence === code[1][0]) fence = null;
      result.push(line);
      continue;
    }
    if (fence) { result.push(line); continue; }
    const marker = line.match(/^\s*!!!\s*(\w+)?\s*(.*?)\s*$/);
    if (!marker) { result.push(line); continue; }
    if (!marker[1]) {
      if (callout) result.push('', ':::', '');
      callout = false;
    } else {
      if (callout) result.push('', ':::', '');
      const original = marker[1].toLowerCase();
      const type = types[original] || (['note', 'tip', 'info', 'warning', 'danger'].includes(original) ? original : 'note');
      const title = marker[2].replace(/^["']|["']$/g, '');
      result.push('', ':::' + type + (title ? ' ' + title : ''), '');
      callout = true;
    }
  }
  if (callout) result.push('', ':::', '');
  const formatted = result.join('\n').replace(/<a\b[^>]*\bhref\s*=\s*(["'])\s*\1[^>]*>([\s\S]*?)<\/a>/gi, '$2')
    .replace(/(<img\b[^>]*\bstyle=["'])position:relative;left:\d+px;(["'])/gi, '$1max-width:100%;$2')
    .replace(/<[^>]+>/g, tag => tag.replace(/\u00a0/g, ' '));
  const slugger = new GithubSlugger();
  const headings = [];
  const normalize = text => text.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
  for (const heading of formatted.matchAll(/^#{1,6}\s+(.+)$/gm)) {
    const title = heading[1].replace(/<[^>]+>/g, '').replace(/[*`\\]/g, '').trim();
    headings.push({key: normalize(title), id: slugger.slug(title)});
  }
  function anchor(fragment) {
    let text;
    try { text = decodeURIComponent(fragment.slice(1)); } catch { return fragment; }
    const key = normalize(text);
    const match = headings.find(heading => heading.key === key);
    const candidates = headings.filter(heading => heading.key.startsWith(key));
    const target = match || (candidates.length === 1 ? candidates[0] : null);
    return target ? '#' + target.id : fragment;
  }
  return formatted.replace(/(\]\()(#[^\n]*?)(\))(?=[\s.,;:!?]|$)/g, (all, start, fragment, end) => start + anchor(fragment) + end)
    .replace(/(href=["'])(#[^"'\n]*)(["'])/g, (all, start, fragment, end) => start + anchor(fragment) + end);
}
