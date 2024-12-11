// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { fetchRecipes } from '../services/apiService';
// import { Recipe } from '../types/types';

// const Home: React.FC = () => {
//   const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([]);
//   const navigate = useNavigate(); // Navigation

//   useEffect(() => {
//     const loadRecipes = async () => {
//       try {
//         const recipes = await fetchRecipes();
//         setFeaturedRecipes(recipes.slice(0, 10)); // Use the first two recipes
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//       }
//     };

//     loadRecipes();
//   }, []);


//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Featured Recipes Await – Dive In Daily!</h1>
//      <br />
      
//       <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
//         {featuredRecipes.map((recipe) => (
//           <div key={recipe._id} style={{ width: '300px', cursor: "pointer" }}
//             onClick={() => navigate(`/details/${recipe._id}`)}>
//             <div className="card">
//               <img
//                 src={`http://localhost:8080${recipe.image}`}
//                 className="card-img-top"
//                 alt={recipe.title}
//                 style={{ width: '100%', height: '200px', objectFit: 'cover' }}
//               />
//               <div className="card-body">
//                 <h5 className="card-title">{recipe.title}</h5>
//                 <p className="card-text">{recipe.description}</p>
//                 <p className="card-text">
//                   <small>Created by: {recipe.createdBy?.username || 'Unknown'}</small>
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <br />

//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect, CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRecipes } from '../services/apiService';
import { Recipe } from '../types/types';

const Home: React.FC = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const recipes = await fetchRecipes();
        setFeaturedRecipes(recipes.slice(0, 10)); // Fetch top 10 recipes
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    loadRecipes();
  }, []);

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={headingStyle}>Discover Delicious Recipes Every Day!</h1>
        <p style={subheadingStyle}>Explore recipes from around the world shared by our amazing community.</p>
      </header>

      <div style={gridContainerStyle}>
        {featuredRecipes.map((recipe) => (
          <div
            key={recipe._id}
            style={recipeCardStyle}
            onClick={() => navigate(`/details/${recipe._id}`)}
          >
            <img
              src={`http://localhost:8080${recipe.image}`}
              alt={recipe.title}
              style={imageStyle}
            />
            <div style={cardContentStyle}>
              <h5 style={cardTitleStyle}>{recipe.title}</h5>
              <p style={cardDescriptionStyle}>
                {recipe.description?.slice(0, 80)}...
              </p>
              <p style={cardFooterStyle}>
                <small>By: {recipe.createdBy?.username || 'Unknown'}</small>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styles
const containerStyle: CSSProperties = {
  padding: '40px',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f9f9f9',
  color: '#333',
};

const headerStyle: CSSProperties = {
  textAlign: 'center' as const, // Explicitly set to match expected `TextAlign` type
  marginBottom: '40px',
};

const headingStyle: CSSProperties = {
  fontSize: '2.5rem',
  color: '#2c3e50',
  marginBottom: '10px',
};

const subheadingStyle: CSSProperties = {
  fontSize: '1.25rem',
  color: '#34495e',
};

const gridContainerStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '20px',
};

const recipeCardStyle: CSSProperties = {
  cursor: 'pointer',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  transition: 'transform 0.2s, box-shadow 0.2s',
};

const imageStyle: CSSProperties = {
  width: '100%',
  height: '300px',
  objectFit: 'cover' as const, // Explicitly set to match expected `ObjectFit` type
};

const cardContentStyle: CSSProperties = {
  padding: '15px',
};

const cardTitleStyle: CSSProperties = {
  fontSize: '1.25rem',
  fontWeight: 'bold',
  marginBottom: '10px',
  color: '#2c3e50',
};

const cardDescriptionStyle: CSSProperties = {
  fontSize: '1rem',
  color: '#7f8c8d',
  marginBottom: '10px',
};

const cardFooterStyle: CSSProperties = {
  fontSize: '0.875rem',
  color: '#95a5a6',
};

export default Home;
