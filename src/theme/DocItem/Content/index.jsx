import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import DocItemContent from '@theme-original/DocItem/Content';
import DocumentImagePreview from '@site/src/components/DocumentImagePreview';

export default function DocItemContentWrapper(props) {
  const {i18n} = useDocusaurusContext();
  const isChinese = i18n.currentLocale.startsWith('zh');
  return (
    <DocumentImagePreview language={isChinese ? 'zh' : 'en'}>
      <DocItemContent {...props} />
    </DocumentImagePreview>
  );
}
