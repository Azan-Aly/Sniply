import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  // Check user on first load
  const checkAuth = async () => {
    try {
        const res = await axios.get("http://localhost:3000/api/v1/users/me", {
          withCredentials: true,
        });

        setUser(res.data.user);
        setLoggedIn(true);

      } catch (error) {
        setUser(null);
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, loggedIn, setLoggedIn, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook 
export const useAuth = () => useContext(AuthContext);