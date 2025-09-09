import React, { useState } from 'react';
import PomodoroTimer from '../components/PomodoroTimer';
import StreakCelebrationModal from '../components/StreakCelebrationModal';
import { Link } from 'react-router-dom';

const Pomodoro: React.FC = () => {
    const [showCelebration, setShowCelebration] = useState(false);

    const handleStreakIncrease = () => {
        setShowCelebration(true);
    };

    const handleCloseModal = () => {
        setShowCelebration(false);
    };

    return (
        <div className="w-full">
             <div className="mb-6">
                <Link to="/" className="text-text-accent-light dark:text-text-accent-dark hover:underline">
                    &larr; Back to Dashboard
                </Link>
            </div>
            <h3 className="text-3xl font-medium text-text-primary-light dark:text-text-primary-dark">Pomodoro Hub</h3>
            <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">Your dedicated space for deep focus.</p>

            <div className="mt-8 flex justify-center items-center">
                <PomodoroTimer onStreakIncrease={handleStreakIncrease} />
            </div>
            
            {showCelebration && <StreakCelebrationModal onClose={handleCloseModal} />}
        </div>
    );
};

export default Pomodoro;