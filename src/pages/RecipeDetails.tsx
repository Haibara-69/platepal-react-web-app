// import React, { useState, useEffect } from 'react';
// import { useParams} from 'react-router-dom';
// import recipes from '../database/recipes.json';
// import { Recipe } from '../types/types';
// import { fetchRecipeById } from '../services/apiService';

// const RecipeDetails: React.FC = () => {
//   const { recipeID } = useParams<{ recipeID: string }>();
//   const [recipe, setRecipe] = useState<Recipe | null>(null);


//   useEffect(() => {
//     const loadRecipe = async () => {
//       try {
//         const fetchedRecipe = await fetchRecipeById(recipeID!);
//         setRecipe(fetchedRecipe);
//       } catch (error) {
//         console.error('Error fetching recipe details:', error);
//       }
//     };

//     loadRecipe();
//   }, [recipeID]);

//   if (!recipe) return <p>Recipe not found.</p>;

//   return (
//     <div>
//       <h1>{recipe.title}</h1>
//       <p>{recipe.description}</p>
//       <h2>Ingredients</h2>
//       <ul>
//         {recipe.ingredients.map((ingredient, index) => (
//           <li key={index}>{ingredient}</li>
//         ))}
//       </ul>
//       <h2>Steps</h2>
//       <ol>
//         {recipe.steps.map((step, index) => (
//           <li key={index}>{step}</li>
//         ))}
//       </ol>
//       <h2>Tags</h2>
//       <p>{recipe.tags.join(', ')}</p>
//     </div>
//   );
// };

// export default RecipeDetails;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchRecipes, deleteRecipe } from '../services/apiService';
import { Recipe } from '../types/types';

const RecipeDetails: React.FC = () => {
  const { recipeID } = useParams<{ recipeID: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
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
    if (!recipeID) {
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
    <div>
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
      <button onClick={() => navigate(`/edit-recipe/${recipe._id}`)}>
        Edit Recipe
      </button>
      <button onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>
        Delete Recipe
      </button>
    </div>
  );
};

export default RecipeDetails;


