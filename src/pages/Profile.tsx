// import React, { useState, useEffect } from 'react';
// import { fetchRecipes } from '../services/apiService'; // Assume filtering is backend handled
// import { Recipe } from '../types/types';
// import { fetchUserProfile, updateUserProfile } from '../services/apiService';

// const Profile: React.FC = () => {
//   const userID = 'u1'; // Example: Replace with actual user ID from context
//   const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
//   const [editMode, setEditMode] = useState(false);

//   useEffect(() => {
//     const loadUserRecipes = async () => {
//       try {
//         const allRecipes = await fetchRecipes();
//         setUserRecipes(allRecipes.filter((recipe: Recipe) => recipe.userID === userID));
//       } catch (error) {
//         console.error('Error fetching user recipes:', error);
//       }
//     };

//     loadUserRecipes();
//   }, [userID]);

//   return (
//     <div>
//       <h1>Your Recipes</h1>
//       {userRecipes.map((recipe) => (
//         <div key={recipe._id}>
//           <h3>{recipe.title}</h3>
//           <p>{recipe.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchUserProfile, fetchUserRecipes, updateUserProfile } from '../services/apiService';

const Profile: React.FC = () => {
  const { userID } = useParams<{ userID: string }>(); // Fetch the user ID from route parameters
  const [profile, setProfile] = useState({ id: '', username: '', email: '' });
  const [recipes, setRecipes] = useState<any[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userProfile = await fetchUserProfile(userID!); // Fetch user profile using userID
        setProfile(userProfile);
        const userRecipes = await fetchUserRecipes(userID!);
        setRecipes(userRecipes);
        setLoading(false);
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    };

    loadUserProfile();
  }, [userID]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = async () => {
    try {
      const updatedProfile = await updateUserProfile(userID!, profile);
      setProfile(updatedProfile);
      setEditMode(false);
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='container'>
      <h1>User Profile</h1>
      {editMode ? (
        <div>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={profile.username}
              onChange={handleInputChange}
            />
          </label>
          <br /><br />
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
            />
          </label>
          <br /><br />
          <button className='btn btn-primary' onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <p>Username: {profile.username}</p>
          <p>Email: {profile.email}</p>
          <button className='btn btn-primary' onClick={() => setEditMode(true)}>
            Edit
          </button>
        </div>
      )}
      <hr />
      <h2>{profile.username}'s Recipes</h2>
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {recipes.map((recipe) => (
            <div key={recipe._id} style={{ width: '300px', cursor: "pointer" }}
              onClick={() => navigate(`/details/${recipe._id}`)}>
              <div className='card'>
                <img
                  src={recipe.image}
                  className="card-img-top"
                  alt={recipe.title}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className='card-title'>{recipe.title}</h5><br />
                    <p>{recipe.description}</p>
                    <p>Tags: {recipe.tags?.join(", ")}</p>
                    <p>Cuisine: {recipe.cuisine || "N/A"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}
    </div>
  );
};

export default Profile;

