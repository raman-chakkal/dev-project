import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MyArticleCard.module.css'; // Import CSS module

const MyArticleCard = ({ article, onEdit, onDelete }) => {
    const navigate = useNavigate();

    if (!article || !article._id) {
        console.error('Invalid article:', article);
        return (
            <div className={styles["placeholder-card"]}>
                <p>Loading article...</p>
            </div>
        );
    }

    const handleView = () => {
        navigate(`/article/${article._id}`);
    };

    return (
        <div
            className={styles["article-card"]}
            onClick={handleView}
            role="button"
            tabIndex="0"
            onKeyPress={(e) => e.key === 'Enter' && handleView()}
            aria-label={`View article: ${article.title || 'Untitled Article'}`}
            style={{ cursor: 'pointer' }}
        >
            {/* Article Title */}
            <h3 className={styles["article-card-title"]}>
                {article.title || 'Untitled Article'}
            </h3>

            {/* Article Preview */}
            <p className={styles["article-card-preview"]}>
                {article.previewContent || article.content?.slice(0, 100) || 'No preview available.'}
            </p>

            {/* Action Buttons */}
            <div className={styles["article-card-buttons"]}>
                <button
                    className={`${styles["article-card-button"]} ${styles["edit"]}`}
                    onClick={(e) => {
                        e.stopPropagation(); // Prevents triggering handleView
                        onEdit?.(); // Safeguard for missing onEdit prop
                    }}
                    aria-label="Edit article"
                >
                    Edit
                </button>
                <button
                    className={`${styles["article-card-button"]} ${styles["delete"]}`}
                    onClick={(e) => {
                        e.stopPropagation(); // Prevents triggering handleView
                        onDelete?.(); // Safeguard for missing onDelete prop
                    }}
                    aria-label="Delete article"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default MyArticleCard;
