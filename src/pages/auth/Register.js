import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../utils/api'; // Import the centralized register API function
import styles from './Auth.module.css'; // Importing CSS Module

const Register = ({ login }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Front-end validation
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setError(null); // Clear previous errors

        try {
            const { token } = await register(formData); // Use the centralized `register` function
            localStorage.setItem('token', token); // Store the token
            login(); // Call login callback
            navigate('/dashboard'); // Redirect to dashboard
        } catch (err) {
            console.error(err);
            setError(err || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className={styles["auth-container"]}>
            <h2 className={styles.heading}>Register</h2>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className={styles.input}
                    required
                />
                <button type="submit" className={styles.button}>Register</button>
            </form>
            <p className={styles.register}>
                Already have an account? <a href="/login" className={styles.link}>Login here</a>
            </p>
        </div>
    );
};

export default Register;
