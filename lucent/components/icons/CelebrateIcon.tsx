import React, { memo } from 'react';

const CelebrateIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 19V12M15 16L12 19L9 16" />
    <path d="M18 9L21 6" />
    <path d="M6 9L3 6" />
    <path d="M12 2L12 6" />
    <path d="M21 15L19 12" />
    <path d="M3 15L5 12" />
  </svg>
);

export default memo(CelebrateIcon);