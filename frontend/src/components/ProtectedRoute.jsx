
import { Navigate } from "react-router-dom";
import { userAuth } from "../context/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { authUser } = userAuth();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
