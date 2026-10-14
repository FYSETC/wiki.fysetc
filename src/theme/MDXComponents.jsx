import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import DriverCalculator from '@site/src/components/DriverCalculator';

function LegacyAnchor(props) {
  useBrokenLinks().collectAnchor(props.id);
  return <span {...props} />;
}

export default {
  ...MDXComponents,
  'driver-calculator': DriverCalculator,
  'legacy-anchor': LegacyAnchor,
};
