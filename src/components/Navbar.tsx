// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// const Navbar: React.FC = () => {
//   const authContext = useContext(AuthContext);

//   if (!authContext) {
//     return null; // Context not available
//   }

//   const { isAuthenticated, user, logout } = authContext;

//   const handleLogout = async () => {
//     try {
//       await logout(); // Call the logout function in context
//       alert('You have been logged out.');
//     } catch (error) {
//       console.error('Logout failed:', error);
//     }
//   };

//   return (
//     <nav>
//       <Link to="/">Home</Link>
//       <Link to="/search">Search</Link>
//       {isAuthenticated && user?.role === 'Cook' && <Link to="/post-recipe">Post Recipe</Link>}
//       {isAuthenticated && user?.role === 'Viewer' && <Link to="/favorites">Favorites</Link>}
//       {!isAuthenticated ? (
//         <Link to="/login">Login</Link>
//       ) : (
//         <button onClick={handleLogout}>Logout</button>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || 'null'); // Fetch user from localStorage

    const handleLogout = () => {
        localStorage.removeItem('user'); // Clear user data
        alert('You have been logged out.');
        navigate('/login'); // Redirect to login page
    };

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/search">Search</Link>
            {!user ? (
                <>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </>
            ) : (
                <>
                    {user.role === 'Cook' && <Link to="/post-recipe">Post Recipe</Link>}
                    {user.role === 'Viewer' && <Link to="/favorites">Favorites</Link>}
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </nav>
    );
};

export default Navbar;

