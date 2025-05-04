import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { userData } = useContext(UserContext);
  const location = useLocation();

  if (!userData) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  const isAdminDashboardRoute = location.pathname.startsWith("/admin-dashboard");
  if (isAdminDashboardRoute && !userData?.is_staff) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
