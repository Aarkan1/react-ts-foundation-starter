import { createContext, ReactNode, useContext, useState } from "react";

export interface IAuthContextValue {
    user: string | null;
    loginError: boolean;
    login(credentials: string): void;
    logout(): void;
}

export const AuthContext = createContext<IAuthContextValue>(
    {} as IAuthContextValue
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

    const value: IAuthContextValue = {
        user,
        login,
        logout,
        loginError,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
