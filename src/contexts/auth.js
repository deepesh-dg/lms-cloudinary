"use client";

import { createContext, useState, useContext, useEffect } from "react";
import AuthService from "@/services/auth";

/** @type {import("react").Context<{isAuthenticated: boolean; userData: { user: import("appwrite").Models.User<import("appwrite").Models.Preferences>; member: import("appwrite").Models.Membership } | null; login: typeof AuthService.login; register: typeof AuthService.register; logout: typeof AuthService.logout; }>} */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [showChildren, setShowChildren] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  /** @type {typeof AuthService.login} */
  const login = async (email, password) => {
    const loginResponse = await AuthService.login(email, password);
    const accountResponse = await AuthService.getLoggedinUserDetails();

    if (loginResponse.success && accountResponse.success) {
      setIsAuthenticated(() => true);
      setUserData(() => accountResponse.data);
    }

    return loginResponse;
  };

  /** @type {typeof AuthService.register} */
  const register = async (creds) => {
    const registerResponse = await AuthService.register(creds);
    const accountResponse = await AuthService.getLoggedinUserDetails();

    if (registerResponse.success && accountResponse.success) {
      setIsAuthenticated(() => true);
      setUserData(() => accountResponse.data);
    }

    return registerResponse;
  };

  /** @type {typeof AuthService.logout} */
  const logout = async () => {
    const logoutResponse = await AuthService.logout();

    if (logoutResponse.success) {
      setIsAuthenticated(() => false);
      setUserData(() => null);
    }

    return logoutResponse;
  };

  const verifyLogin = async () => {
    const response = await AuthService.getLoggedinUserDetails();

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
