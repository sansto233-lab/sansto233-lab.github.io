import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockGroups, mockUsers } from '../data/mockData';
import type { Group } from '../types';
import GroupChat from '../components/GroupChat';
import GroupSettings from '../components/GroupSettings';
import ChatBubbleIcon from '../components/icons/ChatBubbleIcon';
import CogIcon from '../components/icons/CogIcon';
import UsersIcon from '../components/icons/UsersIcon';
import ShieldCheckIcon from '../components/icons/ShieldCheckIcon';

type Tab = 'chat' | 'members' | 'settings';

const GroupDetail: React.FC = () => {
    const { groupId } = useParams<{ groupId: string }>();
    const [activeTab, setActiveTab] = useState<Tab>('chat');

    const initialGroup = useMemo(() => {
        return mockGroups.find(g => g.id === Number(groupId));
    }, [groupId]);

    const [group, setGroup] = useState<Group | undefined>(initialGroup);
    
    const handleUpdateGroup = (updatedGroup: Group) => {
        setGroup(updatedGroup);
        // In a real app, this would also update the global state or backend.
    };

    const memberList = useMemo(() => {
        if (!group) return [];
        return group.memberIds.map(memberId => {
            const user = mockUsers.find(u => u.id === memberId);
            if (!user) return null;
            const isAdmin = group.adminIds.includes(memberId);
            return (
                <li key={user.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-background-light dark:hover:bg-border-dark">
                    <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                        <span className="font-medium text-text-primary-light dark:text-text-primary-dark">{user.name}</span>
                        {group.creatorId === user.id && <span className="ml-2 text-xs text-text-secondary-light dark:text-text-secondary-dark">(Creator)</span>}
                    </div>
                    {isAdmin && <span title="Admin"><ShieldCheckIcon className="w-5 h-5 text-green-500" /></span>}
                </li>
            );
        }).filter(Boolean);
    }, [group]);


    if (!group) {
        return (
            <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">Group not found</h3>
                <Link to="/groups" className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition">Back to Groups</Link>
            </div>
        );
    }
    
    const TabButton: React.FC<{tabName: Tab, icon: React.ReactNode, label: string}> = ({tabName, icon, label}) => {
        const isActive = activeTab === tabName;
        return (
            <button 
                onClick={() => setActiveTab(tabName)}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive ? 'bg-primary text-white' : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/10'}`}
            >
                {icon}
                <span>{label}</span>
            </button>
        )
    }

    return (
        <div>
            <div className="mb-6">
                <Link to="/groups" className="text-text-accent-light dark:text-text-accent-dark hover:underline">
                    &larr; All Groups
                </Link>
            </div>
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft p-6">
                <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">{group.name}</h2>
                <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">{group.description}</p>
                <p className="mt-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">{group.memberIds.length} Members</p>
            </div>

            <div className="mt-6">
                <div className="border-b border-border-light dark:border-border-dark">
                    <nav className="flex space-x-2" aria-label="Tabs">
                        <TabButton tabName="chat" icon={<ChatBubbleIcon className="w-5 h-5" />} label="Chat" />
                        <TabButton tabName="members" icon={<UsersIcon className="w-5 h-5" />} label="Members" />
                        <TabButton tabName="settings" icon={<CogIcon className="w-5 h-5" />} label="Admin Panel" />
                    </nav>
                </div>
                <div className="mt-6">
                    {activeTab === 'chat' && <GroupChat group={group} onGroupUpdate={handleUpdateGroup} />}
                    {activeTab === 'members' && (
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft p-6">
                            <h3 className="text-xl font-semibold">Members ({group.memberIds.length})</h3>
                            <ul className="mt-4 space-y-3">
                                {memberList}
                            </ul>
                        </div>
                    )}
                    {activeTab === 'settings' && <GroupSettings group={group} onGroupUpdate={handleUpdateGroup} />}
                </div>
            </div>
        </div>
    );
};

export default GroupDetail;