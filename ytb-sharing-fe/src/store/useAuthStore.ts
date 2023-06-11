import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthStoreState, IAuth } from '../types';

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      auth: null,
      setAuth: (auth: IAuth | null) => set(() => ({ auth })),
    }),
    {
      name: 'funnymovie:auth',
    }
  )
);
