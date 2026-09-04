import { createContext, useContext, useEffect, useState } from "react";
import { userApi } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  // Check user authentication status on load
  const checkAuth = async () => {
    try {
      setLoading(true);
      const res = await userApi.getMe();
      if (res?.data?.data) {
        setUser(res.data.data);
        setLoggedIn(true);
        return res.data.data;
      } else {
        setUser(null);
        setLoggedIn(false);
        return null;
      }
    } catch {
      setUser(null);
      setLoggedIn(false);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const res = await userApi.login(credentials);
    const userData = res.data?.data?.user;
    const token = res.data?.data?.accessToken;
    if (token && typeof window !== "undefined") {
      localStorage.setItem("accessToken", token);
    }
    if (userData) {
      setUser(userData);
      setLoggedIn(true);
    }
    return res;
  };

  const register = async (userData) => {
    const res = await userApi.register(userData);
    const newUser = res.data?.data?.user;
    const token = res.data?.data?.accessToken;
    if (token && typeof window !== "undefined") {
      localStorage.setItem("accessToken", token);
    }
    if (newUser) {
      setUser(newUser);
      setLoggedIn(true);
    }
    return res;
  };

  const logout = async () => {
    try {
      await userApi.logout();
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
      }
      setUser(null);
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        loggedIn,
        setLoggedIn,
        checkAuth,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};