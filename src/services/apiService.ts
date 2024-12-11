import axios from 'axios';
// const getToken = () => localStorage.getItem('token');
const getToken = () => {
  const token = localStorage.getItem("token");
  console.log("Token for API requests:", token);
  if (!token) {
    console.warn("No token found in storage");
  }
  return token;
};

// Create an Axios instance
export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080',
});

// Add a request interceptor to attach the token to every request
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    console.log('Token:', token); // Log the token here
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.warn("No token found in localStorage");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const addLike = async (userId: string, recipeId: string) => {
  const response = await api.post("/api/likes", { userId, recipeId });
  return response.data;
};

export const removeLike = async (userId: string, recipeId: string) => {
  const response = await api.delete("/api/likes", {
    data: { userId, recipeId },
  });
  return response.data;
};

export const hasLikedRecipe = async (userId: string, recipeId: string) => {
  const response = await api.get("/api/likes/status", {
    params: { userId, recipeId },
  });
  return response.data;
};

export const countLikesByRecipe = async (recipeId: string) => {
  const response = await api.get(`/api/likes/recipe/${recipeId}`);
  return response.data.count;
};

export const fetchFavoriteRecipes = async (userId: string) => {
  try {
    const response = await api.get(`/api/users/${userId}/favorites`);
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite recipes:", error);
    throw new Error("Failed to fetch favorite recipes.");
  }
};

export const fetchComments = async (recipeId: string) => {
  const response = await api.get(`/api/comments/recipe/${recipeId}`);
  return response.data;
};

export const addComment = async (userId: string, recipeId: string, text: string, role: string) => {
  const response = await api.post("/api/comments", { userId, recipeId, text, role });
  return response.data;
};

export const updateComment = async (commentId: string, userId: string, text: string) => {
  try {
    const response = await api.put(`/api/comments/${commentId}`, { userId, text });
    return response.data;
  } catch (error: any) {
    console.error("Error updating comment:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to update comment.");
  }
};

export const deleteComment = async (commentId: string, userId: string, role: string) => {
  const response = await api.delete(`/api/comments/${commentId}`, {
    data: { userId, role },
  });
  return response.data;
};

export const fetchUserRecipes = async (userId: string) => {
  try {
    const response = await api.get(`/api/recipes/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user recipes:", error);
    throw new Error("Failed to fetch user recipes.");
  }
};

export const searchRecipes = async (query: string, tag: string, category: string) => {
  try {
      const params = { query, tag, category };
      const response = await api.get('/api/recipes/search', { params });
      return response.data;
  } catch (error) {
      console.error('Error searching recipes:', error);
      throw new Error('Failed to search recipes.');
  }
};

export const searchUsers = async (username: string, currentUserId: string) => {
  try {
    const response = await api.get("/api/users/search", {
      params: { username, currentUserId },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching users:", error);
    throw new Error("Failed to search users.");
  }
};



// Fetch all recipes
export const fetchRecipes = async () => {
  try {
    const response = await api.get('/api/recipes');
    console.log('Recipes fetched:', response.data); 
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
    const { token, user } = response.data; // Destructure response

    if (token) {
      localStorage.setItem('token', token); // Save token to localStorage
      localStorage.setItem('user', JSON.stringify(user)); // Save user details
      console.log('Token saved after login:', token); // Log the token
    } else {
      throw new Error('No token returned from login.');
    }

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

export const addRecipe = async (recipe: FormData) => {
  try {
    const response = await api.post('/api/recipes', recipe, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error adding recipe:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to add recipe.');
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

// Fetch user profile by ID
export const fetchUserProfile = async (id: string) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}"); // Get user from localStorage
  if (!user.id) {
    throw new Error("No user ID found in localStorage.");
  }
  try {
    const response = await api.get(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw new Error('Failed to fetch user profile.');
  }
};

// Update user profile
export const updateUserProfile = async (
  id: string,
  profileData: { username: string; email: string }
) => {
  try {
    const response = await api.put(`/api/users/${id}`, profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw new Error('Failed to update user profile.');
  }
};

// Fetch current user profile
export const fetchCurrentUserProfile = async () => {
  try {
    const response = await api.get('/api/users/profile'); // Call the updated backend route
    return response.data;
  } catch (error) {
    console.error('Error fetching current user profile:', error);
    throw new Error('Failed to fetch current user profile.');
  }
};

export const fetchAllUsers = async () => {
  try {
    const response = await api.get('/api/users'); // Backend route to fetch all users
    return response.data;
  } catch (error: any) {
    console.error('Error fetching all users:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch all users.');
  }
};

export const addUser = async (userData: any) => {
  try {
    const response = await api.post('/api/users', userData);
    return response.data;
  } catch (error: any) {
    console.error('Error adding user:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to add user.');
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await api.delete(`/api/users/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error deleting user:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to delete user.');
 
  }
};

export const editUser = async (userId: string, userData: any) => {
  try {
    const response = await api.put(`/api/users/${userId}`, userData);
    return response.data;
  } catch (error: any) {
    console.error('Error updating user:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to update user.');
  }
};


