
import { Navigate } from "react-router-dom";
import { userAuth } from "../context/AuthProvider";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { authUser, isAdmin } = userAuth();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
