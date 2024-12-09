import { useState, useEffect } from 'react';
import { getCurrentUser, login, logout } from './authService';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogin = (email: string, password: string) => {
    const loggedInUser = login(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return { user, handleLogin, handleLogout };
};
