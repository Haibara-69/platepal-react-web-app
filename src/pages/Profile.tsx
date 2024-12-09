import React, { useState, useEffect } from 'react';
import { fetchRecipes } from '../services/apiService'; // Assume filtering is backend handled
import { Recipe } from '../types/types';

const Profile: React.FC = () => {
  const userID = 'u1'; // Example: Replace with actual user ID from context
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const loadUserRecipes = async () => {
      try {
        const allRecipes = await fetchRecipes();
        setUserRecipes(allRecipes.filter((recipe: Recipe) => recipe.userID === userID));
      } catch (error) {
        console.error('Error fetching user recipes:', error);
      }
    };

    loadUserRecipes();
  }, [userID]);

  return (
    <div>
      <h1>Your Recipes</h1>
      {userRecipes.map((recipe) => (
        <div key={recipe._id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Profile;
