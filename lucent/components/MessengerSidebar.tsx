import React from 'react';
import { Link } from 'react-router-dom';
import type { Group } from '../types';

interface MessengerSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    groups: Group[];
}

const MessengerSidebar: React.FC<MessengerSidebarProps> = ({ isOpen, onClose, groups }) => {
    const lastMessage = (group: Group) => {
        if (group.chatHistory.length === 0) {
            return { content: 'No messages yet.', timestamp: '' };
        }
        const last = group.chatHistory[group.chatHistory.length - 1];
        return { 
            content: `${last.authorId === 'me' ? 'You: ' : ''}${last.content}`, 
            timestamp: last.timestamp 
        };
    };

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
                aria-hidden="true"
            ></div>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 right-0 h-full w-full max-w-sm bg-surface-light dark:bg-surface-dark shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="messenger-sidebar-title"
            >
                <div className="flex flex-col h-full">
                    <header className="flex items-center justify-between p-4 border-b border-border-light dark:border-border-dark">
                        <h2 id="messenger-sidebar-title" className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
                            Chats
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/10 transition-colors"
                            aria-label="Close chats"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </header>
                    <div className="flex-1 overflow-y-auto">
                        <ul>
                            {groups.map(group => {
                                const msg = lastMessage(group);
                                return (
                                    <li key={group.id}>
                                        <Link
                                            to={`/groups/${group.id}`}
                                            onClick={onClose}
                                            className="flex items-center p-4 hover:bg-background-light dark:hover:bg-border-dark transition-colors"
                                        >
                                            <div className="flex-shrink-0 mr-4">
                                                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary-hover dark:text-primary-light font-bold text-lg">
                                                    {group.name.substring(0, 2).toUpperCase()}
                                                </div>
                                            </div>
                                            <div className="flex-1 overflow-hidden">
                                                <div className="flex justify-between items-baseline">
                                                    <p className="font-semibold text-text-primary-light dark:text-text-primary-dark truncate">{group.name}</p>
                                                    <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark whitespace-nowrap">{msg.timestamp}</span>
                                                </div>
                                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark truncate">{msg.content}</p>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default MessengerSidebar;