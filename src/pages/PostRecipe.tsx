// import React, { useState, useEffect, useContext } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { addRecipe, updateRecipe, fetchRecipeById } from '../services/apiService';
// import { AuthContext } from '../context/AuthContext'; // Import AuthContext

// const PostRecipe: React.FC = () => {
//   const { recipeID } = useParams<{ recipeID: string }>();
//   const navigate = useNavigate();
//   const authContext = useContext(AuthContext); // Handle the possibility of null

//   if (!authContext) {
//     throw new Error('AuthContext is not provided. Ensure AuthProvider is wrapping your component tree.');
//   }

//   const { user } = authContext; // Safe to access user now

//   const [recipe, setRecipe] = useState({
//     title: '',
//     description: '',
//     ingredients: [''],
//     steps: [''],
//     tags: [''],
//     cuisine: '',
//     cookTime: 0,
//     prepTime: 0,
//     image: '',
//   });

//   useEffect(() => {
//     if (recipeID) {
//       const loadRecipe = async () => {
//         try {
//           const existingRecipe = await fetchRecipeById(recipeID);
//           setRecipe(existingRecipe); // Populate form for editing
//         } catch (error) {
//           console.error('Error loading recipe:', error);
//         }
//       };
//       loadRecipe();
//     }
//   }, [recipeID]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
//     setRecipe({ ...recipe, [field]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user || !user._id) {
//       alert('User is not authenticated!');
//       return;
//     }
//     try {
//       const recipeData = { ...recipe, createdBy: user._id }; // Add logged-in user's ID
//       if (recipeID) {
//         await updateRecipe(recipeID, recipeData);
//         alert('Recipe updated successfully!');
//       } else {
//         await addRecipe(recipeData);
//         alert('Recipe added successfully!');
//       }
//       navigate('/');
//     } catch (error) {
//       console.error('Error saving recipe:', error);
//       alert('Failed to save the recipe.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h1>{recipeID ? 'Edit Recipe' : 'Post a Recipe'}</h1>
//       <input
//         type="text"
//         placeholder="Title"
//         value={recipe.title}
//         onChange={(e) => handleChange(e, 'title')}
//         required
//       />
//       <textarea
//         placeholder="Description"
//         value={recipe.description}
//         onChange={(e) => handleChange(e, 'description')}
//       />
//       {/* Other input fields go here */}
//       <button type="submit">{recipeID ? 'Update Recipe' : 'Submit Recipe'}</button>
//     </form>
//   );
// };

// export default PostRecipe;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addRecipe, updateRecipe, fetchRecipeById } from '../services/apiService';

const PostRecipe: React.FC = () => {
  const { recipeID } = useParams<{ recipeID: string }>();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null'); // Fetch user from localStorage

  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: [''],
    steps: [''],
    tags: [''],
    cuisine: '',
    cookTime: 0,
    prepTime: 0,
    image: '',
  });

  // Check if the user is authenticated
  useEffect(() => {
    if (!user || !user.id) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [user, navigate]);

  useEffect(() => {
    if (recipeID) {
      const loadRecipe = async () => {
        try {
          const existingRecipe = await fetchRecipeById(recipeID);
          setRecipe(existingRecipe); // Populate form for editing
        } catch (error) {
          console.error('Error loading recipe:', error);
        }
      };
      loadRecipe();
    }
  }, [recipeID]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setRecipe({ ...recipe, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.id) {
      alert('User is not authenticated!');
      return;
    }
    try {
      const recipeData = { ...recipe, createdBy: user.id }; // Use `id` instead of `_id`
      if (recipeID) {
        await updateRecipe(recipeID, recipeData);
        alert('Recipe updated successfully!');
      } else {
        await addRecipe(recipeData);
        alert('Recipe added successfully!');
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Failed to save the recipe.');
    }
  };

  if (!user || !user.id) {
    return <p>Please log in to post a recipe. <a href="/login">Go to Login</a></p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{recipeID ? 'Edit Recipe' : 'Post a Recipe'}</h1>
      <input
        type="text"
        placeholder="Title"
        value={recipe.title}
        onChange={(e) => handleChange(e, 'title')}
        required
      />
      <textarea
        placeholder="Description"
        value={recipe.description}
        onChange={(e) => handleChange(e, 'description')}
      />
      {/* Other input fields go here */}
      <button type="submit">{recipeID ? 'Update Recipe' : 'Submit Recipe'}</button>
    </form>
  );
};

export default PostRecipe;
