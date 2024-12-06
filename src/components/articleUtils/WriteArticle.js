import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WriteArticle.module.css'; // Scoped CSS import
import { createArticle } from '../../utils/api'; // Import the centralized API function

const WriteArticle = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const textareaRef = useRef(null);

    // Adjust textarea height dynamically
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [formData.content]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.title.trim().length < 5 || formData.content.trim().length < 20) {
            setError('Title must be at least 5 characters and content at least 20 characters long.');
            return;
        }

        setIsLoading(true);
        try {
            await createArticle(formData); // Use the centralized API function
            navigate('/dashboard/my-articles'); // Redirect to "My Articles" page
        } catch (err) {
            setError(err || 'Error submitting article. Please try again.');
            console.error('Error creating article:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles["write-article-layout"]}>
            <div className={styles["button-header"]}>
                <button
                    className={styles["publish-button"]}
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? 'Publishing...' : 'Publish'}
                </button>
            </div>
            {/* Writing Area */}
            <div className={styles["write-article-container"]}>
                {error && <p className={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={styles["write-article-title"]}
                        placeholder="Title..."
                        required
                    />
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        className={styles["write-article-content"]}
                        placeholder="Content..."
                        ref={textareaRef}
                        required
                    />
                </form>
            </div>
        </div>
    );
};

export default WriteArticle;
