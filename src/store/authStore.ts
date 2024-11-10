import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  role: 'admin' | 'client' | 'warehouse';
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (userId: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (userId: string, password: string) => {
        // このデモでは簡易的な実装としています
        const mockUser = {
          id: '1',
          name: userId === 'admin' 
            ? '管理者'
            : userId === 'warehouse' 
              ? '倉庫 担当者' 
              : '山田 太郎',
          role: userId === 'admin' 
            ? 'admin'
            : userId === 'warehouse' 
              ? 'warehouse' 
              : 'client',
        } as User;

        const mockToken = 'mock-token-' + mockUser.role;

        set({ user: mockUser, token: mockToken });
      },
      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);