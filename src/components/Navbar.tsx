

// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar: React.FC = () => {
//     const navigate = useNavigate();
//     const user = JSON.parse(localStorage.getItem('user') || 'null'); // Fetch user from localStorage

//     const handleLogout = () => {
//         localStorage.removeItem('user'); // Clear user data
//         alert('You have been logged out.');
//         navigate('/login'); // Redirect to login page
//     };

//     return (
//         <nav>
//             <Link to="/">Home</Link>
//             <Link to="/search">Search</Link>
            
//             {!user ? (
//                 <>
//                     <Link to="/register">Register</Link>
//                     <Link to="/login">Login</Link>
//                 </>
//             ) : (
//                 <>
//                     {user.role === 'Cook' && <Link to="/post-recipe">Post Recipe</Link>}
//                     {user.role === 'Viewer' && <Link to="/favorites">Favorites</Link>}
//                     <button onClick={handleLogout}>Logout</button>
//                 </>
//             )}
//             <Link to="/team-github">Team & GitHub</Link>
//         </nav>
//     );
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
                    <Link to={`/profile/${user.id}`}>Profile</Link> {/* Add Profile link */}
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
            <Link to="/team-github">Team & GitHub</Link>
        </nav>
    );
};

export default Navbar;
