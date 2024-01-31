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

const ChatList = () => {
  const [searchContactModalOpen, setSearchContactModalOpen] = useState(false);
  const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);
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
                <MenuItem onClick={() => setCreateGroupModalOpen(true)}>
                  Add a new group
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
      {/* chat items 👇🏻 */}
      <ChatItem
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
      />
    </Box>
  );
};

export default ChatList;
