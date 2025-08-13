import { getToken } from "./authenticate";

const API = process.env.NEXT_PUBLIC_API_URL;

function authHeader() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handle(res) {
  if (!res.ok) return [];
  try {
    return await res.json();
  } catch {
    return [];
  }
}

export async function addToFavourites(id) {
  const res = await fetch(`${API}/favourites/${id}`, {
    method: "PUT",
    headers: { ...authHeader() }
  });
  return handle(res);
}

export async function removeFromFavourites(id) {
  const res = await fetch(`${API}/favourites/${id}`, {
    method: "DELETE",
    headers: { ...authHeader() }
  });
  return handle(res);
}

export async function getFavourites() {
  const res = await fetch(`${API}/favourites`, {
    headers: { ...authHeader() }
  });
  return handle(res);
}

export async function addToHistory(id) {
  const res = await fetch(`${API}/history/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { ...authHeader() }
  });
  return handle(res);
}

export async function removeFromHistory(id) {
  const res = await fetch(`${API}/history/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { ...authHeader() }
  });
  return handle(res);
}

export async function getHistory() {
  const res = await fetch(`${API}/history`, {
    headers: { ...authHeader() }
  });
  return handle(res);
}