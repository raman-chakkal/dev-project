import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchArticles } from '../../utils/api'; // Centralized API function
import ArticleCard from './ArticleCard';
import styles from './SearchArticles.module.css';

const SearchArticles = () => {
    const [articles, setArticles] = useState([]); // Articles fetched based on the query
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const location = useLocation(); // Get current location to access query params

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search); // Extract query params
        const query = queryParams.get('query'); // Get the 'query' parameter from the URL

        if (query) {
            fetchArticles(query); // Fetch articles when a query is present
        } else {
            setArticles([]); // Reset articles if no query is provided
            setLoading(false);
        }
    }, [location.search]); // Re-run effect when the search query changes

    const fetchArticles = async (query) => {
        setLoading(true); // Start loading
        setError(null); // Clear any previous errors
        try {
            const data = await searchArticles(query); // Call the API function to search articles
            setArticles(data); // Update articles state
        } catch (err) {
            console.error('Error fetching articles:', err);
            setError('Failed to fetch search results. Please try again later.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Handle retry for fetching articles
    const handleRetry = () => {
        const query = new URLSearchParams(location.search).get('query');
        if (query) fetchArticles(query);
    };

    // Extract the query from the URL
    const query = new URLSearchParams(location.search).get('query');

    // Render loading state
    if (loading) {
        return (
            <div className={styles.loader} role="status" aria-live="polite">
                Loading search results...
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className={styles.error}>
                <p>{error}</p>
                <button onClick={handleRetry} className={styles.retryButton}>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>
                Search Results for "{query || 'Unknown Query'}"
            </h2>
            {articles.length === 0 ? (
                <div className={styles.noResults}>
                    <p>No articles found for "{query}".</p>
                    <img src="/assets/no-results.svg" alt="No results found" />
                </div>
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

export default SearchArticles;
