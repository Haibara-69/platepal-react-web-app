import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addRecipe, updateRecipe, fetchRecipeById } from '../services/apiService';

const PostRecipe: React.FC = () => {
  const { recipeID } = useParams<{ recipeID: string }>();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null'); // Fetch user from localStorage

  const [recipe, setRecipe] = useState<{
    title: string;
    description: string;
    ingredients: string[];
    steps: string[];
    tags: string[];
    cuisine: string;
    cookTime: number;
    prepTime: number;
    image: string | File; // Allow string (URL) or File object
  }>({
    title: '',
    description: '',
    ingredients: [''],
    steps: [''],
    tags: [''],
    cuisine: '',
    cookTime: 0,
    prepTime: 0,
    image: '', // Default is an empty string
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
    if (!recipe.title || !recipe.ingredients.length || !recipe.steps.length) {
        alert('Please fill in all required fields: title, ingredients, and steps.');
        return;
    }
    try {
      console.log("User ID being sent:", user.id);
        // Create a FormData object
        const formData = new FormData();
        formData.append('title', recipe.title);
        formData.append('description', recipe.description);
        formData.append('cuisine', recipe.cuisine);
        formData.append('cookTime', recipe.cookTime.toString());
        formData.append('prepTime', recipe.prepTime.toString());
        formData.append('ingredients', JSON.stringify(recipe.ingredients)); // Convert array to JSON
        formData.append('steps', JSON.stringify(recipe.steps)); // Convert array to JSON
        formData.append('tags', JSON.stringify(recipe.tags)); // Convert array to JSON
        formData.append('createdBy', user.id); // Include createdBy field

        if (recipe.image && typeof recipe.image !== 'string') {
            formData.append('image', recipe.image); // Append file if image is a File object
        }
        if (recipeID) {
            await updateRecipe(recipeID, formData);
            alert('Recipe updated successfully!');
        } else {
            await addRecipe(formData);
            alert('Recipe added successfully!');
        }
        navigate('/');
    } catch (error) {
        console.error('Error saving recipe:', error);
        alert('Failed to save the recipe.');
    }
  };

  const handleCancel = () => {
    if (recipeID) {
      navigate(`/details/${recipeID}`); 
    } else {
      navigate('/'); 
    }
  };

  if (!user || !user.id) {
    return <p>Please log in to post a recipe. <a href="/login">Go to Login</a></p>;
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h1>{recipeID ? 'Edit Recipe' : 'Post a Recipe'}</h1>
    
        {/* Title */}
        <label>Title:</label>
        <br />
        <input
          type="text"
          style={{ width: '60%', fontSize: '16px' }}
          placeholder="Title"
          value={recipe.title}
          onChange={(e) => handleChange(e, 'title')}
          required
        />
        <br /><br />
    
        {/* Description */}
        <label>Description:</label>
        <br />
        <textarea
          style={{ width: '60%', height: "100px", fontSize: '16px' }}
          placeholder="Description"
          value={recipe.description}
          onChange={(e) => handleChange(e, 'description')}
        />
        <br /><br />
    
        {/* Ingredients */}
        <label>Ingredients (Add each ingredient on a new line):</label>
        <br />
        <textarea
          style={{ width: '60%', height: "100px", fontSize: '16px' }}
          placeholder="Enter ingredients"
          value={recipe.ingredients.join('\n')}
          onChange={(e) =>
            setRecipe({
              ...recipe,
              ingredients: e.target.value.split('\n'), // Split by line breaks
            })
          }
          required
        />
        <br /><br />
    
        {/* Steps */}
        <label>Steps (Add each step on a new line):</label>
        <br />
        <textarea
          style={{ width: '60%', height: "100px", fontSize: '16px' }}
          placeholder="Enter cooking steps"
          value={recipe.steps.join('\n')}
          onChange={(e) =>
            setRecipe({
              ...recipe,
              steps: e.target.value.split('\n'), // Split by line breaks
            })
          }
          required
        />
    <br /><br />
        {/* Cuisine */}
        <label>Cuisine:</label>
        <br />
        <input
          type="text"
          style={{ width: '60%', fontSize: '16px' }}
          placeholder="Cuisine (e.g., Italian, Indian)"
          value={recipe.cuisine}
          onChange={(e) => handleChange(e, 'cuisine')}
        />
        <br /><br />
    
        {/* Tags */}
        <label>Tags (Comma-separated):</label>
        <br />
        <input
          type="text"
          style={{ width: '60%', fontSize: '16px' }}
          placeholder="Tags (e.g., Dinner, Pasta)"
          value={recipe.tags.join(',')}
          onChange={(e) =>
            setRecipe({
              ...recipe,
              tags: e.target.value.split(',').map((tag) => tag.trim()), // Split by commas and trim
            })
          }
        />
        <br /><br />
    
        {/* Cook Time */}
        <label>Cook Time:</label>
        <br />
        <input
          type="number"
          placeholder="Cook Time (minutes)"
          value={recipe.cookTime}
          onChange={(e) => handleChange(e, 'cookTime')}
        />
        <br /><br />
    
        {/* Prep Time */}
        <label>Prep Time:</label>
        <br />
        <input
          type="number"
          placeholder="Prep Time (minutes)"
          value={recipe.prepTime}
          onChange={(e) => handleChange(e, 'prepTime')}
        />
        <br /><br />
    
        {/* Image */}
        <label>Upload Image:</label>
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            setRecipe({
              ...recipe,
              image: e.target.files?.[0] || '', // Save the file object
            })
          }
        />
        <br /><br /><br />
    
        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-primary" type="submit">
            {recipeID ? 'Update Recipe' : 'Submit Recipe'}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostRecipe;
