import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './EditArticle.module.css'; // Scoped CSS import
import { getArticleById, updateArticleById } from '../../utils/api'; // Centralized API functions

const EditArticle = () => {
    const { articleId } = useParams(); // Extract articleId from URL
    const navigate = useNavigate(); // For navigation
    const [formData, setFormData] = useState({ title: '', content: '' }); // Form data state
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [isSubmitting, setIsSubmitting] = useState(false); // Submission state
    const [error, setError] = useState(null); // Error state

    const textareaRef = useRef(null);

    // Adjust textarea height dynamically
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [formData.content]);

    // Fetch article data on component mount
    useEffect(() => {
        const fetchArticle = async () => {
            setIsLoading(true);
            try {
                const data = await getArticleById(articleId); // Fetch article data
                setFormData({ title: data.title, content: data.content }); // Populate form with data
                setError(null); // Clear any previous errors
            } catch (err) {
                console.error('Error fetching article:', err.message);
                setError('Error loading article. Please try again later.');
            } finally {
                setIsLoading(false); // Stop the loading spinner
            }
        };

        fetchArticle();
    }, [articleId]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic form validation
        if (formData.title.trim().length < 5 || formData.content.trim().length < 20) {
            setError('Title must be at least 5 characters and content at least 20 characters long.');
            return;
        }

        setIsSubmitting(true);
        try {
            await updateArticleById(articleId, formData); // Update the article via API
            navigate('/dashboard/my-articles'); // Redirect to "My Articles"
        } catch (err) {
            console.error('Error updating article:', err.message);
            setError('Error updating article. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Display loading state
    if (isLoading) {
        return <p className={styles.loading}>Loading article data...</p>;
    }

    // Display error state
    if (error) {
        return (
            <div className={styles.errorContainer}>
                <p className={styles.error}>{error}</p>
                <button
                    className={styles.goBackButton}
                    onClick={() => navigate('/dashboard/my-articles')}
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className={styles["edit-article-layout"]}>
            <div className={styles["button-header"]}>
                <button
                    className={styles["update-button"]}
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Updating...' : 'Update'}
                </button>
            </div>
            {/* Editing Area */}
            <div className={styles["edit-article-container"]}>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={styles["edit-article-title"]}
                        placeholder="Edit Title..."
                        required
                    />
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className={styles["edit-article-content"]}
                        placeholder="Edit the content..."
                        ref={textareaRef}
                        required
                    />
                </form>
            </div>
        </div>
    );
};

export default EditArticle;
