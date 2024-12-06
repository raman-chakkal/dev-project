import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../utils/api'; // Adjust the import path if necessary
import styles from './Auth.module.css'; // Importing CSS Module

const Login = ({ login: loginCallback }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError('Both fields are required.');
            return;
        }

        try {
            const { token } = await login(formData); // Use the `login` function from the centralized API
            localStorage.setItem('token', token); // Store JWT
            loginCallback(); // Call the login function passed as prop
            navigate('/dashboard'); // Redirect to dashboard
        } catch (err) {
            setError(err || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className={styles["auth-container"]}>
            <h2 className={styles.heading}>Login</h2>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <form onSubmit={handleSubmit} noValidate className={styles.form}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-label="Email Address"
                    className={styles.input}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    aria-label="Password"
                    className={styles.input}
                    required
                />
                <button type="submit" className={styles.button}>Login</button>
            </form>
            <p className={styles.register}>
                Don't have an account? <a href="/register" className={styles.link}>Register here</a>
            </p>
        </div>
    );
};

export default Login;
