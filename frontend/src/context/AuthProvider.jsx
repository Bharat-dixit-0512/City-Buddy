import React, {
  useState,
  useEffect,
  useCallback,
} from "react";
import toast from "react-hot-toast";
import { api } from "../services/api";
import AuthContext from "./auth-context";

const FullPageLoader = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      fontSize: "1.5rem",
      color: "#4F46E5",
    }}
  >
    Loading...
  </div>
);

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(getStoredUser);
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [loading, setLoading] = useState(true);

  const logout = useCallback(() => {
    setAuthUser(null);
    setToken(null);
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    toast.success("Logged out successfully");
  }, []);

  const refreshUser = useCallback(async () => {
    if (token) {
      try {
        const res = await api.get("/user/me");
        setAuthUser(res.data);
        localStorage.setItem("authUser", JSON.stringify(res.data));
        return res.data;
      } catch (error) {
        console.error("Session expired or invalid, logging out.", error);
        logout();
      }
    }
    return null;
  }, [token, logout]);

  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        await refreshUser();
      }
      setLoading(false);
    };

    initializeAuth();
  }, [token, refreshUser]);

  const login = (userData, jwtToken) => {
    setAuthUser(userData);
    setToken(jwtToken);
    localStorage.setItem("authUser", JSON.stringify(userData));
    localStorage.setItem("authToken", jwtToken);
  };

  const isFavorite = (itemId) => {
    return authUser?.favorites?.some((fav) => fav.item.toString() === itemId);
  };

  const toggleFavorite = async (itemId) => {
    if (!authUser) {
      toast.error("You must be logged in to add favorites.");
      return;
    }

    try {
      await api.post(`/user/favorites/${itemId}`);
      await refreshUser();
      toast.success("Favorites updated!");
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      toast.error("Could not update favorites.");
    }
  };

  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <AuthContext.Provider
      value={{
        authUser,
        token,
        loading,
        login,
        logout,
        refreshUser,
        isAdmin: authUser?.role === "admin" || authUser?.role === "super-admin",
        isSuperAdmin: authUser?.role === "super-admin",
        isOwner: authUser?.role === "owner",
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
