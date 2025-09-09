import React, { useState, useEffect } from 'react';

const quotes = [
    {
        text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
        author: "Aristotle"
    },
    {
        text: "The successful warrior is the average man, with laser-like focus.",
        author: "Bruce Lee"
    },
    {
        text: "Concentrate all your thoughts upon the work at hand. The sun's rays do not burn until brought to a focus.",
        author: "Alexander Graham Bell"
    },
    {
        text: "To be everywhere is to be nowhere.",
        author: "Seneca"
    },
    {
        text: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius"
    }
];

interface ExitFocusModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ExitFocusModal: React.FC<ExitFocusModalProps> = ({ onConfirm, onCancel }) => {
    const [quote, setQuote] = useState<{text: string; author: string} | null>(null);

    useEffect(() => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, []);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-[60]" onClick={onCancel}>
            <div 
                className="bg-surface-light dark:bg-surface-dark rounded-xl p-8 text-center shadow-2xl transform animate-scale-in max-w-lg mx-4" 
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">Are you sure you want to stop?</h2>
                
                {quote && (
                    <blockquote className="mt-6 border-l-4 border-primary pl-4 italic text-text-secondary-light dark:text-text-secondary-dark">
                        <p>"{quote.text}"</p>
                        <cite className="block mt-2 text-right text-sm font-semibold text-text-secondary-light dark:text-text-secondary-dark">- {quote.author}</cite>
                    </blockquote>
                )}
                
                <p className="mt-6 text-text-secondary-light dark:text-text-secondary-dark">A moment of distraction can undo an hour of work. Stay the course!</p>
                
                <div className="mt-8 flex justify-center gap-4">
                    <button 
                        onClick={onCancel} 
                        className="px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-surface-dark"
                    >
                        Keep Focusing
                    </button>
                    <button 
                        onClick={onConfirm} 
                        className="px-6 py-2 bg-transparent text-text-secondary-light dark:text-text-secondary-dark font-semibold rounded-md hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-surface-dark"
                    >
                        Exit Anyway
                    </button>
                </div>
            </div>
            <style>{`
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                @keyframes scale-in {
                    from { transform: scale(0.9) translateY(10px); opacity: 0; }
                    to { transform: scale(1) translateY(0); opacity: 1; }
                }
                .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default ExitFocusModal;