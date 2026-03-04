// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '~/services/AuthService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check authentication status on app load
  useEffect(() => {
    checkAuthStatus();
    
    // Listen for auth changes (login/logout)
    const handleAuthChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('auth-change', handleAuthChange);
    
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, []);

  const checkAuthStatus = () => {
    const status = authService.authStatus();
    setIsAuthenticated(status.isAuthenticated);
    setUser(status.user);
    setLoading(false);
  };

  const login = async (username, password) => {
    const result = await authService.login(username, password);
    if (result.success) {
      console.log("login successfully");
      console.log(authService.authStatus())
      checkAuthStatus(); // Update state after login
      // Dispatch event for other components
      window.dispatchEvent(new Event('auth-change'));
    }
    return result;
  };

  const logout = async (refreshTokenId) => {
    const result = await authService.logout(refreshTokenId);
    checkAuthStatus(); // Update state after logout
    window.dispatchEvent(new Event('auth-change'));
    return result;
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};