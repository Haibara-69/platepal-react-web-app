
import React, { useState } from 'react';
import { register } from '../services/apiService';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            await register(formData.username, formData.email, formData.password);
            setSuccess('Registration successful! You can now log in.');
        } catch (error: any) {
            console.error('Error during registration:', error);
            setError(error.message || 'An error occurred during registration.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {success && <div style={{ color: 'green' }}>{success}</div>}
            <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
            />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;

