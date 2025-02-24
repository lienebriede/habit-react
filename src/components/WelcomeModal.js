import React from 'react';
import { useHistory } from 'react-router-dom';

const WelcomeModal = ({ onClose }) => {
    const history = useHistory();

    const handleStartNow = () => {
        localStorage.setItem('hasSeenWelcomeModal', 'true');
        onClose();
        history.push('/signup');
    };

    return (
        <div style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
        }}>
            <div style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
            }}>
                <h2>Welcome to Habit by Bit!</h2>
                <button onClick={handleStartNow}>
                    Start Now!
                </button>
            </div>
        </div>
    );
};

export default WelcomeModal;