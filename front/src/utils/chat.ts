import { Chat } from '../store/chats-store';
import { User } from '../store/user-store';

export const getNameFromChat = (chat: Chat, username: string | undefined) => {
  let name;
  const { people } = chat;
  people?.map((person) => {
    if (person.username !== username) {
      name = `${person.firstname} ${person.lastname}`;
    }
  });
  return name || String(chat.id);
};

export const getImageFromChat = (chat: Chat, username: string | undefined) => {
  let image;
  const { people } = chat;
  people?.map((person) => {
    if (person.username !== username) {
      image = person.image;
    }
  });
  return image || '';
};

export const getUserFromChat = (chat: Chat, username: string | undefined) => {
  let user: User | null = {};
  const { people } = chat;
  people?.map((person) => {
    if (person.username !== username) {
      user = person;
    }
  });
  return user;
};
