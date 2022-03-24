import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

// import WaitPage from "./components/WaitPage";

const useAuth = () => {
  const { isAuthenticated, useInfo } = useSelector((state) => state.authUser);

  return isAuthenticated;
};

const ProtectedRoutes = () => {
  const location = useLocation();
  const isAuth = useAuth();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoutes;
