import React from 'react';

interface AILoadingIndicatorProps {
  avatar: string;
}

const AILoadingIndicator: React.FC<AILoadingIndicatorProps> = ({ avatar }) => {
  return (
    <div className="flex items-start gap-4 animate-pulse">
      <img src={avatar} alt="Lucida" className="w-10 h-10 rounded-full" />
      <div className="rounded-lg px-4 py-3 max-w-lg bg-background-light dark:bg-border-dark shadow-soft">
        <p className="font-bold text-sm mb-1 text-text-primary-light dark:text-text-primary-dark">Lucida</p>
        <div className="flex items-center space-x-1">
          <span className="text-text-secondary-light dark:text-text-secondary-dark">Lucida is thinking</span>
          <div className="w-1.5 h-1.5 bg-text-secondary-light dark:bg-text-secondary-dark rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-1.5 h-1.5 bg-text-secondary-light dark:bg-text-secondary-dark rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1.5 h-1.5 bg-text-secondary-light dark:bg-text-secondary-dark rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default AILoadingIndicator;