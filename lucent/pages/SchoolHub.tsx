
import React from 'react';
import type { SchoolAnnouncement } from '../types';

const announcements: SchoolAnnouncement[] = [
  {
    id: 1,
    title: 'Finals Week Library Hours Extended',
    content: 'The main library will be open 24/7 starting from next Monday until the end of the semester. Good luck with your exams!',
    date: '3 days ago',
  },
  {
    id: 2,
    title: 'Upcoming Career Fair - Meet Top Employers',
    content: 'Don\'t miss the annual career fair this Friday in the main gymnasium. Over 50 companies will be present. Dress professionally and bring your resume.',
    date: '1 week ago',
  },
  {
    id: 3,
    title: 'System Maintenance Scheduled for Sunday',
    content: 'Please be aware that the student portal will be offline for scheduled maintenance this Sunday from 2 AM to 6 AM.',
    date: '2 weeks ago',
  },
];

const SchoolHub: React.FC = () => {
  return (
    <div>
      <h3 className="text-3xl font-medium text-text-primary-light dark:text-text-primary-dark">School Hub</h3>
      <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">Latest announcements and events from your institution.</p>
      
      <div className="mt-8 space-y-6">
        {announcements.map(announcement => (
          <div key={announcement.id} className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-soft">
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">{announcement.title}</h4>
              <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{announcement.date}</span>
            </div>
            <p className="mt-3 text-text-secondary-light dark:text-text-secondary-dark">{announcement.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolHub;