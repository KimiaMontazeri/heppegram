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
          <Flex gap={2}>
            <Stack pt={1} alignItems='flex-end'>
              {messages.map((text) => (
                <Flex>
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
                  <TextMessage>{text}</TextMessage>
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
    <Flex gap={2}>
      <Avatar name={from.name} src={from.photoUrl} />
      <Stack pt={1} alignItems='flex-start'>
        {messages.map((text) => (
          <TextMessage>{text}</TextMessage>
        ))}
      </Stack>
    </Flex>
  );
};

export default MessageGroup;
