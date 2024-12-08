// src/services/useAuth.ts
import { useState, useEffect } from 'react';
import { getCurrentUser, login, logout } from './authService'; // Import your auth functions

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);

  // Fetch the current user when the component mounts
  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  // Handle login
  const handleLogin = (email: string, password: string) => {
    const loggedInUser = login(email, password); // Logs the user in and initializes orders
    setUser(loggedInUser);

    // Optionally, you can handle additional logic like redirecting the user
    return loggedInUser;
  };

  // Handle logout
  const handleLogout = () => {
    logout(); // Clears the user's data from localStorage
    setUser(null); // Reset user state
  };

  return { user, handleLogin, handleLogout };
};
