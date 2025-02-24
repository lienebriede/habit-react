import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from "../styles/Welcome.module.css";
import btnStyles from "../styles/Button.module.css";

import logo from '../assets/logo.png';

const WelcomeModal = ({ onClose }) => {
    const history = useHistory();

    const handleStartNow = () => {
        localStorage.setItem('hasSeenWelcomeModal', 'true');
        onClose();
        history.push('/signup');
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>

                <img
                    src={logo}
                    alt="Logo"
                    className={styles.logo}
                />

                <h1>Welcome to Habit by Bit! </h1>
                <h3>Build Habits, Bit by Bit!</h3>
                <div className={styles.textWrapper}>

                    <p>Did you know that your brain is like a network of pathways?</p>
                    <p>Every time you repeat an action, you strengthen a neural connection, making it easier over time.</p>
                    <p>This is how habits form, like paving a new road in your mind!</p>
                    <p>At first, building a new habit feels unfamiliar and difficult, but with repetition, it becomes easier and more natural.</p>
                </div>
                <h3>How Habit by Bit Helps You! </h3>
                <ul>
                    <li><i class="fa-solid fa-check"></i><strong>Start with just 7 days! </strong>Build small, win big!</li>
                    <li><i class="fa-solid fa-check"></i><strong>Stack your habits! </strong>Connect new habits to existing ones to make them stick.</li>
                    <li><i class="fa-solid fa-check"></i><strong>Track your progress! </strong>Watch as your habits grow stronger, just like your neural pathways!</li>
                    <li><i class="fa-solid fa-check"></i><strong>Keep going! </strong>After 7 days, extend your habit journey for another 7 or 14 days!</li>
                </ul>


                <button className={`${btnStyles.mainBtn} ${btnStyles.startNowBtn}`} onClick={handleStartNow}>
                    Start Now!
                </button>

            </div >
        </div >
    );
};

export default WelcomeModal;