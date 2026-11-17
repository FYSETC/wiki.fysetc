import React, {useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import officialNavigation from '../../navigation/catalog.json';
import siteLinks from '../../navigation/site-links.json';
import styles from './index.module.css';

const categories = officialNavigation.categories;

const {products, guides} = siteLinks;

const copy = {
  'zh-Hans': {
    title: 'FYSETC Wiki · 产品资料与使用指南',
    description: '浏览 FYSETC 产品文档、引脚定义、接线图与配置教程。',
    brand: 'FYSETC WIKI',
    heading: '产品资料与使用指南',
    intro: '从整机套件到控制板、驱动与配件，查阅规格、接线和固件配置说明。资料按产品分类整理，随硬件版本持续更新。',
    primaryCta: '浏览全部文档',
    secondaryCta: '查看使用指南',
    categoryUnit: '个分类',
    productUnit: '款推荐产品',
    guideUnit: '篇使用指南',
    categoriesTitle: '按类别浏览',
    categoriesIntro: '从产品分类进入完整文档目录。',
    allDocs: '文档总览',
    productsTitle: '推荐产品',
    productsIntro: '常用硬件的规格、引脚与配置资料。',
    filterLabel: '筛选产品类别',
    allProducts: '全部',
    countUnit: '款产品',
    viewDoc: '查看文档',
    guidesTitle: '使用指南',
    guidesIntro: '按任务查找接线、通信与固件配置教程。',
    allGuides: '全部教程',
    readGuide: '阅读指南',
  },
  en: {
    title: 'FYSETC Wiki · Product Documentation',
    description: 'Browse FYSETC product documentation, pinouts, wiring diagrams, and configuration guides.',
    brand: 'FYSETC WIKI',
    heading: 'Product documentation & guides',
    intro: 'From complete printer kits to controllers, drivers, and accessories — find specifications, wiring, and firmware configuration in one place.',
    primaryCta: 'Browse all documentation',
    secondaryCta: 'Browse the guides',
    categoryUnit: 'categories',
    productUnit: 'featured products',
    guideUnit: 'how-to guides',
    categoriesTitle: 'Browse by category',
    categoriesIntro: 'Open a product category to see its complete documentation.',
    allDocs: 'All documentation',
    productsTitle: 'Featured products',
    productsIntro: 'Specifications, pinouts, and configuration for commonly used hardware.',
    filterLabel: 'Filter product categories',
    allProducts: 'All',
    countUnit: 'products',
    viewDoc: 'View documentation',
    guidesTitle: 'How-to guides',
    guidesIntro: 'Practical walkthroughs for wiring, communication, and firmware setup.',
    allGuides: 'All guides',
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
  const [activeCategory, setActiveCategory] = useState('all');
  const visibleProducts = products.filter(product => activeCategory === 'all' || product.category === activeCategory);
  const productCategories = categories.filter(category => products.some(product => product.category === category.id));
  const guidesCategory = categories.find(category => category.id === 'guides');

  return (
    <Layout title={text.title} description={text.description}>
      <main className={styles.home}>
        <section className={styles.heroSection} aria-labelledby="wiki-title">
          <div className={styles.container}>
            <div className={styles.heroCard}>
              <div className={styles.heroCopy}>
                <div className={styles.heroEyebrow}>
                  <span className={styles.brandLabel}>{text.brand}</span>
                </div>
                <h1 id="wiki-title">{text.heading}</h1>
                <p className={styles.heroIntro}>{text.intro}</p>
                <div className={styles.heroActions}>
                  <Link className={styles.primaryAction} to={docsBase}>{text.primaryCta}<Arrow className={styles.actionArrow} /></Link>
                  {guidesCategory && <Link className={styles.secondaryAction} to={`${docsBase}${guidesCategory.path}/`}>{text.secondaryCta}</Link>}
                </div>
                <div className={styles.heroStats}>
                  <span><strong>{categories.length}</strong> {text.categoryUnit}</span>
                  <span className={styles.statSeparator} aria-hidden="true" />
                  <span><strong>{products.length}</strong> {text.productUnit}</span>
                  <span className={styles.statSeparator} aria-hidden="true" />
                  <span><strong>{guides.length}</strong> {text.guideUnit}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.categoriesSection} aria-labelledby="categories-title">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div><h2 id="categories-title">{text.categoriesTitle}</h2><p>{text.categoriesIntro}</p></div>
              <Link className={styles.textLink} to={docsBase}>{text.allDocs}<Arrow /></Link>
            </div>
            <div className={styles.categoryGrid}>
              {categories.map(category => (
                <Link key={category.id} className={styles.categoryCard} to={`${docsBase}${category.path}/`}>
                  <span className={styles.categoryIcon}><Icon kind={category.icon} /></span>
                  <span className={styles.categoryName}>{category[language]}</span>
                  <Arrow className={styles.categoryArrow} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.productSection} aria-labelledby="products-title">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div><h2 id="products-title">{text.productsTitle}</h2><p>{text.productsIntro}</p></div>
              <span className={styles.countBadge} aria-live="polite">{visibleProducts.length} {text.countUnit}</span>
            </div>
            <div className={styles.filterBar} role="group" aria-label={text.filterLabel}>
              {[{id: 'all', zh: text.allProducts, en: text.allProducts}, ...productCategories].map(category => (
                <button key={category.id} type="button" className={activeCategory === category.id ? `${styles.filterButton} ${styles.activeFilter}` : styles.filterButton} aria-pressed={activeCategory === category.id} onClick={() => setActiveCategory(category.id)}>{category[language]}</button>
              ))}
            </div>
            <div className={styles.productGrid}>
              {visibleProducts.map(product => (
                <Link key={product.slug} className={styles.productCard} to={`${docsBase}${product.slug}`}>
                  <span className={styles.productImage}><img src={`${assetBase}${product.image}`} alt={`FYSETC ${product.title}`} loading="lazy" /></span>
                  <span className={styles.productBody}>
                    <span className={styles.productCategory}>{categories.find(category => category.id === product.category)?.[language] || product.category}</span>
                    <span className={styles.productName}>{product.title}</span>
                    <span className={styles.productDesc}>{product[language]}</span>
                    <span className={styles.productAction}>{text.viewDoc}<Arrow /></span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.guidesSection} aria-labelledby="guides-title">
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div><h2 id="guides-title">{text.guidesTitle}</h2><p>{text.guidesIntro}</p></div>
              {guidesCategory && <Link className={styles.textLink} to={`${docsBase}${guidesCategory.path}/`}>{text.allGuides}<Arrow /></Link>}
            </div>
            <div className={styles.guideGrid}>
              {guides.map(guide => (
                <Link key={guide.slug} className={styles.guideCard} to={`${docsBase}${guide.slug}`}>
                  <span className={styles.guideTop}>
                    <span className={styles.guideIcon}><Icon kind={guide.icon} /></span>
                    <span className={styles.guideTag}>{isEnglish ? guide.enTag : guide.zhTag}</span>
                  </span>
                  <h3>{guide[language]}</h3>
                  <p>{isEnglish ? guide.enDescription : guide.zhDescription}</p>
                  <span className={styles.guideAction}>{text.readGuide}<Arrow /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
