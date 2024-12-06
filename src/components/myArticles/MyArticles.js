import React, { useEffect, useState } from 'react';
import { getMyArticles, deleteArticle } from '../../utils/api'; // Centralized API functions
import { useNavigate } from 'react-router-dom';
import MyArticleCard from './MyArticleCard';
import styles from './MyArticles.module.css'; // Scoped CSS module

const MyArticles = () => {
    const [articles, setArticles] = useState([]); // State for articles
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(null); // State for error messages
    const navigate = useNavigate();

    // Fetch user-specific articles on component mount
    useEffect(() => {
        const fetchMyArticles = async () => {
            try {
                const data = await getMyArticles(); // Fetch user's articles via API
                setArticles(data || []); // Set articles (default to an empty array if no data)
            } catch (err) {
                console.error('Error fetching articles:', err);
                setError('Error fetching your articles. Please try again later.');
            } finally {
                setLoading(false); // Stop the loading spinner
            }
        };

        fetchMyArticles();
    }, []);

    const handleWriteArticle = () => {
        navigate('/write-article'); // Navigate to the write article page
    };

    const handleEdit = (articleId) => {
        navigate(`/edit-article/${articleId}`); // Navigate to the edit article page
    };

    const handleView = (articleId) => {
        navigate(`/article/${articleId}`); // Navigate to view the article
    };

    const handleDelete = async (articleId) => {
        if (!window.confirm('Are you sure you want to delete this article?')) {
            return;
        }

        try {
            // Optimistically update the UI
            setArticles((prev) =>
                prev.map((article) =>
                    article._id === articleId ? { ...article, deleting: true } : article
                )
            );
            await deleteArticle(articleId); // Delete the article via API
            setArticles((prev) => prev.filter((article) => article._id !== articleId)); // Remove from state
        } catch (err) {
            console.error('Error deleting article:', err);
            alert('Error deleting article. Please try again later.');
        }
    };

    // Render loading state
    if (loading) {
        return (
            <div className={styles.loader} role="status" aria-live="polite">
                Loading your articles...
            </div>
        );
    }

    // Render error state
    if (error) {
        return (
            <div className={styles.error} role="alert">
                <p>{error}</p>
                <button
                    className={styles.retryButton}
                    onClick={() => window.location.reload()} // Reload the page to retry
                >
                    Retry
                </button>
            </div>
        );
    }

    // Render articles or fallback for no articles
    return (
        <div className={styles["my-articles-container"]}>
            {articles.length === 0 ? (
                <div className={styles["no-articles"]}>
                    <p>You have not posted any articles yet.</p>
                    <button
                        className={styles["write-article-button"]}
                        onClick={handleWriteArticle}
                    >
                        Write Your First Article
                    </button>
                </div>
            ) : (
                <div className={styles["articles-list"]}>
                    {articles.map((article) => (
                        <MyArticleCard
                            key={article._id}
                            article={article}
                            onEdit={() => handleEdit(article._id)}
                            onDelete={() => handleDelete(article._id)}
                            onView={() => handleView(article._id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyArticles;
