import {
  Avatar,
  AvatarBadge,
  Flex,
  IconButton,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import type { PersonProps } from './person.types';
import { MinusIcon } from '@chakra-ui/icons';

const Person = ({ name, username, image, isOnline }: PersonProps) => {
  const grayTextColor = useColorModeValue('gray.500', 'gray.300');
  return (
    <Flex justify='space-between' align='center'>
      <Flex align='center' gap={2} py={2}>
        <Avatar size='sm' name={name} src={image}>
          {isOnline ? (
            <AvatarBadge boxSize='1em' bg='green.500' />
          ) : isOnline === false ? (
            <AvatarBadge boxSize='1em' bg='red.500' />
          ) : null}
        </Avatar>
        <Stack gap={0}>
          <Text>{name}</Text>
          <Text color={grayTextColor} fontSize='sm'>
            {username}
          </Text>
        </Stack>
      </Flex>
      <Tooltip label='Remove'>
        <IconButton
          icon={<MinusIcon />}
          colorScheme='red'
          size='sm'
          variant='ghost'
          aria-label='remove'
        />
      </Tooltip>
    </Flex>
  );
};

export default Person;
