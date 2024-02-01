import { useEffect, useRef, useState } from 'react';
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
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import MessageGroup from './message-group';
import ChatSettings from './chat-settings';
import type { ChatBoxProps } from './chat-box.types';
import { customFetch } from '../../services/fetch';
import { getImageFromChat, getNameFromChat } from '../../utils/chat';
import useUserStore from '../../store/user-store';
import useAppStore from '../../store/app-store';
import { Message } from '../../store/chats-store';
import { GroupedMessage } from './message-group/message-group.types';
import { groupMessagesBySender } from '../../utils/message';

const ChatBox = ({ id }: ChatBoxProps) => {
  const toast = useToast();
  const bottomRef = useRef<HTMLDivElement>(null);
  const setSelectedChatData = useAppStore((state) => state.setSelectedChatData);
  const username = useUserStore((state) => state.user?.username);
  const [chatName, setChatName] = useState('');
  const [chatImage, setChatImage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [groupedMessages, setGroupedMessages] = useState<GroupedMessage[]>([]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []); // TODO: every time we get a new message, we should run this effect

  const getChatData = async () => {
    const { ok, body } = await customFetch({
      url: `/api/chats/${id}`,
      method: 'GET',
    });

    if (ok) {
      setChatName(getNameFromChat(body, username));
      setChatImage(getImageFromChat(body, username));
      setMessages(body.messages);
      setSelectedChatData(body);
    } else {
      toast({
        title: 'An error occurred while fetching chat data.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setGroupedMessages(groupMessagesBySender(messages));
  }, [messages]);

  useEffect(() => {
    getChatData();
  }, [id]);

  return (
    <Stack
      px={4}
      height='100vh'
      justifyContent='space-between'
      overflow='scroll'
    >
      <Box
        position='sticky'
        top={0}
        bgColor={useColorModeValue('BlackAlpha.50', 'BlackAlpha.50')}
      >
        <Flex justify='space-between' align='center'>
          <Flex alignItems='center' gap={2} py={4}>
            <Avatar name={chatName} src={chatImage} />
            <Heading as='h2' size='md'>
              {chatName}
            </Heading>
          </Flex>
          <ChatSettings />
        </Flex>
        <Divider />
      </Box>
      <Box>
        {groupedMessages.map((groupedMessage) => (
          <MessageGroup
            from={groupedMessage.from}
            isFromMe={groupedMessage.from.username === username}
            messages={groupedMessage.messages}
          />
        ))}

        <div ref={bottomRef} />
        {/* footer */}
        <Flex
          py={4}
          gap={2}
          position='sticky'
          bottom={0}
          bgColor={useColorModeValue('BlackAlpha.50', 'BlackAlpha.50')}
        >
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
