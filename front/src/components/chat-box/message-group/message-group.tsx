import { Avatar, Flex, IconButton, Stack, useToast } from '@chakra-ui/react';
import TextMessage from '../text-message';
import { MessageGroupProps } from './message-group.types';
import { DeleteIcon } from '@chakra-ui/icons';
import { customFetch } from '../../../services/fetch';
import useAppStore from '../../../store/app-store';
import { useEffect, useState } from 'react';

const MessageGroup = ({ isFromMe, from, messages }: MessageGroupProps) => {
  const selectedChat = useAppStore((state) => state.selectedChat);
  const toast = useToast();
  const [currentMessages, setCurrentMessages] = useState(messages);
  console.log('message-group', { messages });

  const handleDeleteMessage = async (id: string | undefined) => {
    const { ok } = await customFetch({
      url: `/api/chats/${selectedChat}/messages/${id}`,
      method: 'DELETE',
    });

    if (ok) {
      toast({
        title: 'Message deleted successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      const filtered = messages.filter((message) => {
        return message.id !== id;
      });
      setCurrentMessages(filtered);
    } else {
      toast({
        title: 'An error occurred.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setCurrentMessages(messages);
  }, [messages]);

  if (isFromMe) {
    return (
      <>
        {/* <DeleteMessageModal
          isOpen={deleteMessageModalVisibility}
          onClose={() => setDeleteMessageModalVisibility(false)}
        /> */}
        <Flex justifyContent='flex-end'>
          <Flex gap={2} align='flex-end'>
            <Stack pt={1} alignItems='flex-end' pb={1}>
              {currentMessages.map((message, index) => (
                <Flex align='center'>
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme='red'
                    color='red.400'
                    variant='ghost'
                    isRound
                    aria-label='delete-message'
                    mr={1}
                    onClick={() => handleDeleteMessage(message.id)}
                  />
                  <TextMessage
                    direction='start'
                    showBubble={index === messages.length - 1}
                    timestamp={message.timestamp}
                  >
                    {message.content}
                  </TextMessage>
                </Flex>
              ))}
            </Stack>
            <Avatar name={from.name} src={from.photoUrl} />
          </Flex>
        </Flex>
      </>
    );
  }

  return (
    <Flex gap={2} align='flex-end'>
      <Avatar name={from.name} src={from.photoUrl} />
      <Stack pt={1} alignItems='flex-start' pb={1}>
        {messages.map((message, index) => (
          <TextMessage
            direction='end'
            showBubble={index === messages.length - 1}
            timestamp={message.timestamp}
          >
            {message.content}
          </TextMessage>
        ))}
      </Stack>
    </Flex>
  );
};

export default MessageGroup;
