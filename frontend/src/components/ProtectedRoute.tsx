// components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  redirectPath?: string;
  children?: React.ReactNode;
}

const ProtectedRoute = ({
  redirectPath = "/signin",
  children,
}: ProtectedRouteProps) => {
  const userState = localStorage.getItem("auth-storage");
  const user = userState ? JSON.parse(userState) : null;
  const isAuthenticated = user && user.state && user.state.user;
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
