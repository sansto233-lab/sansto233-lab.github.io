import React from 'react';
import { Link } from 'react-router-dom';
import type { Notification } from '../types';
import ChatBubbleIcon from './icons/ChatBubbleIcon';
import AtSymbolIcon from './icons/AtSymbolIcon';
import UserPlusIcon from './icons/UserPlusIcon';

interface NotificationItemProps {
    notification: Notification;
    onMarkAsRead: (id: number) => void;
    onClosePanel: () => void;
}

const NotificationIcon: React.FC<{ type: Notification['type'] }> = ({ type }) => {
    const iconClasses = "w-6 h-6";
    switch (type) {
        case 'new_comment':
            return <ChatBubbleIcon className={`${iconClasses} text-blue-500`} />;
        case 'new_mention':
            return <AtSymbolIcon className={`${iconClasses} text-purple-500`} />;
        case 'group_invite':
            return <UserPlusIcon className={`${iconClasses} text-green-500`} />;
        default:
            return null;
    }
};

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkAsRead, onClosePanel }) => {
    
    const handleClick = () => {
        if (!notification.isRead) {
            onMarkAsRead(notification.id);
        }
        onClosePanel();
    };

    return (
        <li className={`${!notification.isRead ? 'bg-primary/5' : ''}`}>
            <Link 
                to={notification.link} 
                onClick={handleClick}
                className="flex items-start p-3 hover:bg-primary/10 transition-colors"
            >
                <div className="flex-shrink-0 relative">
                    <img src={notification.actorAvatar} alt={notification.actorName} className="w-10 h-10 rounded-full" />
                    <div className="absolute -bottom-1 -right-1 bg-surface-light dark:bg-surface-dark rounded-full p-0.5">
                        <NotificationIcon type={notification.type} />
                    </div>
                </div>
                <div className="ml-3 flex-1">
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                        <span className="font-semibold text-text-primary-light dark:text-text-primary-dark">{notification.actorName}</span>
                        {' '}
                        <span dangerouslySetInnerHTML={{ __html: notification.message }} />
                    </p>
                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1">{notification.timestamp}</p>
                </div>
                {!notification.isRead && (
                    <div className="w-2.5 h-2.5 bg-primary rounded-full self-center ml-2 flex-shrink-0" aria-label="Unread notification"></div>
                )}
            </Link>
        </li>
    );
};

export default NotificationItem;