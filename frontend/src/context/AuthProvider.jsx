import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

// A simple loading component to show while we check for a user session
const FullPageLoader = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontSize: '1.5rem',
      fontFamily: 'sans-serif',
      color: '#4F46E5' // Indigo color
    }}>
      Loading...
    </div>
  );
};

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // <-- 1. Add loading state, initially true

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("authUser");
      const storedToken = localStorage.getItem("authToken");

      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser);
        setAuthUser(parsedUser);
        setToken(storedToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
      }
    } catch (error) {
      // If there's an error (e.g., malformed JSON), clear storage and log out
      console.error("Failed to parse auth user from storage", error);
      logout();
    } finally {
      // <-- 2. Set loading to false after the check is complete
      setLoading(false);
    }
  }, []);

  const login = (userData, jwtToken) => {
    setAuthUser(userData);
    setToken(jwtToken);
    localStorage.setItem("authUser", JSON.stringify(userData));
    if (jwtToken) {
      localStorage.setItem("authToken", jwtToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
    }
  };

  const logout = () => {
    setAuthUser(null);
    setToken(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    delete axios.defaults.headers.common["Authorization"];
  };

  // <-- 3. Conditionally render a loader or the app
  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <AuthContext.Provider value={{ authUser, token, loading, login, logout, isAdmin: authUser?.role === "admin" }}>
      {children}
    </AuthContext.Provider>
  );
};

export const userAuth = () => useContext(AuthContext);

export default AuthProvider;