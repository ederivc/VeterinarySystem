import { createContext, useEffect } from "react";
import { useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const checkSession = async () => {
    const response = await fetch("/auth/session", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "X-CSRFToken": csrfToken,
      },
    });
    // console.log(response);
    const json = await response.json();
    // console.log(json);
    if (!json.email) {
      setUser("");
    } else {
      // console.log("hj");
      setUser(json);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const isLogged = () => !!user;

  const contextValue = { user, setUser, isLogged, sidebar, showSidebar };

  return (
    // <h1>jjkjlk</h1>
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
