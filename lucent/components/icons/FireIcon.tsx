import React, { memo } from 'react';

const FireIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.523 4.477 10 10 10z" />
    <path d="M15.5 8.5c-1-2-2.5-3-4.5-3s-3.5 1-4.5 3c-1.5 3-1.5 6 0 9" />
    <path d="M12 12c-2 0-3.5 1.5-3.5 3.5S10 19 12 19s3.5-1.5 3.5-3.5S14 12 12 12z" />
  </svg>
);

export default memo(FireIcon);