import { getToken } from './token';
// import { handleRefreshToken } from './http-client';

export type FetchParams = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  payload?: object;
  sendCredentials?: boolean;
};

export async function customFetch({
  url,
  method,
  payload,
  sendCredentials = true,
}: FetchParams): Promise<Response> {
  const token = getToken();
  const headers = {
    Authorization: sendCredentials && token ? token : '',
    'content-type': 'application/json',
  };

  const data = await fetch(url, {
    method,
    headers,
    ...(payload && { body: JSON.stringify(payload) }),
  });

  // if (data.status === 401) {
  //   const newToken = await handleRefreshToken();

  //   if (newToken) {
  //     data = await fetch(url, {
  //       method,
  //       headers: {
  //         Authorization: `${newToken}`,
  //         'content-type': 'application/json',
  //       },
  //       ...(payload && { body: JSON.stringify(payload) }),
  //     });
  //   }
  // }

  return data;
}
