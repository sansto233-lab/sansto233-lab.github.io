import React, { memo } from 'react';

const InsightfulIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2.69l.34 3.03a1.5 1.5 0 0 0 1.9 1.45l3.03-.34 1.45 1.9-3.03.34a1.5 1.5 0 0 0-1.45 1.9l.34 3.03-1.9 1.45-.34-3.03a1.5 1.5 0 0 0-1.9-1.45l-3.03.34-1.45-1.9 3.03-.34a1.5 1.5 0 0 0 1.45-1.9z"/>
    <path d="M9 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"/>
  </svg>
);

export default memo(InsightfulIcon);