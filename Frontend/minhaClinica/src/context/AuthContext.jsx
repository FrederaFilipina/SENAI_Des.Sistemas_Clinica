import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (savedEmail && accessToken) {
      setUser({
        email: savedEmail,
        accessToken,
        refreshToken,
      });
    }
  }, []);

  const login = (email) => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    setUser({email,accessToken,refreshToken,});
    localStorage.setItem("email", email);
  };

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
