import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteAccount } from '../../utils/api'; // Import centralized API function
import styles from './Settings.module.css'; // Scoped CSS import

const Settings = () => {
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Function to handle account deletion
    const handleDeleteAccount = async () => {
        if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            setIsLoading(true);
            try {
                await deleteAccount(); // Call the centralized API function
                alert("Account deleted successfully.");
                localStorage.removeItem("token"); // Clear token
                navigate("/login", { replace: true }); // Redirect to login
            } catch (error) {
                console.error("Error deleting account:", error);
                alert(error || "Error deleting account. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Settings</h2>
            <div className={styles.actions}>
                <button
                    onClick={() => setConfirmDelete(!confirmDelete)}
                    className={confirmDelete ? styles.cancelButton : styles.deleteButton}
                >
                    {confirmDelete ? 'Cancel' : 'Delete Account'}
                </button>
                {confirmDelete && (
                    <button
                        onClick={handleDeleteAccount}
                        disabled={isLoading}
                        className={styles.confirmButton}
                    >
                        {isLoading ? 'Deleting...' : 'Confirm Deletion'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Settings;
