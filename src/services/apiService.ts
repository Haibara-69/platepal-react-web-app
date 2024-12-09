import axios from 'axios';


// Base URL from environment variable for flexibility
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080', // Default backend base URL
});

// Fetch all recipes
export const fetchRecipes = async () => {
  try {
    const response = await api.get('/api/recipes');
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw new Error('Failed to fetch recipes.');
  }
};

// Fetch a single recipe by ID
export const fetchRecipeById = async (id: string) => {
  try {
    const response = await api.get(`/api/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw new Error('Failed to fetch recipe.');
  }
};

// Login with email and password
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/api/users/login', { email, password });
    console.log(response.data); 
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Invalid email or password.');
  }
};

// Logout the user
export const logout = async () => {
  try {
    const response = await api.post('/api/users/signout');
    return response.data;
  } catch (error) {
    console.error('Error during logout:', error);
    throw new Error('Failed to log out.');
  }
};

// Add a new recipe
export const addRecipe = async (recipe: any) => {
  try {
    const response = await api.post('/api/recipes', recipe);
    return response.data;
  } catch (error) {
    console.error('Error adding recipe:', error);
    throw new Error('Failed to add recipe.');
  }
};

// Update a recipe
export const updateRecipe = async (id: string, recipe: any) => {
  try {
    const response = await api.put(`/api/recipes/${id}`, recipe);
    return response.data;
  } catch (error) {
    console.error('Error updating recipe:', error);
    throw new Error('Failed to update recipe.');
  }
};

// Delete a recipe
export const deleteRecipe = async (id: string) => {
  try {
    const response = await api.delete(`/api/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw new Error('Failed to delete recipe.');
  }
};

// Register a new user
export const register = async (username: string, email: string, password: string) => {
  try {
    const response = await api.post('/api/users/register', { username, email, password });
    return response.data;
  } catch (error: any) {
    console.error('Error during registration:', error);
    throw new Error(error.response?.data?.message || 'Failed to register.');
  }
};
