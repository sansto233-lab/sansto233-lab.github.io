import React from 'react';
import TodoList from '../components/TodoList';
import PomodoroCube from '../components/PomodoroCube';

const Dashboard: React.FC = () => {
  return (
    <div>
      <h3 className="text-3xl font-medium text-text-primary-light dark:text-text-primary-dark">Dashboard</h3>
      <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">Welcome back to your Study Hub!</p>
      
      <div className="mt-8">
        <h4 className="text-2xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">Productivity Tools</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PomodoroCube />
          <TodoList />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-soft">
          <h4 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">My Groups</h4>
          <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">You are a member of 3 groups.</p>
          <button className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors">View Groups</button>
        </div>
        
        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-soft">
          <h4 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">Upcoming Events</h4>
          <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">No upcoming events from the School Hub.</p>
           <button className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors">View Hub</button>
        </div>
        
        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-soft">
          <h4 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">Account Status</h4>
          <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">Your profile is 80% complete.</p>
           <button className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition-colors">Go to Settings</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;