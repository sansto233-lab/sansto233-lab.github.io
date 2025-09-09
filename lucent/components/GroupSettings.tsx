import React, { useState } from 'react';
import type { Group } from '../types';
import { mockUsers } from '../data/mockData';
import ShieldCheckIcon from './icons/ShieldCheckIcon';
import TrashIcon from './icons/TrashIcon';
import ConfirmationModal from './ConfirmationModal';
import type { UserProfile } from '../types';

interface GroupSettingsProps {
    group: Group;
    onGroupUpdate: (updatedGroup: Group) => void;
}

const GroupSettings: React.FC<GroupSettingsProps> = ({ group, onGroupUpdate }) => {
    const [groupName, setGroupName] = useState(group.name);
    const [groupDesc, setGroupDesc] = useState(group.description);
    const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
    
    const isCurrentUserAdmin = group.adminIds.includes('me');

    const handleSaveChanges = (e: React.FormEvent) => {
        e.preventDefault();
        onGroupUpdate({ ...group, name: groupName, description: groupDesc });
        alert('Changes saved! (Mocked)');
    };
    
    const handleToggleAdmin = (memberId: string | number) => {
        if (memberId === group.creatorId) return; // Creator cannot be demoted
        const newAdminIds = group.adminIds.includes(memberId)
            ? group.adminIds.filter(id => id !== memberId)
            : [...group.adminIds, memberId];
        onGroupUpdate({ ...group, adminIds: newAdminIds });
    };
    
    const handleRemoveMemberClick = (user: UserProfile) => {
        if (user.id === group.creatorId) return; // Creator cannot be removed
        setSelectedUser(user);
        setConfirmModalOpen(true);
    };
    
    const handleConfirmRemoveMember = () => {
        if (!selectedUser) return;
        const newMemberIds = group.memberIds.filter(id => id !== selectedUser.id);
        const newAdminIds = group.adminIds.filter(id => id !== selectedUser.id);
        onGroupUpdate({ ...group, memberIds: newMemberIds, adminIds: newAdminIds });
        setConfirmModalOpen(false);
        setSelectedUser(null);
    };

    return (
        <>
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft p-6 max-w-2xl">
            <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">Group Settings</h3>
            <form onSubmit={handleSaveChanges} className="mt-6 space-y-4">
                <div>
                    <label htmlFor="group-name" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Group Name</label>
                    <input
                        type="text"
                        id="group-name"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        disabled={!isCurrentUserAdmin}
                    />
                </div>
                <div>
                    <label htmlFor="group-desc" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Description</label>
                    <textarea
                        id="group-desc"
                        rows={4}
                        value={groupDesc}
                        onChange={(e) => setGroupDesc(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        disabled={!isCurrentUserAdmin}
                    />
                </div>
                {isCurrentUserAdmin && (
                    <div className="pt-2">
                        <button type="submit" className="px-5 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-surface-dark">
                            Save Changes
                        </button>
                    </div>
                )}
            </form>
            
            {isCurrentUserAdmin && (
                <div className="mt-8 pt-6 border-t border-border-light dark:border-border-dark">
                    <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">Member Management</h3>
                    <ul className="mt-4 space-y-2">
                        {group.memberIds.map(memberId => {
                            const user = mockUsers.find(u => u.id === memberId);
                            if (!user || user.id === 'me') return null;
                            
                            const isAdmin = group.adminIds.includes(memberId);
                            const isCreator = group.creatorId === memberId;

                            return (
                                <li key={user.id} className="flex items-center justify-between p-2 rounded-md hover:bg-background-light dark:hover:bg-border-dark">
                                    <div className="flex items-center space-x-3">
                                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                                        <span className="font-medium text-text-primary-light dark:text-text-primary-dark">{user.name}</span>
                                        {isCreator && <span className="text-xs text-text-secondary-light dark:text-text-secondary-dark">(Creator)</span>}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button 
                                            onClick={() => handleToggleAdmin(user.id)}
                                            disabled={isCreator}
                                            className="p-2 text-text-secondary-light disabled:opacity-50 disabled:cursor-not-allowed hover:text-green-600 dark:hover:text-green-400"
                                            aria-label={isAdmin ? 'Demote from Admin' : 'Promote to Admin'}
                                        >
                                            <ShieldCheckIcon className={`w-5 h-5 ${isAdmin ? 'text-green-500' : 'text-gray-400'}`} />
                                        </button>
                                        <button
                                            onClick={() => handleRemoveMemberClick(user)}
                                            disabled={isCreator}
                                            className="p-2 text-text-secondary-light disabled:opacity-50 disabled:cursor-not-allowed hover:text-red-600 dark:hover:text-red-400"
                                            aria-label="Remove member"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}

        </div>
        <ConfirmationModal
            isOpen={isConfirmModalOpen}
            onClose={() => setConfirmModalOpen(false)}
            onConfirm={handleConfirmRemoveMember}
            title="Remove Member"
        >
            Are you sure you want to remove <strong>{selectedUser?.name}</strong> from the group? This action cannot be undone.
        </ConfirmationModal>
        </>
    );
};

export default GroupSettings;