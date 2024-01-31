import { create } from 'zustand';

interface User {
  username: string;
}

interface UserState {
  user: User | null;
  setUser: (userData: User | null) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (userData: User | null) => set({ user: userData }),
}));

export default useUserStore;
