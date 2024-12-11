// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { login } from '../services/apiService'; // Replace with your API service

// const Login: React.FC = () => {
//   const [email, setEmail] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const userData = await login(email, password); // Call login API
//       console.log(userData); 
//       localStorage.setItem('user', JSON.stringify(userData)); // Store user in localStorage
//       const displayName = userData?.name?.trim() || userData?.username?.trim() || 'User';

//       alert(`Welcome, ${displayName}!`);
//       navigate('/'); // Redirect to the homepage
//     } catch (err) {
//       console.error('Login failed:', err);
//       setError('Invalid email or password');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
//       <h1>Login</h1>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required
//         style={{ marginBottom: '10px', display: 'block' }}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//         style={{ marginBottom: '10px', display: 'block' }}
//       />
//       <button type="submit">Login</button>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </form>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/apiService'; // Replace with your API service

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await login(email, password); // Call login API
      console.log(userData); 
      localStorage.setItem('user', JSON.stringify(userData)); // Store user in localStorage
      //const displayName = userData?.name?.trim() || userData?.username?.trim() || 'User';

      //alert(`Welcome, ${displayName}!`);
      navigate(`/profile/${userData.id}`); // Redirect to the Profile page with user ID
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ marginBottom: '10px', display: 'block' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ marginBottom: '10px', display: 'block' }}
      />
      <button className='btn btn-primary' type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Login;
