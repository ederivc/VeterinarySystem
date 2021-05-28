import { createContext, useEffect } from "react";
import { useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  const checkSession = async () => {
    const response = await fetch("/auth/session", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "X-CSRFToken": csrfToken,
      },
    });
    const json = await response.json();
    console.log(json.email);
    setUser(json.email);
  };

  useEffect(() => {
    checkSession();
  }, []);

  const isLogged = () => !!user;

  const contextValue = {
    user,
    setUser,
    isLogged,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
