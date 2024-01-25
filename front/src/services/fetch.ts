import { handleRefreshToken } from './http-client';

export type FetchParams = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  payload?: object;
};

export async function customFetch(
  { url, method, payload }: FetchParams,
  token: string,
): Promise<Response> {
  let data = await fetch(url, {
    method,
    headers: {
      Authorization: `${token}`,
      'content-type': 'application/json',
    },
    ...(payload && { body: JSON.stringify(payload) }),
  });

  if (data.status === 401) {
    const newToken = await handleRefreshToken();

    if (newToken) {
      data = await fetch(url, {
        method,
        headers: {
          Authorization: `${newToken}`,
          'content-type': 'application/json',
        },
        ...(payload && { body: JSON.stringify(payload) }),
      });
    }
  }

  return data;
}
