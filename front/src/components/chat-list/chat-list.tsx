import { useEffect, useState } from 'react';
import { EditIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Text,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import SearchContactModal from '../search-contact-modal';
import CreateGroupModal from '../create-group-modal';
import ChatItem from './chat-item';
import CreateChatModal from '../create-chat-modal';
import { ChatListProps } from './chat-list.types';
import useUserStore from '../../store/user-store';
import { timestampToHHMM } from '../../utils/time';
import useAppStore from '../../store/app-store';
import { getNameFromChat } from '../../utils/chat';
import type { Chat } from '../../store/chats-store';
// import useChatsStore from '../../store/chats-store';

const ChatList = ({ selectedChatId, chats }: ChatListProps) => {
  const username = useUserStore((state) => state.user?.username);
  const setSelectedChat = useAppStore((state) => state.setSelectedChat);

  const [searchContactModalOpen, setSearchContactModalOpen] = useState(false);
  const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const [createChatModalOpen, setCreateChatModalOpen] = useState(false);
  // const chats = useChatsStore((state) => state.chats);
  const [chatList, setChatList] = useState(chats);

  useEffect(() => {
    setChatList(chats);
  }, [chats]);

  const handleSearchChats = (searchValue: string) => {
    const filteredChatList = chats?.filter((chat) => {
      const name = getNameFromChat(chat, username);
      return name.startsWith(searchValue);
    });
    setChatList(filteredChatList || null);
  };

  const getUnreadMessageCount = (chat: Chat) => {
    const foundChat = chats?.find((item) => item.id === chat.id);
    if (foundChat) {
      return foundChat.unreadMessageCount;
    }
    return 0;
  };

  const getStatus = (chat: Chat) => {
    const foundChat = chats?.find((item) => item.id === chat.id);
    if (foundChat) {
      const { people } = foundChat;
      const user = people?.find((person) => person.username !== username);
      if (user) {
        console.log('status: ', user.status);
        return user.status;
      }
    }

    return 0;
  };

  return (
    <Box px={4}>
      <SearchContactModal
        isOpen={searchContactModalOpen}
        onClose={() => setSearchContactModalOpen(false)}
      />
      <CreateGroupModal
        isOpen={createGroupModalOpen}
        onClose={() => setCreateGroupModalOpen(false)}
      />
      <CreateChatModal
        isOpen={createChatModalOpen}
        onClose={() => setCreateChatModalOpen(false)}
      />

      <Stack
        position='sticky'
        top={0}
        bgColor={useColorModeValue('BlackAlpha.50', 'BlackAlpha.50')}
        overflow='scroll'
        pb={4}
        zIndex={1}
      >
        <Flex justifyContent='space-between' py={4}>
          <Heading as='h2' size='lg'>
            Messages
          </Heading>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<EditIcon />}
              shadow='xl'
              isRound
            />
            <Portal>
              <MenuList>
                <MenuItem onClick={() => setSearchContactModalOpen(true)}>
                  Add a new contact
                </MenuItem>
                <MenuItem onClick={() => setCreateChatModalOpen(true)}>
                  Create a chat
                </MenuItem>
                <MenuItem onClick={() => setCreateGroupModalOpen(true)}>
                  Create a group
                </MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </Flex>
        <Divider />
        <InputGroup variant='filled'>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon />
          </InputLeftElement>
          <Input
            type='search'
            placeholder='Search'
            onChange={(e) => handleSearchChats(e.target.value)}
          />
        </InputGroup>
      </Stack>

      {chatList ? (
        chatList?.map((chat, index) => (
          <Box key={index} onClick={() => setSelectedChat(chat.id || null)}>
            <ChatItem
              selected={selectedChatId === chat.id}
              id={chat.id}
              name={getNameFromChat(chat, username)}
              lastMessageText={chat.lastMessage?.content}
              lastMessageTimestamp={
                chat.lastMessage?.timestamp
                  ? timestampToHHMM(chat.lastMessage?.timestamp)
                  : undefined
              }
              unreadMessageCount={getUnreadMessageCount(chat)}
              status={getStatus(chat)}
            />
          </Box>
        ))
      ) : (
        <Center p={4} color='purple.500'>
          <Text>You have no chats!</Text>
        </Center>
      )}
    </Box>
  );
};

export default ChatList;
