import { useEffect, useRef } from 'react';
import { ArrowForwardIcon, AttachmentIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import MessageGroup from './message-group';

const ChatBox = () => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []); // TODO: every time we get a new message, we should run this effect

  return (
    <Stack
      px={4}
      height='100vh'
      justifyContent='space-between'
      overflow='scroll'
    >
      <Box position='sticky' top={0} bgColor='Background'>
        <Flex alignItems='center' gap={2} py={4}>
          <Avatar name='Kent Dodds' src='https://bit.ly/kent-c-dodds' />
          <Heading as='h2' size='md'>
            Kent Dodds
          </Heading>
        </Flex>
        <Divider />
      </Box>
      <Box>
        <MessageGroup
          isFromMe
          from={{
            name: 'Dan Abrahmov',
            photoUrl: 'https://bit.ly/dan-abramov',
          }}
          messages={['hello', 'how are you?']}
        />
        <MessageGroup
          isFromMe={false}
          from={{
            name: 'Kent Dodds',
            photoUrl: 'https://bit.ly/kent-c-dodds',
          }}
          messages={['hi', 'Im fine how are you?', 'blah blah']}
        />

        <div ref={bottomRef} />
        {/* footer */}
        <Flex py={4} gap={2} position='sticky' bottom={0} bgColor='Background'>
          <IconButton
            icon={<AttachmentIcon />}
            aria-label='attachment-icon'
            variant='ghost'
          />
          <InputGroup variant='filled'>
            <Input placeholder='Type a message...' />
            <InputRightElement>
              <IconButton
                icon={<ArrowForwardIcon />}
                variant='ghost'
                aria-label='send-icon'
                color='ButtonText'
              />
            </InputRightElement>
          </InputGroup>
        </Flex>
      </Box>
    </Stack>
  );
};

export default ChatBox;
