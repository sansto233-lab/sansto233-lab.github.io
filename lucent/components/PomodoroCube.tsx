import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FireIcon from './icons/FireIcon';

const PomodoroCube: React.FC = () => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // This effect ensures the streak on the dashboard is always up-to-date
    // with what's in localStorage.
    const updateStreak = () => {
      try {
        const streakData = JSON.parse(localStorage.getItem('pomodoroStreak') || '{}');
        setStreak(streakData.count || 0);
      } catch (error) {
        console.error("Failed to load streak from localStorage for cube", error);
      }
    };

    updateStreak();

    window.addEventListener('storage', updateStreak);
    return () => {
      window.removeEventListener('storage', updateStreak);
    };
  }, []);

  return (
    <Link to="/pomodoro" className="block group">
      <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-soft h-full flex flex-col justify-between transform transition-transform duration-300 group-hover:scale-105 group-hover:shadow-soft-lg">
        <div>
            <h4 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">Pomodoro Hub</h4>
            <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2">Enter your dedicated focus zone to start a study session.</p>
        </div>
        <div className="flex flex-col items-center mt-6">
            <div className="flex items-center space-x-2 text-orange-500">
                <FireIcon className="w-8 h-8" />
                <span className="font-bold text-3xl">{streak}</span>
                <span className="font-semibold text-lg text-text-primary-light dark:text-text-primary-dark">Study Streak</span>
            </div>
            <button className="mt-6 w-full px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-hover transition-colors">
                Launch Timer
            </button>
        </div>
      </div>
    </Link>
  );
};

export default PomodoroCube;