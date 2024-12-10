import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css'; // Importing CSS Module

const Home = () => {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Welcome to Anony</h1>
                <p className={styles.subtitle}>
                    Your platform to explore, write, and share amazing articles.
                </p>
                <div className={styles.ctaButtons}>
                    <Link to="/register" className={styles.button}>
                        Get Started
                    </Link>
                    <Link to="/articles" className={styles.buttonOutline}>
                        Explore Articles
                    </Link>
                </div>
            </header>
            <section className={styles.features}>
                <h2 className={styles.sectionTitle}>Why Choose Anony?</h2>
                <div className={styles.featureList}>
                    <div className={styles.feature}>
                        <h3>Write Your Story</h3>
                        <p>
                            Share  your thoughts, knowledge, and creativity with a global
                            audience.
                        </p>
                    </div>
                    <div className={styles.feature}>
                        <h3>Discover Content</h3>
                        <p>
                            Explore articles across a variety of topics written by
                            talented authors. this most pis sj hsb
                        </p>
                    </div>
                    <div className={styles.feature}>
                        <h3>Engage with Others</h3>
                        <p>
                            Interact with authors and readers through comments and
                            discussions.
                        </p>
                    </div>
                </div>
            </section>
            <section className={styles.callToAction}>
                <h2>Join the Anony Community</h2>
                <p>
                    Be part of a growing community of writers and readers. Share your
                    story, and explore the world through the words of others.
                </p>
                <Link to="/register" className={styles.button}>
                    Sign Up Now
                </Link>
            </section>
        </div>
    );
};

export default Home;
