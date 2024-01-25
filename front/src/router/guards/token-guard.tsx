import { getToken } from '../../services/token';

export function TokenGuard({ children }: { children: JSX.Element }) {
  const token = getToken();

  if (!token) {
    return <p>Error 401: Unauthorized</p>;
  }

  return children;
}
