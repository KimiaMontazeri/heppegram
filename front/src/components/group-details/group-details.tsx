import {
  Avatar,
  Center,
  List,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { GroupDetailsProps } from './group-details.types';
import GroupMember from './group-member';

const GroupDetails = ({ groupName, groupImage }: GroupDetailsProps) => {
  return (
    <Stack alignItems='stretch' alignContent='center' height='100vh' py={4}>
      <Center>
        <Avatar size='2xl' name={groupName} src={groupImage} />
      </Center>
      <Text fontSize='2xl'>{groupName}</Text>
      <List
        textAlign='start'
        bgColor={useColorModeValue('gray.100', 'gray.700')}
        borderRadius='lg'
        p={2}
        px={3}
        m={4}
        overflow='scroll'
      >
        <GroupMember
          name='Dan Abrahmov'
          username='@dan123'
          image='https://bit.ly/dan-abramov'
          isOnline
        />
        <GroupMember isOnline name='Kimia Montazeri' username='@kimimtz' />
        <GroupMember name='Farhad Aman' username='@farhad' />
      </List>
    </Stack>
  );
};

export default GroupDetails;
