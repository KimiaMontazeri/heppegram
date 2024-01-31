import { Divider, Stack } from '@chakra-ui/react';
import ChatList from '../../components/chat-list';
import ChatBox from '../../components/chat-box';
import ChatDetails from '../../components/chat-details';
import SideBar from '../../components/side-bar';
import GroupDetails from '../../components/group-details';
import useUserStore from '../../store/user-store';

function Home() {
  const user = useUserStore((state) => state.user);
  console.log({ user });
  /* 
    Get the below items from the store
    - profile data
    - current open chat data (if none, show an empty chat box)
      - messages
      - other people's data
  */
  return (
    <Stack
      flexDirection='row'
      justifyContent='space-evenly'
      gap={0}
      alignItems='stretch'
      height='100vh'
    >
      <Stack flexGrow={0.25}>
        <SideBar />
      </Stack>
      <Divider orientation='vertical' />
      <Stack flexGrow={1}>
        <ChatList />
      </Stack>
      <Divider orientation='vertical' />
      <Stack flexGrow={2}>
        <ChatBox />
      </Stack>
      <Divider orientation='vertical' />
      <Stack flexGrow={1}>
        <ChatDetails
          name='Kent Dodds'
          image='https://bit.ly/kent-c-dodds'
          isOnline
          username='@kentdodds'
          phone='09123484996'
          bio='I`m so cool!'
        />
        {/* <GroupDetails
          groupImage='https://bit.ly/kent-c-dodds'
          groupName='group'
        /> */}
      </Stack>
    </Stack>
  );
}

export default Home;
