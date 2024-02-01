import { Center, Divider, Stack, Text, useToast } from '@chakra-ui/react';
import ChatList from '../../components/chat-list';
// import ChatBox from '../../components/chat-box';
// import ChatDetails from '../../components/chat-details';
import SideBar from '../../components/side-bar';
// import GroupDetails from '../../components/group-details';
import { customFetch } from '../../services/fetch';
import useChatsStore, { Chats } from '../../store/chats-store';
import { useEffect, useState } from 'react';
import useAppStore from '../../store/app-store';

function Home() {
  const toast = useToast();
  const [chatList, setChatList] = useState<Chats | null>(null);
  const setChats = useChatsStore((state) => state.setChats);
  const chats = useChatsStore((state) => state.chats);
  const selectedChat = useAppStore((state) => state.selectedChat);

  const getChats = async () => {
    const { ok, body } = await customFetch({
      url: '/api/chats',
      method: 'GET',
    });

    if (ok) {
      setChats(body);
      setChatList(body);
    } else {
      toast({
        title: 'An error occurred while fetching chats.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getChats();
  }, []);

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
        {chats ? (
          <ChatList selectedChatId={selectedChat} chats={chats} />
        ) : chatList && chatList.length !== 0 ? (
          <ChatList selectedChatId={selectedChat} chats={chatList} />
        ) : (
          <Center p={4}>
            <Text>You have no chats!</Text>
          </Center>
        )}
        {/* {chatList && <ChatList chats={chatList} />} */}
      </Stack>
      <Divider orientation='vertical' />
      {/* <Stack flexGrow={2}>
        <ChatBox />
      </Stack> */}
      <Divider orientation='vertical' />
      {/* <Stack flexGrow={1}>
        <ChatDetails
          name='Kent Dodds'
          image='https://bit.ly/kent-c-dodds'
          isOnline
          username='@kentdodds'
          phone='09123484996'
          bio='I`m so cool!'
        />
        <GroupDetails
          groupImage='https://bit.ly/kent-c-dodds'
          groupName='group'
        />
      </Stack> */}
    </Stack>
  );
}

export default Home;
