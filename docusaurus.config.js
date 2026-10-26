const {themes} = require('prism-react-renderer');
const officialNavigation = require('./navigation/catalog.json');

module.exports = async function () {
  const {default: remarkMath} = await import('remark-math');
  const {default: rehypeKatex} = await import('rehype-katex');
  return {
    title: 'FYSETC Wiki',
    tagline: '产品文档 · 硬件资料 · 配置指南',
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
      defaultLocale: 'zh-Hans',
      locales: ['zh-Hans', 'en'],
      localeConfigs: {
        'zh-Hans': {label: '简体中文', htmlLang: 'zh-Hans'},
        en: {label: 'English', htmlLang: 'en'},
      },
    },
    presets: [['classic', {
      docs: {
        path: './i18n/zh-Hans/docusaurus-plugin-content-docs/current',
        routeBasePath: 'docs',
        sidebarPath: require.resolve('./sidebars.js'),
        editLocalizedFiles: true,
        editUrl: ({locale, docPath}) =>
          `https://github.com/FYSETC/wiki.fysetc/edit/new-doc/i18n/${locale}/docusaurus-plugin-content-docs/current/${docPath}`,
        remarkPlugins: [remarkMath],
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
          {label: '产品文档', position: 'left', items: officialNavigation.categories
            .filter(category => category.id !== 'guides')
            .map(category => ({label: category.zh, to: `/docs/${category.path}/`}))},
          {to: '/docs/Tutorial/', label: '教程与配置', position: 'left'},
          {to: '/docs/category/resources/', label: '补充资料', position: 'left'},
          {label: '社区与支持', position: 'right', items: [
            {label: '文档反馈', href: 'https://github.com/FYSETC/wiki.fysetc/issues'},
            {label: 'FYSETC 官方网站', href: 'https://www.fysetc.com'},
            {label: '技术论坛', href: 'http://forum.fysetc.com/'},
          ]},
          {type: 'localeDropdown', position: 'right'},
          {href: 'https://github.com/FYSETC/wiki.fysetc', label: 'GitHub', position: 'right', className: 'wiki-navbar-source-link'},
        ],
      },
      docs: {sidebar: {hideable: true, autoCollapseCategories: true}},
      footer: {
        style: 'light',
        links: [
          {title: '产品文档', items: [{label: '控制板', to: '/docs/Controllers/'}, {label: '步进驱动', to: '/docs/Stepper-Drivers/'}, {label: '显示面板', to: '/docs/LCDs-and-Displays/'}]},
          {title: '学习与配置', items: [{label: '使用教程', to: '/docs/Tutorial/'}, {label: 'Spider 硬件指南', to: '/docs/Spider_Hardware_Guide/'}, {label: 'Spider 软件指南', to: '/docs/Spider_Software_Guide/'}]},
          {title: '资源与支持', items: [{label: '补充资料', to: '/docs/category/resources/'}, {label: '文档反馈', href: 'https://github.com/FYSETC/wiki.fysetc/issues'}, {label: '文档源仓库', href: 'https://github.com/FYSETC/wiki.fysetc'}]},
          {title: 'FYSETC', items: [{label: '官方网站', href: 'https://www.fysetc.com'}, {label: '技术论坛', href: 'http://forum.fysetc.com/'}, {label: '文档总览', to: '/docs/overview/'}]},
        ],
        copyright: 'FYSETC 产品文档与图片 · CC BY-SA 4.0 · 本地测试站',
      },
      prism: {theme: themes.github, darkTheme: themes.dracula, additionalLanguages: ['bash', 'ini', 'diff', 'json', 'python', 'c', 'cpp']},
    },
  };
};
