import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleById } from '../../utils/api';
import styles from './ArticleDetails.module.css';

const ArticleDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null); // Article starts as null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const data = await getArticleById(id); // Fetch article by ID
                setArticle(data); // Set article data
            } catch (err) {
                console.error('Error fetching article:', err);
                if (err.response?.status === 404) {
                    setError('Article not found.');
                } else {
                    setError('Failed to load the article. Please try again.');
                }
            } finally {
                setLoading(false); // Stop loading state
            }
        };

        fetchArticle();
    }, [id]);

    // Show loading state
    if (loading) {
        return <p className={styles.loading}>Loading article...</p>;
    }

    // Show error state
    if (error) {
        return (
            <div className={styles.error}>
                <p>{error}</p>
                <button
                    className={styles.goBackButton}
                    onClick={() => navigate(-1)} // Go back to the previous page
                >
                    Go Back
                </button>
            </div>
        );
    }

    // Ensure article is loaded before accessing properties
    if (!article) {
        return <p className={styles.error}>No article data available.</p>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{article.title}</h1>
            <p className={styles.content}>{article.content}</p>
            <div className={styles.meta}>
                <p className={styles.author}>Author: {article.author?.name || 'Unknown'}</p>
                <p className={styles.date}>
                    Published: {new Date(article.createdAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default ArticleDetails;
