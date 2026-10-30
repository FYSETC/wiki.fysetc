import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import useBaseUrl from '@docusaurus/useBaseUrl';
import MDXImg from '@theme/MDXComponents/Img';
import DriverCalculator from '@site/src/components/DriverCalculator';

function LegacyAnchor(props) {
  useBrokenLinks().collectAnchor(props.id);
  return <span {...props} />;
}

function LocalImage(props) {
  const src = useBaseUrl(props.src);
  return <MDXImg {...props} src={src} />;
}

export default {
  ...MDXComponents,
  img: LocalImage,
  'driver-calculator': DriverCalculator,
  'legacy-anchor': LegacyAnchor,
};
