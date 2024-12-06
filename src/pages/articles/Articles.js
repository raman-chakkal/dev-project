import React, { useState, useEffect } from 'react';
import { getAllArticles } from '../../utils/api'; // Centralized API function
import ArticleCard from '../../components/articleUtils/ArticleCard'; // Reusable ArticleCard component
import styles from './Articles.module.css'; // Scoped CSS module

const Articles = () => {
    const [articles, setArticles] = useState([]); // State to store fetched articles
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const { data } = await getAllArticles(); // Fetch articles via API
                setArticles(data); // Update state with fetched articles
                setError(null); // Clear any previous errors
            } catch (err) {
                console.error('Error fetching articles:', err);
                setError(err.response?.data?.message || 'Failed to fetch articles. Please try again later.');
            } finally {
                setLoading(false); // Stop the loading spinner
            }
        };

        fetchArticles();
    }, []); // Run once on component mount

    // Handle loading state
    if (loading) return <p className={styles.loading}>Loading articles...</p>;

    // Handle error state
    if (error) {
        return (
            <div className={styles.errorContainer}>
                <p className={styles.error}>{error}</p>
                <button
                    className={styles.retryButton}
                    onClick={() => window.location.reload()} // Simple reload to retry fetching
                >
                    Retry
                </button>
            </div>
        );
    }

    // Render articles or fallback if no articles exist
    return (
        <div className={styles.container}>
            {articles.length === 0 ? (
                <p className={styles.noArticles}>No articles found.</p>
            ) : (
                <div className={styles.articlesList}>
                    {articles.map((article) => (
                        <ArticleCard key={article._id} article={article} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Articles;
