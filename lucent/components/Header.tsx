import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import type { Notification } from '../types';
import BellIcon from './icons/BellIcon';
import NotificationPanel from './NotificationPanel';

interface HeaderProps {
    notifications: Notification[];
    onMarkAsRead: (id: number) => void;
    onMarkAllAsRead: () => void;
}

const Header: React.FC<HeaderProps> = ({ notifications, onMarkAsRead, onMarkAllAsRead }) => {
    const [isPanelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);

    const unreadCount = useMemo(() => {
        return notifications.filter(n => !n.isRead).length;
    }, [notifications]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                setPanelOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="flex items-center justify-end h-16 px-6 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
            <div className="flex items-center">
                <ThemeToggle />

                <div className="relative ml-4" ref={panelRef}>
                    <button
                        onClick={() => setPanelOpen(prev => !prev)}
                        className="p-2 rounded-full text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-surface-dark transition-colors duration-200"
                        aria-label={`You have ${unreadCount} unread notifications`}
                        aria-expanded={isPanelOpen}
                    >
                        <BellIcon className="w-6 h-6" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-5 w-5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 text-white text-xs items-center justify-center">
                                    {unreadCount}
                                </span>
                            </span>
                        )}
                    </button>
                    {isPanelOpen && (
                        <NotificationPanel
                            notifications={notifications}
                            onMarkAsRead={(id) => {
                                onMarkAsRead(id);
                                // Optional: close panel after click. For now, keep it open.
                            }}
                            onMarkAllAsRead={() => {
                                onMarkAllAsRead();
                                setPanelOpen(false);
                            }}
                            onClose={() => setPanelOpen(false)}
                        />
                    )}
                </div>

                <div className="ml-4">
                    <Link to="/profile/me" aria-label="View your profile">
                        <img
                            className="h-10 w-10 rounded-full object-cover ring-2 ring-offset-2 ring-offset-surface-light dark:ring-offset-surface-dark ring-transparent hover:ring-primary transition"
                            src="https://picsum.photos/id/237/100/100"
                            alt="User avatar"
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;