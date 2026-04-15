import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "../services/api";
import { getApiErrorMessage } from "../utils/errors";
import {
  clearStoredToken,
  decodeJwt,
  getDefaultRouteForRole,
  getStoredSession,
  setStoredToken,
} from "../utils/jwt";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(getStoredSession);

  useEffect(() => {
    const handleAuthExpired = () => {
      clearStoredToken();
      setSession({ token: null, user: null });
    };

    window.addEventListener("auth:expired", handleAuthExpired);
    return () => window.removeEventListener("auth:expired", handleAuthExpired);
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    const token = response.data?.token;
    const user = decodeJwt(token);

    if (!token || !user) {
      throw new Error("Invalid login response received from the server.");
    }

    setStoredToken(token);
    setSession({ token, user });
    return {
      user,
      redirectTo: getDefaultRouteForRole(user.role),
    };
  };

  const logout = () => {
    clearStoredToken();
    setSession({ token: null, user: null });
  };

  const value = useMemo(
    () => ({
      token: session.token,
      user: session.user,
      isAuthenticated: Boolean(session.token && session.user),
      isAdmin: session.user?.role === "ADMIN",
      isUser: session.user?.role === "USER",
      login,
      logout,
      getLoginErrorMessage: getApiErrorMessage,
    }),
    [session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
