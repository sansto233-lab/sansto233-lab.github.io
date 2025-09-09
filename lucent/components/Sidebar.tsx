
import React from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from './icons/HomeIcon';
import GroupIcon from './icons/GroupIcon';
import BuildingLibraryIcon from './icons/BuildingLibraryIcon';
import CogIcon from './icons/CogIcon';
import SearchIcon from './icons/SearchIcon';

const commonLinkClass = "flex items-center space-x-3 md:space-x-4 px-4 py-2.5 rounded-md transition-colors duration-200";
const activeLinkClass = "bg-primary/10 text-primary-light font-semibold";
const inactiveLinkClass = "text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/5";

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col w-20 md:w-64 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark transition-all duration-300">
      <div className="flex items-center justify-center h-16 border-b border-border-light dark:border-border-dark">
        <h1 className="text-2xl font-bold text-text-accent-light dark:text-text-accent-dark">
          <span className="hidden md:inline">Study Hub</span>
          <span className="md:hidden">SH</span>
        </h1>
      </div>
      <div className="flex flex-col flex-1 p-2 md:p-4">
        <nav className="space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) => `${commonLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
          >
            <HomeIcon className="w-5 h-5" />
            <span className="hidden md:inline">Dashboard</span>
          </NavLink>
          <NavLink
            to="/groups"
            className={({ isActive }) => `${commonLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
          >
            <GroupIcon className="w-5 h-5" />
            <span className="hidden md:inline">Groups</span>
          </NavLink>
          <NavLink
            to="/school-hub"
            className={({ isActive }) => `${commonLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
          >
            <BuildingLibraryIcon className="w-5 h-5" />
            <span className="hidden md:inline">School Hub</span>
          </NavLink>
          <NavLink
            to="/study-feed"
            className={({ isActive }) => `${commonLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
          >
            <SearchIcon className="w-5 h-5" />
            <span className="hidden md:inline">Study Feed</span>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) => `${commonLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
          >
            <CogIcon className="w-5 h-5" />
            <span className="hidden md:inline">Settings</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;