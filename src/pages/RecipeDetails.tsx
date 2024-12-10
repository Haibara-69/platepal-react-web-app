
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRecipes, deleteRecipe } from '../services/apiService';
import { Recipe } from '../types/types';

const RecipeDetails: React.FC = () => {
  const { recipeID } = useParams<{ recipeID: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  useEffect(() => {
    if (!recipeID || recipeID.length !== 24) {
      console.error('Invalid recipe ID:', recipeID);
      alert('Invalid recipe ID');
      return;
    }

    const loadRecipe = async () => {
      try {
        const recipes = await fetchRecipes();
        const selectedRecipe = recipes.find((r: any) => r._id === recipeID) || null;
        setRecipe(selectedRecipe);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    loadRecipe();
  }, [recipeID]);


  const handleDelete = async () => {
    if (!recipeID || recipeID.trim() === '' || recipeID.length !== 24) {
      alert('Invalid recipe ID');
      return;
    }
    try {
      await deleteRecipe(recipeID);
      alert('Recipe deleted successfully');
      navigate('/');
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert('Failed to delete the recipe. Please try again.');
    }
  };

  if (!recipe) return <p>Recipe not found.</p>;

  return (
    <div className='container'>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Steps</h2>
      <ol>
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <h2>Tags</h2>
      <p>{recipe.tags.join(', ')}</p>
      {currentUser?.id === recipe.createdBy?._id && (
        <div>
          <button className='btn btn-success' 
          onClick={() => {
            if (!recipe._id || recipe._id.length !== 24) {
              alert('Invalid recipe ID');
              return;
            }
          navigate(`/edit-recipe/${recipe._id}`);
        }}>
            Edit Recipe
          </button>
          <button className='btn btn-danger' onClick={handleDelete} style={{ marginLeft: '10px', color: 'white' }}>
            Delete Recipe
          </button>
          </div>
      )}
    </div>
  );
};

export default RecipeDetails;
