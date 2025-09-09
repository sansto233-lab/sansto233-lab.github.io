import React, { memo } from 'react';

const MessengerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12c0 3.54 1.84 6.61 4.57 8.35c.16.1.36.11.53.05c.17-.06.3-.21.3-.39V17.5c0-.28.22-.5.5-.5h2.1c.28 0 .5.22.5.5v2.5c0 .18.13.33.3.39c.17.06.37.05.53-.05C19.16 18.61 22 15.54 22 12c0-5.52-4.48-10-10-10zm1.75 10.5l-2.25 2.25c-.2.2-.51.2-.71 0l-1.75-1.75c-.2-.2-.2-.51 0-.71l4.25-4.25c.2-.2.51-.2.71 0l1.75 1.75c.2.2.2.51 0 .71L13.75 12.5z" />
  </svg>
);

export default memo(MessengerIcon);