export const AUTH_STORAGE_KEY = "stockflow_auth_token";

function decodeBase64Url(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return atob(padded);
}

export function decodeJwt(token) {
  try {
    const [, payload] = token.split(".");
    const parsed = JSON.parse(decodeBase64Url(payload));
    const role = String(parsed.role || "")
      .replace(/^ROLE_/, "")
      .toUpperCase();

    if (!parsed.sub || !["ADMIN", "USER"].includes(role)) {
      return null;
    }

    return {
      email: parsed.sub,
      role,
      exp: parsed.exp || null,
    };
  } catch (error) {
    return null;
  }
}

export function isTokenExpired(token) {
  const payload = decodeJwt(token);
  if (!payload?.exp) {
    return true;
  }
  return payload.exp * 1000 <= Date.now();
}

export function getStoredToken() {
  return localStorage.getItem(AUTH_STORAGE_KEY);
}

export function setStoredToken(token) {
  localStorage.setItem(AUTH_STORAGE_KEY, token);
}

export function clearStoredToken() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getStoredSession() {
  const token = getStoredToken();
  if (!token || isTokenExpired(token)) {
    clearStoredToken();
    return {
      token: null,
      user: null,
    };
  }

  return {
    token,
    user: decodeJwt(token),
  };
}

export function getDefaultRouteForRole(role) {
  if (role === "ADMIN") {
    return "/admin/dashboard";
  }

  if (role === "USER") {
    return "/user/dashboard";
  }

  return "/login";
}
