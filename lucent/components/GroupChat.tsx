import React, { useState } from 'react';
import type { Group, ChatMessage } from '../types';
import { mockUsers } from '../data/mockData';
import InformationCircleIcon from './icons/InformationCircleIcon';
import GroupChatSettings from './GroupChatSettings';

interface GroupChatProps {
  group: Group;
  onGroupUpdate: (updatedGroup: Group) => void;
}

const themeColors: { [key: string]: string } = {
  teal: 'bg-primary text-white',
  blue: 'bg-blue-600 text-white',
  pink: 'bg-pink-500 text-white',
  purple: 'bg-purple-600 text-white',
  orange: 'bg-orange-500 text-white',
};

const GroupChat: React.FC<GroupChatProps> = ({ group, onGroupUpdate }) => {
    const [messages, setMessages] = useState<ChatMessage[]>(group.chatHistory);
    const [newMessage, setNewMessage] = useState('');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            const currentUser = mockUsers.find(u => u.id === 'me')!;
            const message: ChatMessage = {
                id: Date.now(),
                authorId: currentUser.id,
                authorName: currentUser.name,
                authorAvatar: currentUser.avatar,
                content: newMessage.trim(),
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages([...messages, message]);
            setNewMessage('');
        }
    };
    
    const myMessageClasses = themeColors[group.themeColor || 'teal'] || themeColors.teal;
    
    return (
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft flex flex-col h-[70vh] relative overflow-hidden">
            <header className="flex items-center justify-between p-4 border-b border-border-light dark:border-border-dark">
                <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark">{group.name}</h3>
                <button 
                    onClick={() => setIsSettingsOpen(true)}
                    className="p-2 text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/10 rounded-full"
                    aria-label="Open chat settings"
                >
                    <InformationCircleIcon className="w-6 h-6" />
                </button>
            </header>
            <div className="flex-grow p-6 overflow-y-auto">
                <div className="space-y-4">
                    {messages.map(msg => {
                        const displayName = group.nicknames?.[msg.authorId] || msg.authorName;
                        return (
                            <div key={msg.id} className={`flex items-start gap-3 ${msg.authorId === 'me' ? 'flex-row-reverse' : ''}`}>
                                <img src={msg.authorAvatar} alt={msg.authorName} className="w-8 h-8 rounded-full" />
                                <div className={`rounded-lg px-4 py-2 max-w-sm ${msg.authorId === 'me' ? myMessageClasses : 'bg-background-light dark:bg-border-dark'}`}>
                                    <div className="flex items-baseline gap-2">
                                        <p className="font-semibold text-sm">{msg.authorId !== 'me' ? displayName : ''}</p>
                                        <p className={`text-xs ${msg.authorId === 'me' ? 'opacity-80' : 'text-text-secondary-light dark:text-text-secondary-dark'}`}>{msg.timestamp}</p>
                                    </div>
                                    <p className="text-sm">{msg.content}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="p-4 border-t border-border-light dark:border-border-dark">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-grow px-4 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button type="submit" className="px-6 py-2 bg-primary text-white font-semibold rounded-full hover:bg-primary-hover disabled:opacity-50" disabled={!newMessage.trim()}>
                        Send
                    </button>
                </form>
            </div>
            <GroupChatSettings 
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                group={group}
                onGroupUpdate={onGroupUpdate}
            />
        </div>
    );
};

export default GroupChat;