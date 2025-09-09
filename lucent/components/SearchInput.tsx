import React, { memo } from 'react';
import SearchIcon from './icons/SearchIcon';

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
  ariaLabel?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, placeholder, className = '', ariaLabel = 'Search' }) => {
  return (
    <div className={`relative w-full ${className}`}>
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon className="w-5 h-5 text-gray-500" />
      </span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-2 border border-border-light dark:border-border-dark rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary bg-surface-light dark:bg-surface-dark"
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
    </div>
  );
};

export default memo(SearchInput);