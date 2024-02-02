import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
// import { getToken } from './services/token';
// import useWebSocket from 'react-use-websocket';
import './App.css';

function App() {
  // const { sendMessage, lastMessage, readyState } = useWebSocket(
  //   'ws://localhost:8080/ws',
  // );
  // console.log({ readyState });
  return <RouterProvider router={router} />;
}

export default App;
