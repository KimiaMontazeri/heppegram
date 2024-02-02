import useWebSocket from 'react-use-websocket';
import { getToken } from '../services/token';

const useCustomWebSocket = () => {
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    `ws://localhost:8080/ws/${getToken()}`,
  );

  return { sendJsonMessage, lastJsonMessage, readyState };
};

export default useCustomWebSocket;
