
// import React, { useState } from 'react';
// import { register } from '../services/apiService';

// const Register: React.FC = () => {
//     const [formData, setFormData] = useState({ username: '', email: '', password: '' });
//     const [error, setError] = useState<string | null>(null);
//     const [success, setSuccess] = useState<string | null>(null);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError(null);
//         setSuccess(null);

//         try {
//             await register(formData.username, formData.email, formData.password);
//             setSuccess('Registration successful! You can now log in.');
//         } catch (error: any) {
//             console.error('Error during registration:', error);
//             setError(error.message || 'An error occurred during registration.');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <h1>Register</h1>
//             {error && <div style={{ color: 'red' }}>{error}</div>}
//             {success && <div style={{ color: 'green' }}>{success}</div>}
//             <input
//                 type="text"
//                 placeholder="Username"
//                 value={formData.username}
//                 onChange={(e) => setFormData({ ...formData, username: e.target.value })}
//                 required
//             />
//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 required
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 required
//             />
//             <button type="submit">Register</button>
//         </form>
//     );
// };

// export default Register;
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
            setFormData({ username: '', email: '', password: '' });
        } catch (error: any) {
            console.error('Error during registration:', error);
            setError(error.message || 'An error occurred during registration.');
        }
    };

    const containerStyle = {
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '4px',
        border: '1px solid #ccc',
        boxSizing: 'border-box' as const,
    };

    const buttonStyle = {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    const headerStyle = {
        textAlign: 'center' as const,
        marginBottom: '20px',
    };

    const messageStyle = (color: string) => ({
        color,
        textAlign: 'center' as const,
        margin: '10px 0',
    });

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>Register</h1>
            {error && <div style={messageStyle('red')}>{error}</div>}
            {success && <div style={messageStyle('green')}>{success}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                    style={inputStyle}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    style={inputStyle}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>Register</button>
            </form>
        </div>
    );
};

export default Register;


