import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Search from './pages/Search';
import RecipeDetails from './pages/RecipeDetails';
import PostRecipe from './pages/PostRecipe';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import TeamGithub from './pages/TeamGithub';

const AppRouter: React.FC = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/team-github" element={<TeamGithub />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile/:userID" element={<Profile />} />
      <Route path="/details/:recipeID" element={<RecipeDetails />} />
      <Route path="/post-recipe" element={<PostRecipe />} />
      <Route path="/edit-recipe/:recipeID" element={<PostRecipe />} /> 
    </Routes>
  </Router>
);

export default AppRouter;
