import React from 'react';
import MessengerIcon from './icons/MessengerIcon';

interface MessengerButtonProps {
    onClick: () => void;
}

const MessengerButton: React.FC<MessengerButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-lg hover:bg-primary-hover transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-background-dark"
            aria-label="Open chats"
        >
            <MessengerIcon className="w-8 h-8" />
        </button>
    );
};

export default MessengerButton;