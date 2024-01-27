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
      <Stack bgColor='papayawhip' flexGrow={1}>
        <ChatDetails />
      </Stack>
    </Stack>
  );
}

export default Home;
