import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  isApproved: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  currentUser: User | null;
  pendingUsers: User[];
  approvedUsers: User[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  registerUser: (userData: Omit<User, 'id' | 'isApproved'>) => void;
  approveUser: (userId: string) => void;
  rejectUser: (userId: string) => void;
}

const adminUser: User = {
  id: '1',
  email: 'tgohary@sajco.com.sa',
  name: 'Admin',
  role: 'admin',
  isApproved: true
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      currentUser: null,
      pendingUsers: [],
      approvedUsers: [adminUser],
      login: (email, password) => {
        // Check for admin
        if (email === 'tgohary@sajco.com.sa' && password === '123123') {
          set({ isAuthenticated: true, currentUser: adminUser });
          return true;
        }

        // Check for approved users
        const user = useAuthStore.getState().approvedUsers.find(u => u.email === email);
        if (user && user.isApproved) {
          set({ isAuthenticated: true, currentUser: user });
          return true;
        }

        return false;
      },
      logout: () => {
        set({ isAuthenticated: false, currentUser: null });
      },
      registerUser: (userData) => {
        const newUser: User = {
          ...userData,
          id: Math.random().toString(36).substr(2, 9),
          isApproved: false
        };
        set((state) => ({
          pendingUsers: [...state.pendingUsers, newUser]
        }));
      },
      approveUser: (userId) => {
        set((state) => {
          const user = state.pendingUsers.find(u => u.id === userId);
          if (!user) return state;

          return {
            pendingUsers: state.pendingUsers.filter(u => u.id !== userId),
            approvedUsers: [...state.approvedUsers, { ...user, isApproved: true }]
          };
        });
      },
      rejectUser: (userId) => {
        set((state) => ({
          pendingUsers: state.pendingUsers.filter(u => u.id !== userId)
        }));
      }
    }),
    {
      name: 'auth-storage'
    }
  )
);