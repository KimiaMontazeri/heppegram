import { Divider, Stack } from '@chakra-ui/react';
import ChatList from '../../components/chat-list';
import ChatBox from '../../components/chat-box';
import ChatDetails from '../../components/chat-details';
import SideBar from '../../components/side-bar';

function Home() {
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
      </Stack>
    </Stack>
  );
}

export default Home;
