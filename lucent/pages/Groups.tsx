import React, { useState, useCallback, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import type { Group } from '../types';
import { mockGroups } from '../data/mockData';
import SearchInput from '../components/SearchInput';

const GroupCard: React.FC<{ group: Group }> = memo(({ group }) => (
  <Link to={`/groups/${group.id}`} className="block hover:no-underline group">
    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-soft group-hover:shadow-soft-lg group-hover:scale-[1.02] transition-all duration-300 h-full flex flex-col">
      <h4 className="text-xl font-bold text-text-accent-light dark:text-text-accent-dark">{group.name}</h4>
      <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark flex-grow">{group.description}</p>
      <div className="mt-4 text-sm text-text-secondary-light dark:text-text-secondary-dark">{group.memberIds.length} Members</div>
    </div>
  </Link>
));

const Groups: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [searchTerm, setSearchTerm] = useState('');
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDesc, setNewGroupDesc] = useState('');

  const handleCreateGroup = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (newGroupName.trim() && newGroupDesc.trim()) {
      const newGroup: Group = {
        id: Date.now(),
        name: newGroupName.trim(),
        description: newGroupDesc.trim(),
        creatorId: 'me',
        adminIds: ['me'],
        memberIds: ['me'],
        chatHistory: [],
      };
      setGroups(prevGroups => [newGroup, ...prevGroups]);
      setNewGroupName('');
      setNewGroupDesc('');
    }
  }, [newGroupName, newGroupDesc]);
  
  const filteredGroups = useMemo(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    if (!lowercasedTerm) return groups;
    return groups.filter(g => 
        g.name.toLowerCase().includes(lowercasedTerm) || 
        g.description.toLowerCase().includes(lowercasedTerm)
    );
  }, [searchTerm, groups]);

  return (
    <div>
      <h3 className="text-3xl font-medium text-text-primary-light dark:text-text-primary-dark">Groups</h3>

      <div className="mt-8 bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-soft">
        <h4 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">Create a New Group</h4>
        <form onSubmit={handleCreateGroup} className="mt-4 space-y-4">
          <div>
            <label htmlFor="group-name" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Group Name</label>
            <input
              type="text"
              id="group-name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-md shadow-sm placeholder-text-secondary-light focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="e.g., Organic Chemistry Finals Prep"
            />
          </div>
          <div>
            <label htmlFor="group-desc" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Description</label>
            <textarea
              id="group-desc"
              rows={3}
              value={newGroupDesc}
              onChange={(e) => setNewGroupDesc(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-md shadow-sm placeholder-text-secondary-light focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="What is this group about?"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-surface-dark disabled:opacity-50" disabled={!newGroupName.trim() || !newGroupDesc.trim()}>
            Create Group
          </button>
        </form>
      </div>
      
      <div className="mt-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <h4 className="text-2xl font-semibold text-text-primary-light dark:text-text-primary-dark">Your Groups</h4>
            <SearchInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search groups..."
              className="md:w-1/2"
              ariaLabel="Search your groups"
            />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map(group => <GroupCard key={group.id} group={group} />)}
        </div>
      </div>
    </div>
  );
};

export default Groups;