import { getUsername } from '../services/user';
import type { Message } from '../store/chats-store';
import type { GroupedMessage } from '../components/chat-box/message-group/message-group.types';

export const isMessageFromMe = (message: Message) => {
  return message.sender?.username === getUsername();
};

/**
 * It will group messages that are from the same sender and
 * that are continuous in order to create a better UI for messages.
 */
export const groupMessagesBySender = (
  messages: Message[],
): GroupedMessage[] => {
  const groupedMessages: GroupedMessage[] = [];

  for (const message of messages) {
    if (message) {
      const { sender } = message;

      const lastGroup = groupedMessages[groupedMessages.length - 1];

      if (!lastGroup || lastGroup.from.username !== sender?.username) {
        // start a new group
        groupedMessages.push({
          from: {
            username: sender?.username,
            name: `${sender?.firstname} ${sender?.lastname}`,
            photoUrl: sender?.image,
          },
          messages: [message],
        });
      } else {
        // add message to the current group
        lastGroup.messages.push(message);
      }
    }
  }

  return groupedMessages;
};
