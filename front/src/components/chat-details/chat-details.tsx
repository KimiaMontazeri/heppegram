import {
  Avatar,
  Center,
  Divider,
  List,
  ListItem,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import type { ChatDetailsProps } from './chat-details.types';

const ChatDetails = ({
  name,
  image,
  isOnline,
  username,
  phone,
  bio,
}: ChatDetailsProps) => {
  const grayTextColor = useColorModeValue('gray.500', 'gray.300');
  return (
    <Stack alignItems='stretch' alignContent='center' height='100vh' py={4}>
      <Center>
        <Avatar size='2xl' name={name} src={image} />
      </Center>
      <Text fontSize='2xl'>{name}</Text>
      <Text fontSize='sm' color={grayTextColor}>
        {isOnline ? 'Online' : 'Offline'}
      </Text>
      <List
        textAlign='start'
        bgColor={useColorModeValue('gray.100', 'gray.700')}
        borderRadius='lg'
        p={2}
        px={3}
        m={4}
      >
        <ListItem>
          <Text fontSize='sm'>Username</Text>
          <Text fontSize='sm' color={grayTextColor}>
            @{username}
          </Text>
        </ListItem>
        <Divider my={2} />
        <ListItem>
          <Text fontSize='sm'>Phone</Text>
          <Text fontSize='sm' color={grayTextColor}>
            {phone}
          </Text>
        </ListItem>
        {bio && (
          <>
            <Divider my={2} />
            <ListItem>
              <Text fontSize='sm'>Bio</Text>
              <Text fontSize='sm' color={grayTextColor}>
                {bio}
              </Text>
            </ListItem>
          </>
        )}
      </List>
    </Stack>
  );
};

export default ChatDetails;
