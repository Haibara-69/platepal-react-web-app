import React, { createContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { _id: string; name: string; role: string } | null; // Added `_id` field to user
  login: (userData: { _id: string; name: string; role: string }) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ _id: string; name: string; role: string } | null>(null);

  const login = (userData: { _id: string; name: string; role: string }) => {
    setIsAuthenticated(true);
    setUser(userData); // Save the user data including `_id`
  };

  const logout = async () => {
    try {
      // Call API service to clear server session
      // Replace with your API call logic (e.g., logout API service function)
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
