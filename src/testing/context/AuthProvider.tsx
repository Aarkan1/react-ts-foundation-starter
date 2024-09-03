import { createContext, ReactNode, useContext, useState } from "react";

export interface AuthContextValue {
  user: string | null;
  loginError: boolean;
  login(credentials: string): void;
  logout(): void;
}

export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [user, setUser] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<boolean>(false);

  const login = (credentials: string) => {
    if (credentials === "admin") {
      setUser(credentials);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value: AuthContextValue = {
    user,
    login,
    logout,
    loginError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
