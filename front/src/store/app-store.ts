import { create } from 'zustand';

interface AppState {
  selectedChat: number | null;
  setSelectedChat: (chatId: number | null) => void;
}

const useAppStore = create<AppState>((set) => ({
  selectedChat: null,
  setSelectedChat: (chatId: number | null) => set({ selectedChat: chatId }),
}));

export default useAppStore;
