import type { Message } from '../../../store/chats-store';

export type From = {
  username?: string;
  name: string;
  photoUrl?: string;
};

export type MessageGroupProps = {
  isFromMe: boolean;
  from: From;
  messages: Message[];
};

export type GroupedMessage = {
  from: From;
  messages: Message[];
};
