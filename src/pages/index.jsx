import React, {useRef, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import officialNavigation from '../../navigation/catalog.json';
import styles from './index.module.css';

const categories = officialNavigation.categories;

const products = [
  {slug: 'Spider', title: 'Spider', category: 'controllers', image: 'images/Spider.png', zh: '8 路步进驱动 · STM32F446', en: '8 stepper drivers · STM32F446'},
  {slug: 'Cheatah_Board_V30', title: 'Cheetah V3.0', category: 'controllers', image: 'images/Cheetah_Top.jpg', zh: '紧凑型控制板 · CAN 接口', en: 'Compact controller · CAN interface'},
  {slug: 'F6_V1.3', title: 'FYSETC F6', category: 'controllers', image: 'images/F6V1.3.jpg', zh: '6 路驱动插槽 · UART / SPI', en: '6 driver sockets · UART / SPI'},
  {slug: 'FYSETC_S6', title: 'FYSETC S6', category: 'controllers', image: 'images/S6_IMG_0389.jpg', zh: '32 位控制板 · 6 路步进驱动', en: '32-bit controller · 6 stepper drivers'},
  {slug: 'TMC2208', title: 'TMC2208', category: 'drivers', image: 'images/TMC2208.jpg', zh: '静音驱动 · UART 配置', en: 'Quiet stepper driver · UART setup'},
  {slug: 'Silent2209', title: 'Silent2209', category: 'drivers', image: 'images/2209v3.0.jpg', zh: '步进驱动 · 接线与电流设置', en: 'Stepper driver · Wiring & current settings'},
  {slug: 'Mini12864_Panel', title: 'Mini12864', category: 'displays', image: 'images/Mini12864.png', zh: '2.4 英寸显示面板 · RGB 背光', en: '2.4-inch display · RGB backlight'},
  {slug: 'SB_Combo_V2', title: 'SB Combo V2', category: 'modules', image: 'images/SB_Combo_V2_top.png', zh: '工具头控制板 · CAN / USB', en: 'Toolhead board · CAN / USB'},
];

const guides = [
  {slug: 'Spider_Hardware_Guide', icon: 'board', zh: 'Spider 硬件安装指南', en: 'Spider hardware guide', zhDescription: '从主板连接到 Voron 2.4 电控安装，按步骤认识硬件。', enDescription: 'Explore board connections and the electronics setup for a Voron 2.4.', zhTag: '硬件接线', enTag: 'Hardware'},
  {slug: 'Spider_Software_Guide', icon: 'code', zh: 'Spider 软件与 Klipper 配置', en: 'Spider software & Klipper', zhDescription: '查看 Klipper 安装、固件编译与配置说明。', enDescription: 'Find Klipper installation, firmware compilation, and configuration instructions.', zhTag: '固件配置', enTag: 'Firmware'},
  {slug: 'CAN-Setup-Guide', icon: 'cable', zh: 'CAN 网络设置指南', en: 'CAN network setup', zhDescription: '连接 Spider 与 SB CAN 工具头，设置 CAN 网络。', enDescription: 'Set up the CAN network between a Spider board and an SB CAN toolhead.', zhTag: 'CAN 通信', enTag: 'CAN bus'},
  {slug: 'How_to_Configure_TMC2208_on_FYSETC-F6-Board', icon: 'driver', zh: '在 F6 上配置 TMC2208', en: 'Configure TMC2208 on F6', zhDescription: '了解 UART 接线以及 Marlin 中的驱动配置。', enDescription: 'Check UART connections and driver configuration in Marlin.', zhTag: '驱动配置', enTag: 'Driver setup'},
  {slug: 'How_to_Configure_TMC2130_on_FYSETC-F6-Board', icon: 'driver', zh: '在 F6 上配置 TMC2130', en: 'Configure TMC2130 on F6', zhDescription: '查看 SPI 模式设置、跳线与固件配置参考。', enDescription: 'Explore SPI settings, jumper connections, and firmware configuration.', zhTag: '驱动配置', enTag: 'Driver setup'},
  {slug: 'Manual_for_Mini_panel_on_SKR', icon: 'screen', zh: '在 SKR 上连接 Mini 面板', en: 'Connect a Mini panel to SKR', zhDescription: '根据接口说明连接面板，完成显示与背光配置。', enDescription: 'Use the connector reference to set up the display and backlight.', zhTag: '面板连接', enTag: 'Display setup'},
];

const copy = {
  'zh-Hans': {
    title: 'FYSETC Wiki · 产品资料与使用指南', description: '浏览 FYSETC 产品文档、引脚定义、接线图与配置教程。',
    heading: '产品资料与使用指南', intro: '找到你的硬件，查阅规格、接线和配置说明。', test: '本地测试版',
    categoriesTitle: '按类别浏览', categoriesIntro: '从产品分类进入完整文档目录。', allDocs: '文档总览',
    tabsLabel: '文档浏览方式', productTab: '产品目录', guideTab: '使用指南', filtersLabel: '筛选产品类别', allProducts: '全部推荐',
    catalogIntro: '常用产品的说明、引脚与配置资料。', guideIntro: '按任务查找接线、通信和固件配置教程。', currentCategory: '查看完整分类', guidesLink: '全部教程', resultCount: '个产品',
    readGuide: '查看指南',
  },
  en: {
    title: 'FYSETC Wiki · Product Documentation', description: 'Browse FYSETC product documentation, pinouts, wiring diagrams, and configuration guides.',
    heading: 'Product documentation & guides', intro: 'Find your hardware. Explore specifications, wiring, and configuration.', test: 'Local test edition',
    categoriesTitle: 'Browse by category', categoriesIntro: 'Explore the complete documentation for each product category.', allDocs: 'All documentation',
    tabsLabel: 'Documentation view', productTab: 'Product catalog', guideTab: 'How-to guides', filtersLabel: 'Filter product categories', allProducts: 'All featured',
    catalogIntro: 'Specifications, pinouts, and configuration for commonly used products.', guideIntro: 'Find practical guides for wiring, communication, and firmware setup.', currentCategory: 'Explore the category', guidesLink: 'All guides', resultCount: 'products',
    readGuide: 'Read the guide',
  },
};

function Arrow({className}) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>;
}

function Icon({kind, className}) {
  const paths = {
    printer: <><path d="M5 28V4h22v24M3 28h26M5 9h22M16 9v5m-3 0h6l-3 5-3-5zM9 24h14"/></>,
    upgrade: <><path d="M6 27V16h20v11H6zM16 21V3m-6 6l6-6 6 6M6 16l4-5m16 5l-4-5"/></>,
    board: <><rect x="5" y="5" width="22" height="22" rx="3"/><rect x="11" y="11" width="10" height="10" rx="1"/><path d="M11 1v4m10-4v4M11 27v4m10-4v4M1 11h4m-4 10h4m22-10h4m-4 10h4"/></>,
    driver: <><rect x="7" y="7" width="18" height="18" rx="2"/><path d="M11 2v5m5-5v5m5-5v5M11 25v5m5-5v5m5-5v5M15 11l-4 6h5l-1 5 6-8h-6z"/></>,
    screen: <><rect x="3" y="5" width="26" height="20" rx="3"/><path d="M3 20h26m-16 5v4m6-4v4M9 29h14M8 10h12m-12 5h7"/></>,
    module: <><rect x="4" y="4" width="10" height="10" rx="2"/><rect x="18" y="4" width="10" height="10" rx="2"/><rect x="4" y="18" width="10" height="10" rx="2"/><path d="M23 18v10m-5-5h10"/></>,
    cable: <path d="M7 3v5m6-5v5M5 8h10v5a5 5 0 01-10 0V8zm5 10v4a6 6 0 006 6h1a6 6 0 006-6v-4M18 12h10v3a5 5 0 01-10 0v-3zm3-5v5m4-5v5"/>,
    mechanical: <><path d="M12 3h8l2 5 5 2 2 6-3 4v6l-6 3-4-3-5 1-5-4 1-5-3-4 3-5 5-1z"/><circle cx="16" cy="16" r="5"/></>,
    sensor: <><rect x="11" y="8" width="10" height="16" rx="2"/><path d="M14 3v5m4-5v5m-4 16v5m4-5v5M7 10a9 9 0 000 12M3 6a15 15 0 000 20m22-16a9 9 0 010 12m4-16a15 15 0 010 20"/></>,
    wireless: <><path d="M3 11a20 20 0 0126 0M7 16a13 13 0 0118 0m-14 5a7 7 0 0110 0"/><circle cx="16" cy="26" r="1.5"/></>,
    other: <><rect x="5" y="5" width="22" height="22" rx="4"/><circle cx="10" cy="16" r="1"/><circle cx="16" cy="16" r="1"/><circle cx="22" cy="16" r="1"/></>,
    book: <><path d="M16 8v20M3 5h6a7 7 0 017 4 7 7 0 017-4h6v21h-6a9 9 0 00-7 2 9 9 0 00-7-2H3V5zM7 10h4m-4 5h4m10-5h4m-4 5h4"/></>,
    code: <><rect x="3" y="5" width="26" height="22" rx="3"/><path d="M11 11l-5 5 5 5m10-10l5 5-5 5m-3-11l-4 12"/></>,
    folder: <><path d="M3 10V6a2 2 0 012-2h7l3 4h12a2 2 0 012 2v15a3 3 0 01-3 3H6a3 3 0 01-3-3V10zm0 2h26M11 18h10m-10 5h6"/></>,
    support: <><path d="M5 18v-3a11 11 0 0122 0v3M8 15H5a2 2 0 00-2 2v5a2 2 0 002 2h3v-9zm16 0h3a2 2 0 012 2v5a2 2 0 01-2 2h-3v-9zm3 9v2a3 3 0 01-3 3h-6"/></>,
  };
  return <svg className={className} viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind]}</svg>;
}

export default function Home() {
  const {i18n} = useDocusaurusContext();
  const isEnglish = i18n.currentLocale === 'en';
  const language = isEnglish ? 'en' : 'zh';
  const text = copy[i18n.currentLocale] || copy.en;
  const docsBase = useBaseUrl('/docs/');
  const assetBase = useBaseUrl('/');
  const [activeTab, setActiveTab] = useState('products');
  const [activeCategory, setActiveCategory] = useState('all');
  const tabRefs = useRef([]);
  const visibleProducts = products.filter(product => activeCategory === 'all' || product.category === activeCategory);
  const productCategories = categories.filter(category => products.some(product => product.category === category.id));
  const selectedCategory = categories.find(category => category.id === activeCategory);
  const categoryLink = `${docsBase}${selectedCategory?.path || 'overview'}/`;

  function handleTabKey(event, index) {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') next = 1 - index;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = 1;
    else return;
    event.preventDefault();
    setActiveTab(next === 0 ? 'products' : 'guides');
    tabRefs.current[next]?.focus();
  }

  return (
    <Layout title={text.title} description={text.description}>
      <main className={styles.home}>
        <section className={styles.introSection} aria-labelledby="wiki-title">
          <div className={styles.container}>
            <div className={styles.welcomeHeading}><span className={styles.brandLabel}>FYSETC WIKI</span><span className={styles.testBadge}><span />{text.test}</span></div>
            <h1 id="wiki-title">{text.heading}</h1>
            <p className={styles.intro}>{text.intro}</p>
          </div>
        </section>

        <div className={styles.container}>
          <section className={styles.categoriesSection} aria-labelledby="categories-title">
            <div className={styles.sectionHeading}><div><h2 id="categories-title">{text.categoriesTitle}</h2><p>{text.categoriesIntro}</p></div><Link className={styles.textLink} to={`${docsBase}overview`}>{text.allDocs}<Arrow /></Link></div>
            <div className={styles.categoryGrid}>{categories.map(category => <Link key={category.id} className={styles.categoryCard} to={`${docsBase}${category.path}/`}><Icon kind={category.icon}/><span>{category[language]}</span><Arrow className={styles.categoryArrow}/></Link>)}</div>
          </section>

          <section className={styles.browserSection} aria-label={text.tabsLabel}>
            <div className={styles.tabBar} role="tablist" aria-label={text.tabsLabel}>
              {['products', 'guides'].map((tab, index) => <button key={tab} id={`tab-${tab}`} ref={element => {tabRefs.current[index] = element;}} className={`${styles.tabButton} ${activeTab === tab ? styles.activeTab : ''}`} type="button" role="tab" aria-selected={activeTab === tab} aria-controls={`panel-${tab}`} tabIndex={activeTab === tab ? 0 : -1} onClick={() => setActiveTab(tab)} onKeyDown={event => handleTabKey(event, index)}><Icon kind={tab === 'products' ? 'module' : 'book'}/>{tab === 'products' ? text.productTab : text.guideTab}</button>)}
            </div>

            <div id="panel-products" className={styles.panel} role="tabpanel" aria-labelledby="tab-products" hidden={activeTab !== 'products'} tabIndex={0}>
              <div className={styles.panelIntro}><p>{text.catalogIntro}</p><span aria-live="polite">{visibleProducts.length} {text.resultCount}</span></div>
              <div className={styles.filterBar}><div className={styles.filterButtons} role="group" aria-label={text.filtersLabel}>{[{id: 'all', zh: text.allProducts, en: text.allProducts}, ...productCategories].map(category => <button key={category.id} className={activeCategory === category.id ? styles.activeFilter : ''} type="button" aria-pressed={activeCategory === category.id} onClick={() => setActiveCategory(category.id)}>{category[language]}</button>)}</div>{selectedCategory && <Link className={styles.textLink} to={categoryLink}>{text.currentCategory}<Arrow /></Link>}</div>
              <div className={styles.productGrid}>{visibleProducts.map(product => <Link key={product.slug} className={styles.productCard} to={`${docsBase}${product.slug}`}><div className={styles.productImage}><img src={`${assetBase}${product.image}`} alt={`FYSETC ${product.title}`} loading="lazy" /></div><div className={styles.productBody}><span className={styles.productCategory}>{categories.find(category => category.id === product.category)?.[language] || product.category}</span><h3>{product.title}</h3><p>{product[language]}</p><Arrow className={styles.productArrow}/></div></Link>)}</div>
            </div>

            <div id="panel-guides" className={styles.panel} role="tabpanel" aria-labelledby="tab-guides" hidden={activeTab !== 'guides'} tabIndex={0}>
              <div className={styles.panelIntro}><p>{text.guideIntro}</p><Link className={styles.textLink} to={`${docsBase}Tutorial/`}>{text.guidesLink}<Arrow /></Link></div>
              <div className={styles.guideGrid}>{guides.map(guide => <Link key={guide.slug} className={styles.guideCard} to={`${docsBase}${guide.slug}`}><span className={styles.guideIcon}><Icon kind={guide.icon}/></span><span className={styles.guideTag}>{isEnglish ? guide.enTag : guide.zhTag}</span><h3>{guide[language]}</h3><p>{isEnglish ? guide.enDescription : guide.zhDescription}</p><span className={styles.guideLink}>{text.readGuide}<Arrow /></span></Link>)}</div>
            </div>
          </section>

        </div>
      </main>
    </Layout>
  );
}
