import { execOnce } from "next/dist/shared/lib/utils";
import { createContext, createElement, useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";

//kinda like useState for the whole react app
const AuthContext = createContext({
  //provide a global 'state' (user) to keep track of their log ins
  //default values for this state
  user: null,
  login: () => {},
  logout: () => {},
  authReady: false, //keep track whether or not established a connection to netlify identity
});

//wrap the whole context for the app
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    netlifyIdentity.on("login", (user) => {
      //2. event listener triggered after signup/login
      setUser(user);
      netlifyIdentity.close(); //close the signup form
      console.log("login event");
    });

    netlifyIdentity.on("logout", () => {
      setUser(null);
      console.log("logout event");
    });

    netlifyIdentity.init(); //init netlify identity connection
    
    return () => {
      //unregister event listener
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
    };
  }, []);

  //1.open up the signup form then automatically logs in
  const login = () => {
    netlifyIdentity.open();
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  //3. return this other components
  const context = {
    user: user,
    login: login,
    logout: logout,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
