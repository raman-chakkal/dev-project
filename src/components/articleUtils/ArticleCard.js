import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ArticleCard.module.css'; // Import CSS module

const ArticleCard = ({ article }) => {
    // Ensure article data is provided
    if (!article) {
        console.error('Article data is missing!');
        return null; // Do not render anything if article data is missing
    }

    return (
        <div className={styles["article-card"]}>
            <Link
                to={`/article/${article._id}`}
                className={styles["article-card-link"]}
                aria-label={`Read more about: ${article.title || "Untitled Article"}`}
            >
                {/* Article Title */}
                <h3 className={styles["article-card-title"]}>
                    {article.title || "Untitled Article"}
                </h3>

                {/* Preview Content */}
                <p className={styles["article-card-preview"]}>
                    {article.content
                        ? article.content.length > 100
                            ? `${article.content.slice(0, 100)}...`
                            : article.content
                        : "No content available."}
                </p>

                {/* Author Information */}
                <p className={styles["article-card-author"]}>
                    <strong>Author:</strong> {article.author?.name || "Unknown"}
                </p>
            </Link>
        </div>
    );
};

export default ArticleCard;
