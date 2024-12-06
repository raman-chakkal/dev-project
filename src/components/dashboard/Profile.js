import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile } from '../../utils/api'; // Centralized API
import styles from './Profile.module.css';

const Profile = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch profile data when the component mounts
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getUserProfile();
                if (!profileData || !profileData.name) {
                    throw new Error('Profile data is incomplete.');
                }
                setFormData({
                    name: profileData.name,
                    email: profileData.email,
                });
            } catch (err) {
                console.error('Error fetching profile:', err.message);
                setError(err.message || 'Failed to load profile.');
            } finally {
                setLoading(false); // Stop loading state
            }
        };

        fetchProfile();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const updatedData = await updateUserProfile(formData);
            setFormData(updatedData); // Update formData with new data
            setIsEditing(false);
        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Failed to update profile. Please try again.');
        }
    };

    // Show loading state
    if (loading) {
        return <p className={styles.loading}>Loading profile...</p>;
    }

    // Render the profile UI
    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Profile</h2>
            {error && <p className={styles.error}>{error}</p>}

            {isEditing ? (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.saveButton}>
                            Save Changes
                        </button>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className={styles.profileDetails}>
                    <p>
                        <strong>Name:</strong> {formData.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {formData.email}
                    </p>
                    <button
                        onClick={() => setIsEditing(true)}
                        className={styles.editButton}
                    >
                        Edit Profile
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;
