import { Avatar, Flex, IconButton, Stack } from '@chakra-ui/react';
import TextMessage from '../text-message';
import { MessageGroupProps } from './message-group.types';
import { DeleteIcon } from '@chakra-ui/icons';
import DeleteMessageModal from '../../delete-message-modal/';
import { useState } from 'react';

const MessageGroup = ({ isFromMe, from, messages }: MessageGroupProps) => {
  const [deleteMessageModalVisibility, setDeleteMessageModalVisibility] =
    useState(false);

  if (isFromMe) {
    return (
      <>
        <DeleteMessageModal
          isOpen={deleteMessageModalVisibility}
          onClose={() => setDeleteMessageModalVisibility(false)}
        />
        <Flex justifyContent='flex-end'>
          <Flex gap={2} align='flex-end'>
            <Stack pt={1} alignItems='flex-end' pb={1}>
              {messages.map((message, index) => (
                <Flex align='center'>
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme='red'
                    color='red.400'
                    variant='ghost'
                    isRound
                    aria-label='delete-message'
                    mr={1}
                    onClick={() => setDeleteMessageModalVisibility(true)}
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
