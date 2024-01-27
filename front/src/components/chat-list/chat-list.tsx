import { EditIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from '@chakra-ui/react';

const ChatList = () => {
  return (
    <Stack px={4}>
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
  );
};

export default ChatList;
