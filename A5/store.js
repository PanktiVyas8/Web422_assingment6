
import { atom } from 'jotai';

/
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';


const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};


export const favouritesAtom = atom(
  async () => {
    const token = getToken();
    if (!token) return [];

    try {
      const res = await fetch(`${API_URL}/api/user/favourites`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch favourites');
      return await res.json();
    } catch (err) {
      console.error('Error loading favourites:', err);
      return [];
    }
  },
  async (get, set, update) => {
    const token = getToken();
    if (!token) return;

    try {
      await fetch(`${API_URL}/api/user/favourites`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(update) 
      });
      set(favouritesAtom, update);
    } catch (err) {
      console.error('Error updating favourites:', err);
    }
  }
);


export const searchHistoryAtom = atom(
  async () => {
    const token = getToken();
    if (!token) return [];

    try {
      const res = await fetch(`${API_URL}/api/user/history`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch search history');
      return await res.json();
    } catch (err) {
      console.error('Error loading search history:', err);
      return [];
    }
  },
  async (get, set, update) => {
    const token = getToken();
    if (!token) return;

    try {
      await fetch(`${API_URL}/api/user/history`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
      });
      set(searchHistoryAtom, update);
    } catch (err) {
      console.error('Error updating search history:', err);
    }
  }
);
