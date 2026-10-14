import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const features = [
  {
    title: <Translate id="home.features.docs.title">产品与技术文档</Translate>,
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: <Translate id="home.features.docs.description">使用 Markdown 整理产品资料、安装步骤和配置指南。</Translate>,
  },
  {
    title: <Translate id="home.features.languages.title">中英文双语</Translate>,
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: <Translate id="home.features.languages.description">通过导航栏切换简体中文和 English，阅读对应语言的文档。</Translate>,
  },
  {
    title: <Translate id="home.features.git.title">版本管理</Translate>,
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: <Translate id="home.features.git.description">文档使用 Git 管理，便于多人协作和追踪内容修改。</Translate>,
  },
];

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map(({Svg, title, description}, index) => (
            <div className={clsx('col col--4')} key={index}>
              <div className="text--center"><Svg className={styles.featureSvg} aria-hidden="true" /></div>
              <div className="text--center padding-horiz--md">
                <Heading as="h3">{title}</Heading>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

