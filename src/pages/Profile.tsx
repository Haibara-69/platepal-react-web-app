import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchUserProfile,
  fetchUserRecipes,
  updateUserProfile,
  fetchAllUsers,
  addUser,
  deleteUser,
  editUser, // Import the edit user function
} from '../services/apiService';

const Profile: React.FC = () => {
  const { userID } = useParams<{ userID: string }>();
  const [profile, setProfile] = useState({ id: '', username: '', email: '', role: '',password: '',});
  const [recipes, setRecipes] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [newUser, setNewUser] = useState({ username: '', email: '', password: '', role: 'Cook' });
  const [editMode, setEditMode] = useState(false); // Store the ID of the user being edited
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'profile' | 'allUsers'>('profile'); // State to toggle views
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userProfile = await fetchUserProfile(userID!);
        setProfile(userProfile);
        const userRecipes = await fetchUserRecipes(userID!);
        setRecipes(userRecipes);

        if (userProfile.role === 'Admin') {
          const users = await fetchAllUsers();
          setAllUsers(users);
        }

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
    console.log('Saving profile:', profile); 

    try {
      const updatedProfile = await updateUserProfile(userID!, profile);
      setProfile(updatedProfile);
      setEditMode(false);
    } catch (error) {
      console.error('Error saving user profile:', error);
    }
  };

  const handleNewUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = async () => {
    try {
      const addedUser = await addUser(newUser);
      setAllUsers([...allUsers, addedUser]); // Add new user to the list
      setNewUser({ username: '', email: '', password: '', role: 'Cook' }); // Reset form
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      setAllUsers(allUsers.filter(user => user._id !== userId)); // Remove user from the list
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, userId: string) => {
    const { name, value } = e.target;
    setAllUsers(allUsers.map(user => (user._id === userId ? { ...user, [name]: value } : user)));
  };

  const handleEditUserSave = async (userId: string) => {
    const userToUpdate = allUsers.find(user => user._id === userId);
    if (!userToUpdate) return;

    try {
      const updatedUser = await editUser(userId, userToUpdate);
      setAllUsers(allUsers.map(user => (user._id === userId ? updatedUser : user)));
      setEditMode(false); // Exit edit mode
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='container'>
      <div className="d-flex justify-content-between mb-4">
        <button
          className={`btn ${view === 'profile' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setView('profile')}
        >
          My Profile
        </button>
        {profile.role === 'Admin' && (
          <button
            className={`btn ${view === 'allUsers' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setView('allUsers')}
          >
            All Users
          </button>
        )}
      </div>

      {view === 'profile' && (
        <div>
          <h1>Profile</h1>
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
              <label>
                Role:
                <input
                  type="text"
                  name="role"
                  value={profile.role}
                  onChange={handleInputChange}
                />
              </label>
              <br /><br />
              <label>
                  Password:
                  <input
                    type="password"
                    name="password"
                    value={profile.password || ''} // Ensure `password` is handled properly
                    onChange={handleInputChange}
                  />
                </label>
                <br /><br />
              <button className='btn btn-primary' onClick={handleSave}>Save</button>
              <button
                  className='btn btn-secondary'
                  style={{ marginLeft: '10px' }}
                  onClick={() => setEditMode(false)} 
                >
                  Cancel
                </button>
            
            </div>
          ) : (
            <div>
              <p>Username: {profile.username}</p>
              <p>Email: {profile.email}</p>
              <p>Role: {profile.role}</p>
              <p>Password: ********</p>
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
      )}


      {view === 'allUsers' && (
        <div>
          <h1>All Users</h1>
          <div className="mb-4">
            <h3>Add New User</h3>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={newUser.username}
              onChange={handleNewUserChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleNewUserChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={newUser.password}
              onChange={handleNewUserChange}
            />
            <select
              name="role"
              value={newUser.role}
              onChange={handleNewUserChange}
            >
              <option value="Cook">Cook</option>
              <option value="Viewer">Viewer</option>
              <option value="Admin">Admin</option>
            </select>
            <button className="btn btn-success" onClick={handleAddUser}>
              Add User
            </button>
          </div>
          {allUsers.length === 0 ? (
            <p>No other users found.</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map(user => (
                  <tr key={user._id}>
                    {editMode === user._id ? (
                      <>
                        <td>
                          <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={e => handleEditUserChange(e, user._id)}
                          />
                        </td>
                        <td>
                          <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={e => handleEditUserChange(e, user._id)}
                          />
                        </td>
                        <td>
                          <select
                            name="role"
                            value={user.role}
                            onChange={e => handleEditUserChange(e, user._id)}
                          >
                            <option value="Cook">Cook</option>
                            <option value="Viewer">Viewer</option>
                            <option value="Admin">Admin</option>
                          </select>
                        </td>
                        <td>
                          <button className="btn btn-success btn-sm" onClick={() => handleEditUserSave(user._id)}>
                            Save
                          </button>
                          <button className="btn btn-secondary btn-sm" onClick={() => setEditMode(false)}>
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <button className="btn btn-warning btn-sm" onClick={() => setEditMode(user._id)}>
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;


