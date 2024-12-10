import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRecipes } from '../services/apiService';
import { Recipe } from '../types/types';

const Home: React.FC = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate(); // Navigation

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const recipes = await fetchRecipes();
        setFeaturedRecipes(recipes.slice(0, 10)); // Use the first two recipes
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    loadRecipes();
  }, []);

  //const categories = ["Quick Meals", "Vegan", "Desserts", "Healthy"];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Featured Recipes</h1>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {featuredRecipes.map((recipe) => (
          <div key={recipe._id} style={{ width: '300px', cursor: "pointer" }}
            onClick={() => navigate(`/details/${recipe._id}`)}>
            <div className="card">
              <img
                src={`http://localhost:8080${recipe.image}`}
                className="card-img-top"
                alt={recipe.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.description}</p>
                <p className="card-text">
                  <small>Created by: {recipe.createdBy?.username || 'Unknown'}</small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <br />

      {/* <h2>Categories</h2>
      <div style={{ display: 'flex', gap: '10px' }}>
        {categories.map((category, index) => (
          <button className='btn btn-primary' key={index} style={{ padding: '10px 20px' }}>
            {category}
          </button>
        ))}
      </div> */}
    </div>
  );
};

export default Home;
