import { Avatar, Flex, Stack } from '@chakra-ui/react';
import TextMessage from '../text-message';
import { MessageGroupProps } from './message-group.types';

const MessageGroup = ({ isFromMe, from, messages }: MessageGroupProps) => {
  if (isFromMe) {
    return (
      <Flex justifyContent='flex-end'>
        <Flex gap={2}>
          <Stack pt={1} alignItems='flex-end'>
            {messages.map((text) => (
              <TextMessage>{text}</TextMessage>
            ))}
          </Stack>
          <Avatar name={from.name} src={from.photoUrl} />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex gap={2}>
      <Avatar name={from.name} src={from.photoUrl} />
      <Stack pt={1} alignItems='flex-start'>
        {messages.map((text) => (
          <TextMessage>{text}</TextMessage>
        ))}
      </Stack>
    </Flex>
  );
};

export default MessageGroup;
