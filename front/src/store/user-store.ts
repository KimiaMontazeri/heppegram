import { create } from 'zustand';

export type User = {
  username?: string;
  id?: number;
  firstname?: string;
  lastname?: string;
  image?: string;
  phone?: string;
  bio?: string;
  status?: number;
};

interface UserState {
  user: User | null;
  setUser: (userData: User | null) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (userData: User | null) => set({ user: userData }),
}));

export default useUserStore;
