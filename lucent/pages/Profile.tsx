import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockUsers, mockStudyMaterials } from '../data/mockData';
import type { UserProfile, StudyMaterial } from '../types';
import ProfileAnalysis from '../components/ProfileAnalysis';

const Profile: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();

    const user: UserProfile | undefined = useMemo(() => {
        const idToFind = userId === 'me' ? 'me' : Number(userId);
        return mockUsers.find(u => u.id === idToFind);
    }, [userId]);

    const userMaterials: StudyMaterial[] = useMemo(() => {
        if (!user) return [];
        return mockStudyMaterials.filter(m => m.authorId === user.id);
    }, [user]);

    if (!user) {
        return (
            <div className="text-center py-12">
                <h3 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">User not found</h3>
                <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">The profile you are looking for does not exist.</p>
                <Link to="/" className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover transition">Go to Dashboard</Link>
            </div>
        );
    }

    return (
        <div>
            <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-32 h-32 rounded-full ring-4 ring-primary ring-offset-4 ring-offset-surface-light dark:ring-offset-surface-dark object-cover"
                    />
                    <div className="mt-4 md:mt-0 md:ml-8 flex-1">
                        <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">{user.name}</h2>
                        <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">{user.bio}</p>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border-light dark:border-border-dark">
                    <h4 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">Studying</h4>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {user.courses.map(course => (
                            <span key={course} className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary-hover dark:bg-primary/20 dark:text-primary-light rounded-full">
                                {course}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            
            <ProfileAnalysis stats={user.performanceStats} />

            <div className="mt-8">
                <h3 className="text-2xl font-medium text-text-primary-light dark:text-text-primary-dark mb-4">{user.name}'s Shared Materials</h3>
                {userMaterials.length > 0 ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userMaterials.map(material => (
                             <div key={material.id} className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-soft flex flex-col">
                                 <h4 className="text-lg font-bold text-text-accent-light dark:text-text-accent-dark flex-grow">{material.title}</h4>
                                 <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">{material.date}</p>
                                 <p className="text-text-secondary-light dark:text-text-secondary-dark mt-3 text-sm flex-grow">{material.description}</p>
                                  <button className="mt-4 text-sm px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary-hover dark:text-primary-light rounded-full self-start">View Details</button>
                             </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft">
                        <p className="text-text-secondary-light dark:text-text-secondary-dark">No materials shared yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;