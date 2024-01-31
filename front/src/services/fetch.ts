import { getToken } from './token';
// import { handleRefreshToken } from './http-client';

export type FetchParams = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  payload?: object;
  sendCredentials?: boolean;
};

export type FetchResponse = {
  ok: boolean;
  status: number;
  body: any;
};

export async function customFetch({
  url,
  method,
  payload,
  sendCredentials = true,
}: FetchParams): Promise<FetchResponse> {
  const token = getToken();
  const headers = {
    Authorization: sendCredentials && token ? token : '',
    'content-type': 'application/json',
  };

  const response = await fetch(url, {
    method,
    headers,
    ...(payload && { body: JSON.stringify(payload) }),
  });

  const responseBody = await response.json();

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

  return {
    ok: response.ok,
    status: response.status,
    body: responseBody,
  };
}
