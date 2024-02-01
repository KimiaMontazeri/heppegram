import { ChangeEvent, useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import type { CreateChatModalProps, User } from './create-chat-modal.types';
import Person from '../person';
import { customFetch } from '../../services/fetch';
import useChatsStore from '../../store/chats-store';
import useAppStore from '../../store/app-store';

const SearchContactModal = ({ isOpen, onClose }: CreateChatModalProps) => {
  const chats = useChatsStore((state) => state.chats);
  const setChats = useChatsStore((state) => state.setChats);
  const setSelectedChat = useAppStore((state) => state.setSelectedChat);

  const toast = useToast();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [users, setUsers] = useState<User[] | null>(null);
  const grayColor = useColorModeValue('gray.100', 'gray.700');
  const hoveredBgColor = useColorModeValue('purple.50', 'purple.800');

  const handleCreateChat = async (selectedUsername: string) => {
    const { ok, body } = await customFetch({
      url: '/api/chats',
      method: 'POST',
      payload: {
        username: selectedUsername,
      },
    });

    if (ok) {
      if (chats) {
        const newChats = chats.concat([body]);
        setChats(newChats);
      } else {
        setChats(body);
      }

      setSelectedChat(body.id);
      handleClose();
      toast({
        title: 'Successfully created the chat.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleSelectUser = (selectedUsername: string) => {
    handleCreateChat(selectedUsername);
  };

  const searchUsers = async (keyword: string) => {
    const { ok, body } = await customFetch({
      url: `/api/users?keyword=${keyword}`,
      method: 'GET',
    });

    if (ok) {
      setUsers(body);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    searchUsers(keyword);
  };

  const handleClose = () => {
    setSearchKeyword('');
    setUsers(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} scrollBehavior='inside'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a chat</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup variant='filled'>
            <InputLeftElement pointerEvents='none'>
              <SearchIcon />
            </InputLeftElement>
            <Input
              type='search'
              value={searchKeyword}
              onChange={handleSearch}
              placeholder='Search people'
            />
          </InputGroup>
          {users && users.length !== 0 ? (
            <List
              textAlign='start'
              bgColor={grayColor}
              borderRadius='lg'
              p={2}
              px={3}
              m={4}
            >
              {users.map((user, index) => (
                <Box
                  key={index}
                  cursor='pointer'
                  borderRadius='lg'
                  px={2}
                  onClick={() => handleSelectUser(user.username)}
                  _hover={{
                    backgroundColor: hoveredBgColor,
                  }}
                >
                  <Person
                    name={`${user.firstname} ${user.lastname}`}
                    username={user.username}
                    image={user.image}
                    showRemoveIcon={false}
                  />
                </Box>
              ))}
            </List>
          ) : (
            <Center pt={4}>
              <Text>No user found!</Text>
            </Center>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost'>Add</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SearchContactModal;
