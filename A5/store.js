import { atom } from 'jotai';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const favouritesAtom = atom();
export const searchHistoryAtom = atom();
