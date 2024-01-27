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
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import ChatItem from './chat-item';

const ChatList = () => {
  return (
    <Box px={4}>
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
          <IconButton
            icon={<EditIcon />}
            size='sm'
            isRound
            aria-label='new-message'
            shadow='xl'
          />
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
