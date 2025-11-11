import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";
const AuthContext = createContext();

const FullPageLoader = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: '1.5rem', color: '#4F46E5' }}>
    Loading...
  </div>
);

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [loading, setLoading] = useState(true);

  const configureAxios = (jwtToken) => {
    if (jwtToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const logout = useCallback(() => {
    setAuthUser(null);
    setToken(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    configureAxios(null);
    toast.success("Logged out successfully");
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        configureAxios(token);
        try {
          const res = await axios.get(`${API_BASE}/user/me`);
          setAuthUser(res.data);
        } catch (error) {
          console.error("Session expired or invalid", error);
          logout();
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, [token, logout]);

  const login = (userData, jwtToken) => {
    setAuthUser(userData);
    setToken(jwtToken);
    localStorage.setItem("authUser", JSON.stringify(userData));
    localStorage.setItem("authToken", jwtToken);
    configureAxios(jwtToken);
  };

  const isFavorite = (itemId) => {
    return authUser?.favorites?.some((fav) => fav.item === itemId);
  };

  const toggleFavorite = async (itemId, itemType) => {
    if (!authUser) {
      toast.error("You must be logged in to add favorites.");
      return;
    }
    try {
      const res = await axios.post(`${API_BASE}/user/favorites/${itemType}/${itemId}`);
      setAuthUser(res.data);
      localStorage.setItem("authUser", JSON.stringify(res.data));
      const isNowFavorite = res.data.favorites.some(fav => fav.item === itemId);
      toast.success(isNowFavorite ? "Added to favorites!" : "Removed from favorites.");
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      toast.error("Could not update favorites.");
    }
  };

  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <AuthContext.Provider value={{ authUser, token, loading, login, logout, isAdmin: authUser?.role === "admin", isFavorite, toggleFavorite }}>
      {children}
    </AuthContext.Provider>
  );
};

export const userAuth = () => useContext(AuthContext);
export default AuthProvider;