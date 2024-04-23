"use client";

import { createContext, useState, useContext, useEffect } from "react";
import authService from "@/services/Auth";

/** @type {import("react").Context<{isAuthenticated: boolean; userData: { user: import("appwrite").Models.User<import("appwrite").Models.Preferences>; member: import("appwrite").Models.Membership } | null; login: typeof authService.login; register: typeof authService.register; logout: typeof authService.logout; verifyLogin: () => Promise<boolean> }>} */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [showChildren, setShowChildren] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  /** @type {typeof authService.login} */
  const login = async (email, password) => {
    const loginResponse = await authService.login(email, password);
    const accountResponse = await authService.getLoggedinUserDetails();

    if (loginResponse.success && accountResponse.success) {
      setIsAuthenticated(() => true);
      setUserData(() => accountResponse.data);
    }

    return loginResponse;
  };

  /** @type {typeof authService.register} */
  const register = async (creds) => {
    const registerResponse = await authService.register(creds);
    const accountResponse = await authService.getLoggedinUserDetails();

    if (registerResponse.success && accountResponse.success) {
      setIsAuthenticated(() => true);
      setUserData(() => accountResponse.data);
    }

    return registerResponse;
  };

  /** @type {typeof authService.logout} */
  const logout = async () => {
    const logoutResponse = await authService.logout();

    if (logoutResponse.success) {
      setIsAuthenticated(() => false);
      setUserData(() => null);
    }

    return logoutResponse;
  };

  const verifyLogin = async () => {
    const response = await authService.getLoggedinUserDetails();

    if (response.success) {
      setIsAuthenticated(() => true);
      setUserData(() => response.data);

      return true;
    }

    setIsAuthenticated(() => false);
    setUserData(() => null);

    return false;
  };

  useEffect(() => {
    verifyLogin().finally(() => {
      setShowChildren(() => true);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userData,
        login,
        register,
        logout,
        verifyLogin,
      }}
    >
      {showChildren ? children : null}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const authContextValue = useContext(AuthContext);

  return authContextValue;
}
