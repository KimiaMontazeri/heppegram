export type ChatItemProps = {
  id?: number;
  photoUrl?: string;
  name: string;
  lastMessageText?: string;
  lastMessageTimestamp?: string;
  unreadMessageCount?: number;
  selected?: boolean;
  status?: number;
};
