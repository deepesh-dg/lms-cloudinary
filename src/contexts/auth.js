"use client";

import { createContext, useState, useContext, useEffect } from "react";
import appwriteClientService from "@/services/appwrite-client";

/** @type {import("react").Context<{isAuthenticated: boolean; user: import("appwrite").Models.User<import("appwrite").Models.Preferences> | null; login: typeof appwriteClientService.login; register: typeof appwriteClientService.register; logout: typeof appwriteClientService.logout; verifyLogin: () => Promise<boolean> }>} */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [showChildren, setShowChildren] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  /** @type {typeof appwriteClientService.login} */
  const login = async (email, password) => {
    const loginResponse = await appwriteClientService.login(email, password);
    const userResponse = await appwriteClientService.getLoggedinUserDetails();

    if (loginResponse.success && userResponse.success) {
      setIsAuthenticated(() => true);
      setUser(() => userResponse.data);
    }

    return loginResponse;
  };

  /** @type {typeof appwriteClientService.register} */
  const register = async (creds) => {
    const registerResponse = await appwriteClientService.register(creds);
    const userResponse = await appwriteClientService.getLoggedinUserDetails();

    if (registerResponse.success && userResponse.success) {
      setIsAuthenticated(() => true);
      setUser(() => userResponse.data);
    }

    return registerResponse;
  };

  /** @type {typeof appwriteClientService.logout} */
  const logout = async (email, password) => {
    const logoutResponse = await appwriteClientService.logout(email, password);
    const userResponse = await appwriteClientService.getLoggedinUserDetails();

    if (logoutResponse.success && userResponse.success) {
      setIsAuthenticated(() => false);
      setUser(() => null);
    }

    return logoutResponse;
  };

  const verifyLogin = async () => {
    const response = await appwriteClientService.getLoggedinUserDetails();

    if (response.success) {
      setIsAuthenticated(() => true);
      setUser(() => response.data);

      return true;
    }

    setIsAuthenticated(() => false);
    setUser(() => null);

    return false;
  };

  useEffect(() => {
    verifyLogin().finally(() => {
      setShowChildren(() => true);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, logout, verifyLogin }}
    >
      {showChildren ? children : null}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const authContextValue = useContext(AuthContext);

  return authContextValue;
}
