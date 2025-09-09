import React from 'react';
import type { Notification } from '../types';
import NotificationItem from './NotificationItem';

interface NotificationPanelProps {
    notifications: Notification[];
    onMarkAsRead: (id: number) => void;
    onMarkAllAsRead: () => void;
    onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications, onMarkAsRead, onMarkAllAsRead, onClose }) => {
    return (
        <div 
            className="absolute right-0 mt-3 w-80 md:w-96 bg-surface-light dark:bg-surface-dark rounded-xl shadow-2xl border border-border-light dark:border-border-dark z-50 animate-fade-in-down"
            aria-labelledby="notifications-heading"
        >
            <div className="flex justify-between items-center p-3 border-b border-border-light dark:border-border-dark">
                <h3 id="notifications-heading" className="font-semibold text-text-primary-light dark:text-text-primary-dark">Notifications</h3>
                <button 
                    onClick={onMarkAllAsRead}
                    className="text-sm text-text-accent-light dark:text-text-accent-dark hover:underline focus:outline-none"
                >
                    Mark all as read
                </button>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                    <ul>
                        {notifications.map(notification => (
                           <NotificationItem 
                                key={notification.id} 
                                notification={notification} 
                                onMarkAsRead={onMarkAsRead}
                                onClosePanel={onClose}
                            />
                        ))}
                    </ul>
                ) : (
                    <div className="text-center p-8 text-text-secondary-light dark:text-text-secondary-dark">
                        <p>You're all caught up!</p>
                    </div>
                )}
            </div>
            <style>{`
                @keyframes fade-in-down {
                    0% {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default NotificationPanel;