export interface User {
    userID: string;
    name: string;
    email: string;
    role: 'Cook' | 'Viewer';
    followers: number;
    following: number;
  }
  
  export interface Recipe {
    _id: string; // Use _id instead of recipeID
    userID: string;
    title: string;
    description: string;
    ingredients: string[];
    steps: string[];
    tags: string[];
    cuisine: string;
    createdAt: string; // Renamed to match the backend
    image: string;
  }
  