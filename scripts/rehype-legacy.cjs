// CommonMark deliberately preserves the legacy HTML. Normalize its attributes
// and expose the migrated interactive calculator through MDX's element map.
module.exports = function legacyHtml() {
  return function transform(tree) {
    function visit(node) {
      if (node.type === 'element') {
        if (node.tagName === 'p' && node.children?.some(child => child.tagName === 'driver-calculator')) {
          node.tagName = 'div';
        }
        if (node.tagName === 'span' && node.properties?.id) node.tagName = 'legacy-anchor';
        const p = node.properties || {};
        for (const key of Object.keys(p)) {
          if (/^on/i.test(key)) delete p[key];
        }
        if (node.tagName === 'script') {
          node.tagName = 'span';
          node.children = [];
        }
      }
      for (const child of node.children || []) visit(child);
    }
    visit(tree);
  };
};
