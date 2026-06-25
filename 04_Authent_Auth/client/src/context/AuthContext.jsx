import { useEffect, useState } from "react";
import { createContext } from "react";
import { apiConnector } from "../services/apiConnector";
import { AUTH_ENDPOINTS } from "../services/apis";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const getMe = async () => {
    // No token? No need to call API
    if (!token) {
      setUser(null);
      return;
    }

    try {
      setLoading(true);

      const response = await apiConnector(
        "GET",
        AUTH_ENDPOINTS.GET_ME_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        },
      );

      const userData = response?.data?.data;

      if (!userData) {
        throw new Error("User data not found");
      }

      setUser(userData);
    } catch (err) {
      console.error(
        "Error while fetching current user:",
        err?.response?.data?.message || err.message,
      );

      // Clear invalid auth state
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      if (token) {
        
      getMe();
    }
  }, [token]);

  const value = {
    loading,
    setLoading,
    setUser,
    user,
    token,
    setToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
