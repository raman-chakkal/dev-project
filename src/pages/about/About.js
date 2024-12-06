import React from 'react';
import styles from './About.module.css'; // Correct CSS Modules import

const About = () => {
    return (
        <div className={styles["about-container"]}>
            <h1 className={styles.heading}>About Us</h1>
            <p className={styles.paragraph}>Welcome to Anony, your platform to explore and share articles.</p>
            <p className={styles.paragraph}>
                Anony is dedicated to providing a platform where users can write and read articles on various topics.
                Our goal is to foster a community of writers and readers who value free expression and creativity.
            </p>
            <h2 className={styles.subheading}>Features</h2>
            <ul className={styles.list}>
                <li className={styles.listItem}>Write and publish your articles.</li>
                <li className={styles.listItem}>Explore a variety of topics and articles written by other users.</li>
                <li className={styles.listItem}>Interact with the community by commenting on articles.</li>
                <li className={styles.listItem}>Manage your account, settings, and profile with ease.</li>
            </ul>
            <h2 className={styles.subheading}>Contact Us</h2>
            <p className={styles.paragraph}>
                If you have any questions, feel free to contact us at <strong className={styles.contactEmail}>support@anony.com</strong>.
            </p>
        </div>
    );
};

export default About;
