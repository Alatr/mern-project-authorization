import React, { useContext, useState, createContext, FC } from "react";

type AuthContextProp = {
  loggedIn: boolean;
  logIn: () => void;
  logOut: () => void;
};
const authContext = createContext<AuthContextProp>({} as AuthContextProp);
const { Provider } = authContext;

export const useAuth = () => useContext(authContext);

const AuthService: FC = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(true);

  const logIn = () => {
    setLoggedIn(true);
  };

  const logOut = () => {
    setLoggedIn(false);
  };

  return (
    <Provider
      value={{
        loggedIn,
        logIn,
        logOut,
      }}
    >
      {children}
    </Provider>
  );
};

export default AuthService;
