import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import catalog from '../../../navigation/catalog.json';

// This overview belongs to the site, so removing a Markdown landing page cannot remove it.
export default function DocumentationOverview() {
  const {i18n} = useDocusaurusContext();
  const chinese = i18n.currentLocale === 'zh-Hans';
  const docsBase = useBaseUrl('/docs/');
  const title = chinese ? '文档总览' : 'Documentation overview';
  const description = chinese
    ? '按产品分类浏览 FYSETC 产品文档、引脚定义、接线图与配置教程。'
    : 'Browse FYSETC product documentation, pinout references, wiring diagrams, and configuration guides by category.';
  return <Layout title={title} description={description}>
    <main className="container margin-vert--lg">
      <h1>{title}</h1>
      <p>{chinese ? '按类别浏览产品资料和使用指南。' : 'Browse product documentation and guides by category.'}</p>
      <ul>{catalog.categories.map(category => <li key={category.id} className="margin-bottom--sm">
        <Link to={`${docsBase}${category.path}/`}>{chinese ? category.zh : category.en}</Link>
      </li>)}</ul>
    </main>
  </Layout>;
}
