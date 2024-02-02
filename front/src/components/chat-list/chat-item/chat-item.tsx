import {
  Avatar,
  Badge,
  Flex,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import type { ChatItemProps } from './chat-item.types';

const ChatItem = ({
  photoUrl,
  name,
  lastMessageText,
  lastMessageTimestamp,
  unreadMessageCount,
  selected = false,
}: ChatItemProps) => {
  const selectedBgColor = useColorModeValue('purple.50', 'purple.800');
  const hoverColor = useColorModeValue('purple.50', 'purple.800');

  return (
    <Flex
      justifyContent='space-between'
      alignItems='center'
      p={2}
      borderRadius='lg'
      cursor='pointer'
      bgColor={selected ? selectedBgColor : undefined}
      _hover={{
        background: hoverColor,
      }}
    >
      <Flex alignItems='center' gap={2}>
        <Avatar name={name} src={photoUrl} />
        <Stack alignItems='flex-start' gap={0}>
          <Text>{name}</Text>
          <Text fontSize='sm' color={useColorModeValue('gray.500', 'gray.300')}>
            {lastMessageText}
          </Text>
        </Stack>
      </Flex>
      <Stack alignItems='flex-end'>
        <Text fontSize='sm' color={useColorModeValue('gray.500', 'gray.300')}>
          {lastMessageTimestamp}
        </Text>
        {unreadMessageCount && (
          <Badge borderRadius='xl'>{unreadMessageCount}</Badge>
        )}
      </Stack>
    </Flex>
  );
};

export default ChatItem;
