import { create } from 'zustand';
import { Chat } from './chats-store';

interface AppState {
  selectedChatData: Chat | null;
  selectedChat: number | null;
  setSelectedChat: (chatId: number | null) => void;
  setSelectedChatData: (data: Chat | null) => void;
}

const useAppStore = create<AppState>((set) => ({
  selectedChat: null,
  selectedChatData: null,
  setSelectedChat: (chatId: number | null) => set({ selectedChat: chatId }),
  setSelectedChatData: (data: Chat | null) => set({ selectedChatData: data }),
}));

export default useAppStore;
