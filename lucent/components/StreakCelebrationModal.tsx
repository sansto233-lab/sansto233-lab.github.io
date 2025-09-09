import React, { useEffect } from 'react';

// A simple confetti effect component
const Confetti: React.FC = () => {
    const confettiCount = 50;
    const colors = ['#14b8a6', '#f59e0b', '#10b981', '#ef4444'];
    
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: confettiCount }).map((_, i) => {
                const style = {
                    left: `${Math.random() * 100}%`,
                    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                    animation: `confetti-fall ${3 + Math.random() * 4}s ${Math.random() * 2}s linear infinite`,
                    width: `${Math.random() * 8 + 6}px`,
                    height: `${Math.random() * 5 + 4}px`,
                    opacity: Math.random() + 0.5,
                };
                return <div key={i} className="absolute top-[-20px] rounded-full" style={style} />;
            })}
            <style>{`
                @keyframes confetti-fall {
                    0% { transform: translateY(-20px) rotate(0deg); }
                    100% { transform: translateY(110vh) rotate(720deg); }
                }
            `}</style>
        </div>
    );
};


interface StreakCelebrationModalProps {
  onClose: () => void;
}

const StreakCelebrationModal: React.FC<StreakCelebrationModalProps> = ({ onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000); // Auto-close after 5 seconds
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in" onClick={onClose}>
            <Confetti />
            <div className="relative bg-surface-light dark:bg-surface-dark rounded-xl p-8 text-center shadow-2xl transform animate-scale-in" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-3xl font-bold text-text-accent-light dark:text-text-accent-dark">Streak Extended!</h2>
                <p className="mt-4 text-text-secondary-light dark:text-text-secondary-dark">Amazing work! You're building a great habit.</p>
                <p className="text-4xl mt-6">🎉 Keep up the focus! 🔥</p>
                <button 
                    onClick={onClose} 
                    className="mt-8 px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-hover transition-colors"
                >
                    Continue
                </button>
            </div>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }

                @keyframes scale-in {
                    from { transform: scale(0.8) translateY(20px); opacity: 0; }
                    to { transform: scale(1) translateY(0); opacity: 1; }
                }
                .animate-scale-in { animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
            `}</style>
        </div>
    );
};

export default StreakCelebrationModal;