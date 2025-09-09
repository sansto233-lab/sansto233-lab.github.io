import React, { useState, useEffect, useCallback } from 'react';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import ResetIcon from './icons/ResetIcon';
import FireIcon from './icons/FireIcon';
import LockIcon from './icons/LockIcon';
import UnlockIcon from './icons/UnlockIcon';
import FocusLockOverlay from './FocusLockOverlay';
import ExitFocusModal from './ExitFocusModal';

const WORK_MINUTES = 25;
const BREAK_MINUTES = 5;

const isSameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
};

const isYesterday = (d1: Date, d2: Date) => {
    const yesterday = new Date(d2);
    yesterday.setDate(yesterday.getDate() - 1);
    return isSameDay(d1, yesterday);
};

interface PomodoroTimerProps {
    onStreakIncrease: () => void;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ onStreakIncrease }) => {
    const [minutes, setMinutes] = useState(WORK_MINUTES);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [streak, setStreak] = useState(0);
    const [isFocusEnabled, setFocusEnabled] = useState(false);
    const [showFocusLock, setShowFocusLock] = useState(false);
    const [showExitConfirmation, setShowExitConfirmation] = useState(false);

    const resetTimer = useCallback((breakTime = false) => {
        setIsActive(false);
        setShowFocusLock(false);
        setShowExitConfirmation(false);
        setIsBreak(breakTime);
        setMinutes(breakTime ? BREAK_MINUTES : WORK_MINUTES);
        setSeconds(0);
    }, []);

    const updateStreak = useCallback(() => {
        try {
            const streakData = JSON.parse(localStorage.getItem('pomodoroStreak') || '{}');
            const today = new Date();
            const lastCompleted = streakData.date ? new Date(streakData.date) : null;
            let currentStreak = streakData.count || 0;
            let streakIncreased = false;

            if (lastCompleted) {
                if (isYesterday(lastCompleted, today)) {
                    currentStreak++;
                    streakIncreased = true;
                } else if (!isSameDay(lastCompleted, today)) {
                    currentStreak = 1;
                    streakIncreased = true;
                }
            } else {
                currentStreak = 1;
                streakIncreased = true;
            }
            
            localStorage.setItem('pomodoroStreak', JSON.stringify({ count: currentStreak, date: today.toISOString() }));
            setStreak(currentStreak);
            if (streakIncreased) {
                onStreakIncrease();
            }
        } catch (error) {
            console.error("Failed to update streak in localStorage", error);
        }
    }, [onStreakIncrease]);
    
    useEffect(() => {
        try {
            const streakData = JSON.parse(localStorage.getItem('pomodoroStreak') || '{}');
            const today = new Date();
            const lastCompleted = streakData.date ? new Date(streakData.date) : null;
            let currentStreak = streakData.count || 0;
            if (lastCompleted && !isSameDay(lastCompleted, today) && !isYesterday(lastCompleted, today)) {
                currentStreak = 0; 
                localStorage.setItem('pomodoroStreak', JSON.stringify({ count: 0, date: null }));
            }
            setStreak(currentStreak);
        } catch (error) {
            console.error("Failed to load streak from localStorage", error);
        }
    }, []);


    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;
        if (isActive) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else if (minutes > 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                } else {
                    if (!isBreak) {
                        updateStreak();
                    }
                    resetTimer(!isBreak);
                }
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, seconds, minutes, isBreak, resetTimer, updateStreak]);

    useEffect(() => {
        const blockBackNavigation = (event: PopStateEvent) => {
            if (showFocusLock) {
                window.history.pushState(null, '', window.location.href);
            }
        };

        if (showFocusLock) {
            window.history.pushState(null, '', window.location.href);
            window.addEventListener('popstate', blockBackNavigation);
        }

        return () => {
            window.removeEventListener('popstate', blockBackNavigation);
        };
    }, [showFocusLock]);

    const toggleTimer = () => {
        const newIsActive = !isActive;
        setIsActive(newIsActive);
        if (newIsActive && isFocusEnabled) {
            setShowFocusLock(true);
        }
    };
    
    const requestExitFocus = () => {
        if (isActive) {
            setShowExitConfirmation(true);
        } else {
            setShowFocusLock(false);
        }
    };

    const confirmExitFocus = () => {
        setIsActive(false);
        setShowFocusLock(false);
        setShowExitConfirmation(false);
    };

    const cancelExitFocus = () => {
        setShowExitConfirmation(false);
    };

    const totalSeconds = (isBreak ? BREAK_MINUTES : WORK_MINUTES) * 60;
    const elapsedSeconds = totalSeconds - (minutes * 60 + seconds);
    const progress = (elapsedSeconds / totalSeconds) * 100;
    
    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    return (
        <>
        {showFocusLock && <FocusLockOverlay time={timeString} onExit={requestExitFocus} />}
        {showExitConfirmation && <ExitFocusModal onConfirm={confirmExitFocus} onCancel={cancelExitFocus} />}
        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-soft flex flex-col items-center justify-center w-full h-full">
            <div className="relative w-72 h-72 flex items-center justify-center">
                <svg className="absolute w-full h-full transform -rotate-90">
                    <circle cx="50%" cy="50%" r={radius} strokeWidth="15" className="stroke-current text-border-light dark:text-border-dark" fill="transparent" />
                    <circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        strokeWidth="15"
                        className={`stroke-current ${isBreak ? 'text-green-500' : 'text-primary'}`}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.5s linear' }}
                    />
                </svg>
                <div className="text-center">
                    <div className="text-7xl font-bold text-text-primary-light dark:text-text-primary-dark">
                        {timeString}
                    </div>
                    <div className="mt-1 text-lg font-medium tracking-wider uppercase text-text-secondary-light dark:text-text-secondary-dark">
                        {isBreak ? 'Break' : 'Focus'}
                    </div>
                </div>
            </div>

            <div className="flex items-center space-x-6 mt-10">
                <button
                    onClick={() => setFocusEnabled(!isFocusEnabled)}
                    className={`p-4 rounded-full transition-colors ${isFocusEnabled ? 'bg-primary/20 text-primary-light' : 'bg-background-light dark:bg-border-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-border-light dark:hover:bg-surface-dark'}`}
                    aria-label={isFocusEnabled ? 'Disable focus mode' : 'Enable focus mode'}
                >
                    {isFocusEnabled ? <LockIcon className="w-8 h-8" /> : <UnlockIcon className="w-8 h-8" />}
                </button>
                <button
                    onClick={toggleTimer}
                    className="p-4 rounded-full text-text-secondary-light dark:text-text-secondary-dark bg-background-light dark:bg-border-dark hover:bg-border-light dark:hover:bg-surface-dark transition-colors"
                    aria-label={isActive ? 'Pause timer' : 'Start timer'}
                >
                    {isActive ? <PauseIcon className="w-8 h-8" /> : <PlayIcon className="w-8 h-8" />}
                </button>
                <button
                    onClick={() => resetTimer(isBreak)}
                    className="p-4 rounded-full text-text-secondary-light dark:text-text-secondary-dark bg-background-light dark:bg-border-dark hover:bg-border-light dark:hover:bg-surface-dark transition-colors"
                    aria-label="Reset timer"
                >
                    <ResetIcon className="w-8 h-8" />
                </button>
            </div>
            
            <div className="mt-10 flex items-center space-x-2 text-orange-500">
                <FireIcon className="w-7 h-7" />
                <span className="font-semibold text-2xl">{streak} Study Streak</span>
            </div>
        </div>
        </>
    );
};

export default PomodoroTimer;