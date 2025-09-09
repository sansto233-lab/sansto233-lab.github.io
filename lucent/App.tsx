
import React, { useState, lazy, Suspense, useCallback } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MessengerButton from './components/MessengerButton';
import MessengerSidebar from './components/MessengerSidebar';
import { mockGroups, mockNotifications } from './data/mockData';
import LoadingSpinner from './components/LoadingSpinner';
import type { Notification } from './types';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Groups = lazy(() => import('./pages/Groups'));
const GroupDetail = lazy(() => import('./pages/GroupDetail'));
const SchoolHub = lazy(() => import('./pages/SchoolHub'));
const StudyFeed = lazy(() => import('./pages/StudyFeed'));
const Settings = lazy(() => import('./pages/Settings'));
const Profile = lazy(() => import('./pages/Profile'));
const Pomodoro = lazy(() => import('./pages/Pomodoro'));

function App() {
  const [isMessengerOpen, setIsMessengerOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  
  const toggleMessenger = useCallback(() => setIsMessengerOpen(prev => !prev), []);
  const closeMessenger = useCallback(() => setIsMessengerOpen(false), []);

  const handleMarkNotificationAsRead = useCallback((notificationId: number) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n));
  }, []);

  const handleMarkAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  }, []);

  return (
    <HashRouter>
      <div className="flex h-screen bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            notifications={notifications}
            onMarkAsRead={handleMarkNotificationAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
          />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background-light dark:bg-background-dark">
            <div className="container mx-auto px-6 py-8 h-full">
              <Suspense fallback={<div className="flex items-center justify-center w-full h-full"><LoadingSpinner /></div>}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/groups" element={<Groups />} />
                  <Route path="/groups/:groupId" element={<GroupDetail />} />
                  <Route path="/school-hub" element={<SchoolHub />} />
                  <Route path="/study-feed" element={<StudyFeed />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/profile/:userId" element={<Profile />} />
                  <Route path="/pomodoro" element={<Pomodoro />} />
                </Routes>
              </Suspense>
            </div>
          </main>
        </div>
        <MessengerButton onClick={toggleMessenger} />
        <MessengerSidebar 
          isOpen={isMessengerOpen} 
          onClose={closeMessenger} 
          groups={mockGroups} 
        />
      </div>
    </HashRouter>
  );
}

export default App;