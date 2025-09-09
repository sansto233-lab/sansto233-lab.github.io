import React from 'react';

interface FocusLockOverlayProps {
  time: string;
  onExit: () => void;
}

const FocusLockOverlay: React.FC<FocusLockOverlayProps> = ({ time, onExit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex flex-col items-center justify-center z-50 animate-fade-in">
      <div className="text-center text-white">
        <h2 className="text-2xl font-semibold tracking-wider uppercase text-gray-300">Focus Session in Progress</h2>
        <div className="text-8xl md:text-9xl font-bold my-6">{time}</div>
        <p className="text-lg text-gray-400">Minimize distractions. You've got this.</p>
        <button
          onClick={onExit}
          className="mt-8 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 focus:ring-offset-black"
        >
          Exit Focus Mode
        </button>
      </div>
    </div>
  );
};

export default FocusLockOverlay;
