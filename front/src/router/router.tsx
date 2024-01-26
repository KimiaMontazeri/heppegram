import { Outlet, createBrowserRouter } from 'react-router-dom';
import Signup from '../pages/signup';
import Home from '../pages/home';
import { TokenGuard } from './guards/token-guard';

export const router = createBrowserRouter([
  // authorized paths:
  {
    path: '/',
    element: (
      <TokenGuard>
        <Outlet />
      </TokenGuard>
    ),
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      // { TODO: implement other paths
      //   path: '/profile',
      //   element: <Profile />,
      // },
    ],
  },
  // unauthorized paths
  // {
  //   path: '/login',
  //   element: <Login />,
  // },
  {
    path: '/signup',
    element: <Signup />,
  },
]);
