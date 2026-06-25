import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";


interface OpenRouteProps {
  children: React.ReactNode;
}

const OpenRoute = ({ children }: OpenRouteProps) => {
  const authUser = useAuthStore((state) => state.authUser);
 
  if (authUser) {
    return <Navigate to="/"  />;
  }

  return children;
};

export default OpenRoute;