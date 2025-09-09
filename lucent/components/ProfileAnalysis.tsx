import React from 'react';
import type { PerformanceStats } from '../types';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => (
    <div className="bg-background-light dark:bg-surface-dark p-6 rounded-xl flex items-center space-x-4">
        <div className="text-3xl">{icon}</div>
        <div>
            <p className="text-3xl font-bold text-text-accent-light dark:text-text-accent-dark">{value}</p>
            <p className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">{label}</p>
        </div>
    </div>
);

const ProfileAnalysis: React.FC<{ stats: PerformanceStats }> = ({ stats }) => {
    const hoursFocused = (stats.totalFocusTime / 60).toFixed(1);

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-medium text-text-primary-light dark:text-text-primary-dark mb-4">Performance Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                    label="Total Focus Hours" 
                    value={hoursFocused} 
                    icon="⏰" 
                />
                <StatCard 
                    label="Pomodoro Sessions" 
                    value={stats.studySessions} 
                    icon="🎯" 
                />
                <StatCard 
                    label="Materials Shared" 
                    value={stats.materialsShared} 
                    icon="📚" 
                />
            </div>
        </div>
    );
};

export default ProfileAnalysis;