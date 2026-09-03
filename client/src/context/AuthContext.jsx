import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, []);

  const register = async (name, email, password) => {
    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      setUser(user);

      return {
        success: true,
        user,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      setUser(user);

      return {
        success: true,
        user,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    delete api.defaults.headers.common.Authorization;

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}