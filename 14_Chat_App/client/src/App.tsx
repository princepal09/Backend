import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import OpenRoute from "./components/Auth/OpenRoute";
import ProtectedRoute from "./components/Auth/ParivateRoute";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import Navbar from "./components/Navbar";

const App = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    console.log("HELLOOOOO");
    checkAuth();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <OpenRoute>
              <LoginPage />
            </OpenRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <SignUpPage />
            </OpenRoute>
          }
        />

        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </>
  );
};

export default App;
