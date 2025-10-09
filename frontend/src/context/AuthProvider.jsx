import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); 
    if (user) setAuthUser(user);
  }, []);

  const login = (userData) => {
    setAuthUser(userData);
    localStorage.setItem("authUser", JSON.stringify(userData));
    window.location.reload(); // Force refresh after login
  };

  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem("user");
    window.location.reload(); // Refresh after logout too (optional)
  };

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const userAuth = () => useContext(AuthContext);

export default AuthProvider;
