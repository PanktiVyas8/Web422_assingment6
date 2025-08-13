const TOKEN_KEY = "token";

export function setToken(token) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

export function readToken() {
  try {
    const token = getToken();
    if (!token) return null;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(decodeURIComponent(escape(window.atob(base64))));
    return payload;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  const payload = readToken();
  if (!payload || !payload.exp) return false;
  const now = Date.now() / 1000;
  return payload.exp > now;
}

export async function authenticateUser(user, password) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: user, password })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Login failed");
  }

  const data = await res.json();
  if (!data.token) throw new Error("No token returned from API");
  setToken(data.token);
  return true;
}

export async function registerUser(user, password, password2) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: user, password, password2 })
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Registration failed");
  }

  return true;
}
