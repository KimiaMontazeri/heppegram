import { useState } from 'react';
import { EditIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
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
import { Chat } from '../../store/chats-store';
import useUserStore from '../../store/user-store';
import { timestampToHHMM } from '../../utils/time';
import useAppStore from '../../store/app-store';

const getNameFromChat = (chat: Chat, username: string | undefined) => {
  let name;
  const { people } = chat;
  people?.map((person) => {
    if (person.username !== username) {
      name = `${person.firstname} ${person.lastname}`;
    }
  });
  return name || String(chat.id);
};

const ChatList = ({ chats, selectedChatId }: ChatListProps) => {
  const username = useUserStore((state) => state.user?.username);
  const setSelectedChat = useAppStore((state) => state.setSelectedChat);

  const [searchContactModalOpen, setSearchContactModalOpen] = useState(false);
  const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const [createChatModalOpen, setCreateChatModalOpen] = useState(false);

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
          <Input type='search' placeholder='Search' />
        </InputGroup>
      </Stack>

      {chats.map((chat, index) => (
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
          />
        </Box>
      ))}
      {/* <ChatItem
        photoUrl='https://bit.ly/sage-adebayo'
        name='Segun Adebayo'
        lastMessageText='How are you?'
        lastMessageTimestamp='12m'
        unreadMessageCount={2}
      />
      <ChatItem
        selected
        photoUrl='https://bit.ly/kent-c-dodds'
        name='Kent Dodds'
        lastMessageText='blah blah'
        lastMessageTimestamp='1h'
      /> */}
    </Box>
  );
};

export default ChatList;
