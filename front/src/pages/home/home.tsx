import { Center, Divider, Stack, Text, useToast } from '@chakra-ui/react';
import ChatList from '../../components/chat-list';
import ChatBox from '../../components/chat-box';
import ChatDetails from '../../components/chat-details';
import SideBar from '../../components/side-bar';
// import GroupDetails from '../../components/group-details';
import { customFetch } from '../../services/fetch';
import useChatsStore, { Chats } from '../../store/chats-store';
import { useEffect, useState } from 'react';
import useAppStore from '../../store/app-store';
import useUserStore, { User } from '../../store/user-store';
import { getUserFromChat } from '../../utils/chat';
import useCustomWebSocket from '../../hooks/user-custom-web-socket';
import { ReadyState } from 'react-use-websocket';

function Home() {
  const toast = useToast();
  const [chatList, setChatList] = useState<Chats | null>(null);
  const [chatDetailsData, setChatDetailsData] = useState<User | null>(null);
  const setChats = useChatsStore((state) => state.setChats);
  const chats = useChatsStore((state) => state.chats);
  const username = useUserStore((state) => state.user?.username);
  const selectedChat = useAppStore((state) => state.selectedChat);
  const selectedChatData = useAppStore((state) => state.selectedChatData);
  const user = useUserStore((state) => state.user);

  const { readyState, lastJsonMessage } = useCustomWebSocket();

  if (readyState === ReadyState.CLOSED) {
    toast({
      title: 'An error occurred',
      status: 'error',
      duration: 2000,
      isClosable: true,
    });
  }

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

  const generateChatDetails = () => {
    if (selectedChatData) {
      const user = getUserFromChat(selectedChatData, username);
      setChatDetailsData(user);
    } else {
      setChatDetailsData(null);
    }
  };

  useEffect(() => {
    generateChatDetails();
  }, [selectedChatData]);

  useEffect(() => {
    const chatsTemp = chats;
    if (lastJsonMessage) {
      console.log({ lastJsonMessage });
      const { sender, content, timestamp, chadID } = lastJsonMessage;
      if (chadID !== selectedChat) {
        const foundChatIndex = chatsTemp?.findIndex(
          (chat) => chat.id === chadID,
        );
        if (foundChatIndex && foundChatIndex !== -1 && chatsTemp) {
          const foundChat = chatsTemp[foundChatIndex];
          foundChat.unreadMessageCount =
            (foundChat.unreadMessageCount || 0) + 1;
          chatsTemp[foundChatIndex] = foundChat;
          setChats(chatsTemp);
        } else if (user) {
          chatsTemp?.push({
            id: chadID,
            people: [user, sender as User],
            lastMessage: {
              content,
              timestamp,
              sender: {},
            },
            unreadMessageCount: 1,
          });
        }
      }
    }
  }, [lastJsonMessage]);

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
          <Center p={4} color='purple.500'>
            <Text>You have no chats!</Text>
          </Center>
        )}
      </Stack>
      <Divider orientation='vertical' />
      <Stack flexGrow={2}>
        {selectedChat ? (
          <ChatBox id={selectedChat} />
        ) : (
          <Center height='100vh'>
            <Text fontSize='lg' color='purple.500'>
              No chat selected!
            </Text>
          </Center>
        )}
      </Stack>
      {chatDetailsData && (
        <>
          <Divider orientation='vertical' />
          <Stack flexGrow={1}>
            {chatDetailsData && (
              <ChatDetails
                name={`${chatDetailsData.firstname} ${chatDetailsData.lastname}`}
                image={chatDetailsData.image}
                username={chatDetailsData.username}
                phone={chatDetailsData.phone}
                bio={chatDetailsData.bio}
                // TODO:
                isOnline={false}
              />
            )}
          </Stack>
        </>
      )}
    </Stack>
  );
}

export default Home;
