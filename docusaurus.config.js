const {themes} = require('prism-react-renderer');
const officialNavigation = require('./navigation/catalog.json');
const siteLinks = require('./navigation/site-links.json');
const productCategories = officialNavigation.categories.filter(category => category.id !== 'guides');

// Category destinations follow _category_ metadata through the generated catalog.
const categoryItem = (id, label) => {
  const category = officialNavigation.categories.find(item => item.id === id);
  return category ? {label: label || category.en, to: `/docs/${category.path}/`} : undefined;
};

module.exports = async function () {
  const {default: remarkMath} = await import('remark-math');
  const {default: remarkBreaks} = await import('remark-breaks');
  const {default: rehypeKatex} = await import('rehype-katex');
  return {
    title: 'FYSETC Wiki',
    tagline: 'Product documentation · Hardware references · Configuration guides',
    favicon: 'images/favicon.ico',
    url: process.env.SITE_URL || 'http://localhost:3000',
    baseUrl: process.env.SITE_BASE_URL || '/wiki.fysetc/',
    organizationName: "FYSETC",
    projectName: "wiki.fysetc",
    trailingSlash: true,
    onBrokenLinks: 'throw',
    onBrokenAnchors: 'throw',
    markdown: {
      format: 'md',
      hooks: {onBrokenMarkdownLinks: 'throw', onBrokenMarkdownImages: 'throw'},
    },
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'zh-Hans'],
      localeConfigs: {
        'zh-Hans': {label: '简体中文', htmlLang: 'zh-Hans'},
        en: {label: 'English', htmlLang: 'en'},
      },
    },
    presets: [['classic', {
      docs: {
        path: './i18n/en/docusaurus-plugin-content-docs/current',
        routeBasePath: 'docs',
        sidebarPath: require.resolve('./sidebars.js'),
        numberPrefixParser: false,
        editLocalizedFiles: true,
        editUrl: ({locale, docPath}) =>
          `https://github.com/FYSETC/wiki.fysetc/edit/new-doc/i18n/${locale}/docusaurus-plugin-content-docs/current/${docPath}`,
        remarkPlugins: [remarkMath, remarkBreaks],
        rehypePlugins: [rehypeKatex, require('./scripts/rehype-legacy.cjs')],
      },
      blog: false,
      theme: {customCss: require.resolve('./src/css/custom.css')},
    }]],
    clientModules: [require.resolve('katex/dist/katex.min.css')],
    themes: [['@easyops-cn/docusaurus-search-local', {
      hashed: true,
      language: ['en', 'zh'],
      indexDocs: true,
      indexBlog: false,
      indexPages: true,
      docsRouteBasePath: '/docs',
      highlightSearchTermsOnTargetPage: true,
      searchResultLimits: 8,
    }]],
    themeConfig: {
      image: 'images/bunner.png',
      colorMode: {respectPrefersColorScheme: true},
      navbar: {
        title: '',
        logo: {alt: 'FYSETC', src: 'images/fysetc-navbar-white.svg'},
        items: [
          {label: 'Product docs', position: 'left', ...(productCategories.length
            ? {items: productCategories.map(category => ({label: category.en, to: `/docs/${category.path}/`}))}
            : {to: '/docs/'})},
          ...[categoryItem('guides', 'Guides & setup')].filter(Boolean).map(item => ({...item, position: 'left'})),
          {label: 'Community & support', position: 'right', items: [
            {label: 'Wiki feedback', href: 'https://github.com/FYSETC/wiki.fysetc/issues'},
            {label: 'FYSETC website', href: 'https://www.fysetc.com'},
            {label: 'Support forum', href: 'http://forum.fysetc.com/'},
          ]},
          {type: 'localeDropdown', position: 'right'},
          {href: 'https://github.com/FYSETC/wiki.fysetc', label: 'GitHub', position: 'right', className: 'wiki-navbar-source-link'},
        ],
      },
      docs: {sidebar: {hideable: true, autoCollapseCategories: true}},
      footer: {
        style: 'light',
        links: [
          {title: 'Product docs', items: [['controllers', 'Controllers'], ['drivers', 'Stepper drivers'], ['displays', 'Displays']].map(([id, label]) => categoryItem(id, label)).filter(Boolean)},
          {title: 'Learning & setup', items: [categoryItem('guides', 'Guides'), ...siteLinks.footerDocuments.map(item => ({label: item.label, to: `/docs/${item.slug}/`}))].filter(Boolean)},
          {title: 'Support', items: [{label: 'Wiki feedback', href: 'https://github.com/FYSETC/wiki.fysetc/issues'}, {label: 'Source repository', href: 'https://github.com/FYSETC/wiki.fysetc'}]},
          {title: 'FYSETC', items: [{label: 'Official website', href: 'https://www.fysetc.com'}, {label: 'Support forum', href: 'http://forum.fysetc.com/'}, {label: 'Wiki overview', to: '/docs/'}]},
        ].filter(group => group.items.length),
        copyright: 'FYSETC documentation and images · CC BY-SA 4.0 · Local test edition',
      },
      prism: {theme: themes.github, darkTheme: themes.dracula, additionalLanguages: ['bash', 'ini', 'diff', 'json', 'python', 'c', 'cpp']},
    },
  };
};
