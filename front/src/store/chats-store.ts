import { create } from 'zustand';
import { User } from './user-store';

export type Message = {
  id?: string;
  sender: User | null;
  content: string;
  timestamp: number;
  chatID?: number;
};

export type Chat = {
  id?: number;
  people?: User[];
  lastMessage?: Message;
  messages?: Message[];
  unreadMessageCount?: number;
};

export type Chats = Chat[];

interface ChatState {
  chats: Chats | null;
  setChats: (chatsData: Chats | null) => void;
}

const useChatsStore = create<ChatState>((set) => ({
  chats: null,
  setChats: (chatsData: Chats | null) => set({ chats: chatsData }),
}));

export default useChatsStore;
