import type { Chats } from '../../store/chats-store';

export type ChatListProps = {
  chats: Chats;
  selectedChatId: number | null;
};
