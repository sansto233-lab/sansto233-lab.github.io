
import React, { useState } from 'react';
import GoogleIcon from '../components/icons/GoogleIcon';
import FacebookIcon from '../components/icons/FacebookIcon';

interface ConnectionButtonProps {
    name: string;
    icon: React.ReactNode;
    isConnected: boolean;
    onToggle: () => void;
}

const ConnectionButton: React.FC<ConnectionButtonProps> = ({ name, icon, isConnected, onToggle }) => {
    const baseClasses = "w-full flex items-center justify-center px-4 py-3 font-semibold rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-surface-dark";
    
    const connectedClasses = "bg-green-500/10 text-green-700 dark:text-green-300 border border-green-500/20";
    const disconnectedClasses = "bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark border border-border-light dark:border-border-dark hover:bg-primary/5";

    const buttonText = isConnected ? `Disconnect from ${name}` : `Connect with ${name}`;
    
    return (
        <button onClick={onToggle} className={`${baseClasses} ${isConnected ? connectedClasses : disconnectedClasses}`}>
            {icon}
            <span className="ml-3">{buttonText}</span>
        </button>
    );
};


const Settings: React.FC = () => {
    const [isGoogleConnected, setGoogleConnected] = useState(false);
    const [isFacebookConnected, setFacebookConnected] = useState(true);

    return (
        <div>
            <h3 className="text-3xl font-medium text-text-primary-light dark:text-text-primary-dark">Settings</h3>

            <div className="mt-8 bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-soft max-w-2xl mx-auto">
                <h4 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">Account Connections</h4>
                <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">
                    Connect your social accounts to easily find friends and share updates.
                </p>

                <div className="mt-6 space-y-4">
                    <ConnectionButton
                        name="Google"
                        icon={<GoogleIcon className="w-6 h-6" />}
                        isConnected={isGoogleConnected}
                        onToggle={() => setGoogleConnected(prev => !prev)}
                    />
                    <ConnectionButton
                        name="Facebook"
                        icon={<FacebookIcon className="w-6 h-6 text-blue-600" />}
                        isConnected={isFacebookConnected}
                        onToggle={() => setFacebookConnected(prev => !prev)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Settings;