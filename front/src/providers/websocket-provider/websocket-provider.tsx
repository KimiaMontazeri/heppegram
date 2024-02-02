// import { type ReactNode } from 'react';
// import useWebSocket, { ReadyState } from 'react-use-websocket';
// import { getUsername } from '../../services/user';
// import { getToken } from '../../services/token';

// const WebSocketProvider = ({ children }: { children: ReactNode }) => {
//   const { sendJsonMessage, lastMessage, readyState } = useWebSocket(
//     `ws://localhost:8080/ws/${getToken()}`,
//   );

//   // You can expose the WebSocket functionality via context if needed

//   return <>{children}</>;
// };

// export default WebSocketProvider;
