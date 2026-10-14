import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import DocItemContent from '@theme-original/DocItem/Content';
import DocumentImagePreview from '@site/src/components/DocumentImagePreview';

export default function DocItemContentWrapper(props) {
  const {frontMatter} = useDoc();
  const {i18n} = useDocusaurusContext();
  const isChinese = i18n.currentLocale.startsWith('zh');
  const sourceLanguage = frontMatter.source_language;
  const languageLabel = sourceLanguage === 'zh'
    ? (isChinese ? '中文原稿' : 'Chinese source')
    : sourceLanguage === 'en'
      ? (isChinese ? '英文原稿' : 'English source')
      : (isChinese ? '原稿资料' : 'Source document');
  const sourceNote = isChinese && sourceLanguage === 'en'
    ? '本文暂无中文原稿，当前展示英文资料。'
    : !isChinese && sourceLanguage === 'zh'
      ? 'This document is available only in Chinese. The Chinese source is shown below.'
      : null;

  return (
    <>
      <div className="wiki-doc-meta">
        <span>{isChinese ? 'FYSETC 文档' : 'FYSETC documentation'}</span>
        <span className="wiki-doc-language">{languageLabel}</span>
      </div>
      {sourceNote && <p className="wiki-source-note">{sourceNote}</p>}
      <DocumentImagePreview language={isChinese ? 'zh' : 'en'}>
        <DocItemContent {...props} />
      </DocumentImagePreview>
    </>
  );
}
