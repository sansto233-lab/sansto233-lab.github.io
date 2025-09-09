import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center h-full w-full" aria-label="Loading page">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-teal-600 dark:border-teal-400"></div>
  </div>
);

export default LoadingSpinner;