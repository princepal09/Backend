import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const authUser = useAuthStore((state) => state.authUser);

  if (!authUser) {
    return <Navigate to="/login"  />;
  }

  return children;
};

export default ProtectedRoute;