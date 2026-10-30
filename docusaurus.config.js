const {themes} = require('prism-react-renderer');
const officialNavigation = require('./navigation/catalog.json');

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
          {label: 'Product docs', position: 'left', items: officialNavigation.categories
            .filter(category => category.id !== 'guides')
            .map(category => ({label: category.en, to: `/docs/${category.path}/`}))},
          {to: '/docs/Tutorial/', label: 'Guides & setup', position: 'left'},
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
          {title: 'Product docs', items: [{label: 'Controllers', to: '/docs/Controllers/'}, {label: 'Stepper drivers', to: '/docs/Stepper-Drivers/'}, {label: 'Displays', to: '/docs/LCDs-and-Displays/'}]},
          {title: 'Learning & setup', items: [{label: 'Guides', to: '/docs/Tutorial/'}, {label: 'Spider hardware guide', to: '/docs/Spider_Hardware_Guide/'}, {label: 'Spider software guide', to: '/docs/Spider_Software_Guide/'}]},
          {title: 'Support', items: [{label: 'Wiki feedback', href: 'https://github.com/FYSETC/wiki.fysetc/issues'}, {label: 'Source repository', href: 'https://github.com/FYSETC/wiki.fysetc'}]},
          {title: 'FYSETC', items: [{label: 'Official website', href: 'https://www.fysetc.com'}, {label: 'Support forum', href: 'http://forum.fysetc.com/'}, {label: 'Wiki overview', to: '/docs/overview/'}]},
        ],
        copyright: 'FYSETC documentation and images · CC BY-SA 4.0 · Local test edition',
      },
      prism: {theme: themes.github, darkTheme: themes.dracula, additionalLanguages: ['bash', 'ini', 'diff', 'json', 'python', 'c', 'cpp']},
    },
  };
};
