import React, { useState } from 'react';
import type { Group, UserProfile } from '../types';
import { mockUsers } from '../data/mockData';
import XMarkIcon from './icons/XMarkIcon';
import PencilIcon from './icons/PencilIcon';

interface GroupChatSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  group: Group;
  onGroupUpdate: (updatedGroup: Group) => void;
}

const themeColors: { [key: string]: { bg: string, ring: string } } = {
  teal: { bg: 'bg-primary', ring: 'ring-primary' },
  blue: { bg: 'bg-blue-500', ring: 'ring-blue-500' },
  pink: { bg: 'bg-pink-500', ring: 'ring-pink-500' },
  purple: { bg: 'bg-purple-500', ring: 'ring-purple-500' },
  orange: { bg: 'bg-orange-500', ring: 'ring-orange-500' },
};

const NicknameEditor: React.FC<{
    user: UserProfile;
    group: Group;
    onGroupUpdate: (updatedGroup: Group) => void;
}> = ({ user, group, onGroupUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [nickname, setNickname] = useState(group.nicknames?.[user.id] || '');
    
    const handleSave = () => {
        const newNicknames = { ...(group.nicknames || {}), [user.id]: nickname };
        if (!nickname.trim()) {
            delete newNicknames[user.id]; // Remove nickname if empty
        }
        onGroupUpdate({ ...group, nicknames: newNicknames });
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="flex-grow text-sm px-2 py-1 bg-surface-light dark:bg-border-dark border border-border-light dark:border-border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Set nickname"
                    onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    autoFocus
                />
                <button onClick={handleSave} className="text-sm text-text-accent-light dark:text-text-accent-dark font-semibold">Save</button>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-between">
            <div>
                <p className="font-medium text-text-primary-light dark:text-text-primary-dark">{group.nicknames?.[user.id] || user.name}</p>
                {group.nicknames?.[user.id] && <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{user.name}</p>}
            </div>
            <button onClick={() => setIsEditing(true)} className="p-1 text-text-secondary-light hover:text-text-primary-light dark:hover:text-text-primary-dark">
                <PencilIcon className="w-4 h-4" />
            </button>
        </div>
    );
};


const GroupChatSettings: React.FC<GroupChatSettingsProps> = ({ isOpen, onClose, group, onGroupUpdate }) => {
  const isCurrentUserAdmin = group.adminIds.includes('me');

  const handleThemeChange = (color: string) => {
    if (isCurrentUserAdmin) {
      onGroupUpdate({ ...group, themeColor: color });
    }
  };

  return (
    <aside
        className={`absolute top-0 right-0 h-full w-full max-w-sm bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-l border-border-light dark:border-border-dark shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-settings-title"
    >
        <div className="flex flex-col h-full">
            <header className="flex items-center justify-between p-4 border-b border-border-light dark:border-border-dark">
                <h2 id="chat-settings-title" className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">
                    Chat Details
                </h2>
                <button
                    onClick={onClose}
                    className="p-2 rounded-full text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/10 transition-colors"
                    aria-label="Close settings"
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Theme Color Settings */}
                <section>
                    <h3 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">Theme Color</h3>
                    <div className="flex items-center space-x-3">
                        {Object.entries(themeColors).map(([name, { bg, ring }]) => (
                            <button
                                key={name}
                                onClick={() => handleThemeChange(name)}
                                disabled={!isCurrentUserAdmin}
                                className={`w-8 h-8 rounded-full ${bg} transition-transform hover:scale-110 focus:outline-none ring-2 ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark ${group.themeColor === name ? ring : 'ring-transparent'} disabled:cursor-not-allowed disabled:hover:scale-100`}
                                aria-label={`Set theme to ${name}`}
                            />
                        ))}
                    </div>
                </section>
                
                {/* Quick Emoji */}
                <section>
                    <h3 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">Quick Emoji</h3>
                    <div className="flex items-center space-x-2 text-3xl p-2 bg-surface-light dark:bg-surface-dark rounded-lg max-w-min">
                        <span>{group.quickEmoji || '👍'}</span>
                        {/* In a real app, clicking this would open an emoji picker */}
                    </div>
                </section>

                {/* Nicknames */}
                <section>
                    <h3 className="font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">Nicknames</h3>
                     <ul className="space-y-2">
                        {group.memberIds.map(memberId => {
                            const user = mockUsers.find(u => u.id === memberId);
                            if (!user) return null;
                            return (
                                <li key={user.id} className="flex items-center space-x-3 p-2 rounded-md">
                                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full flex-shrink-0" />
                                    <div className="flex-1">
                                        {isCurrentUserAdmin ? (
                                            <NicknameEditor user={user} group={group} onGroupUpdate={onGroupUpdate} />
                                        ) : (
                                            <div>
                                                <p className="font-medium text-text-primary-light dark:text-text-primary-dark">{group.nicknames?.[user.id] || user.name}</p>
                                                {group.nicknames?.[user.id] && <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{user.name}</p>}
                                            </div>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                     </ul>
                </section>
            </div>
        </div>
    </aside>
  );
};

export default GroupChatSettings;