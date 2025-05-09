import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(() => {
    const stored = localStorage.getItem('userDetails');
    return stored ? JSON.parse(stored) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));

  const login = (token, userDetails) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    setIsAuthenticated(true);
    setUserDetails(userDetails);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
    setIsAuthenticated(false);
    setUserDetails(null);
  };

  const role = userDetails?.role;
  const subscription = userDetails?.subscription;

// Add a function to check subscription
const hasActiveSubscription = (subscriptionType) => {
  return subscription?.some(sub => 
    sub.subscriptionFor === subscriptionType && 
    new Date(sub.subscriptionEndDate) > new Date()
  );
};

// Add this to the context value
return (
  <AuthContext.Provider value={{ 
    isAuthenticated, 
    userDetails, 
    subscription,
    role, 
    hasActiveSubscription, 
    login, 
    logout 
  }}>
    {children}
  </AuthContext.Provider>
);
};

export const useAuth = () => useContext(AuthContext);
