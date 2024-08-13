import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = () => {
      const sessionData = JSON.parse(localStorage.getItem("sessionData"));
      if (sessionData && sessionData.token) {
        try {
          const decodedToken = jwtDecode(sessionData.token);
          if (decodedToken.exp * 1000 > Date.now()) {
            setUser(decodedToken);
          } else {
            localStorage.removeItem("sessionData");
            setUser(null);
          }
        } catch (error) {
          localStorage.removeItem("sessionData");
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    initializeUser();
  }, []);

  const login = (token) => {
    console.log("Logging in with token:", token);
    localStorage.setItem("sessionData", JSON.stringify({ token }));
    const decodedToken = jwtDecode(token);
    console.log("Decoded Token in login:", decodedToken);
    setUser(decodedToken);
  };

  const logout = () => {
    // console.log("Logging out");
    localStorage.removeItem("sessionData");
    setUser(null); // Clear the user state on logout
  };

  if (loading) {
    return <div>Loading...</div>; // Or a spinner or skeleton component
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthProvider };
