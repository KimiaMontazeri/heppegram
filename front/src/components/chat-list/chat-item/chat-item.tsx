import {
  Avatar,
  Badge,
  Flex,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import type { ChatItemProps } from './chat-item.types';
import { DeleteIcon } from '@chakra-ui/icons';
import { customFetch } from '../../../services/fetch';
import useChatsStore from '../../../store/chats-store';
import useAppStore from '../../../store/app-store';

const ChatItem = ({
  id,
  photoUrl,
  name,
  lastMessageText,
  lastMessageTimestamp,
  unreadMessageCount,
  selected = false,
}: ChatItemProps) => {
  const selectedBgColor = useColorModeValue('purple.50', 'purple.800');
  const hoverColor = useColorModeValue('purple.50', 'purple.800');

  const setChats = useChatsStore((state) => state.setChats);
  const chats = useChatsStore((state) => state.chats);
  const setSelectedChat = useAppStore((state) => state.setSelectedChat);
  const setSelectedChatData = useAppStore((state) => state.setSelectedChatData);

  const toast = useToast();

  const deleteChat = async () => {
    const { ok } = await customFetch({
      url: `/api/chats/${id}`,
      method: 'DELETE',
    });

    if (ok) {
      toast({
        title: 'Chat deleted successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      // update store
      const filteredChats = chats?.filter((chat) => chat.id !== id);
      setChats(filteredChats || null);
      setSelectedChat(null);
      setSelectedChatData(null);
    } else {
      toast({
        title: 'An error occurred while deleting the chat.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDeleteChat = () => {
    deleteChat();
  };

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
      <Flex align='center'>
        <Stack alignItems='flex-end'>
          <Text fontSize='sm' color={useColorModeValue('gray.500', 'gray.300')}>
            {lastMessageTimestamp}
          </Text>
          {unreadMessageCount && (
            <Badge borderRadius='xl'>{unreadMessageCount}</Badge>
          )}
        </Stack>
        <IconButton
          icon={<DeleteIcon />}
          colorScheme='red'
          color='red.400'
          variant='ghost'
          isRound
          aria-label='delete-message'
          mr={1}
          onClick={handleDeleteChat}
        />
      </Flex>
    </Flex>
  );
};

export default ChatItem;
