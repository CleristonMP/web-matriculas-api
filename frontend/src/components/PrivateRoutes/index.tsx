import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "util/auth";

const PrivateRoutes = () => {
  return (
    isAuthenticated() ? <Outlet /> : <Navigate to="auth/login" />
  );
};

export default PrivateRoutes;
