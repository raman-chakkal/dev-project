import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css'; // Scoped CSS module

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    const handleGoHome = () => {
        navigate('/'); // Navigate to the home page
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404 - Page Not Found</h1>
            <p className={styles.message}>
                Oops! The page you're looking for doesn't exist.
            </p>
            <div className={styles.buttonGroup}>
                <button onClick={handleGoBack} className={styles.backButton}>
                    Go Back
                </button>
                <button onClick={handleGoHome} className={styles.homeButton}>
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;
