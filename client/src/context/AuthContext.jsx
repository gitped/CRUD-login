import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth.js";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signUp = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
    }
  };

  const signIn = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) return setErrors(error.response.data);
      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000)
      return () => clearTimeout(timer);
    }
  },[errors]);

  useEffect(() => {
    async function checkLogIn() {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }  
      try {
        setLoading(true);
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return setUser(null);
        }
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        loading,
        isAuthenticated,
        errors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};