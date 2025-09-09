import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
    >
      <div 
        className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 shadow-2xl transform animate-scale-in max-w-sm w-full mx-4" 
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="confirmation-title" className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">{title}</h3>
        <div className="mt-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
          {children}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-sm font-medium text-text-primary-light dark:text-text-primary-dark bg-background-light dark:bg-border-dark rounded-md hover:bg-border-light dark:hover:bg-surface-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-surface-dark"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-surface-dark"
          >
            Confirm
          </button>
        </div>
      </div>
      <style>{`
          @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
          .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
          @keyframes scale-in {
              from { transform: scale(0.95); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
          }
          .animate-scale-in { animation: scale-in 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ConfirmationModal;