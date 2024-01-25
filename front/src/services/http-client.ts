import { customFetch, type FetchParams } from './fetch';
import { getRefreshToken, getToken, setRefreshToken, setToken } from './token';

export interface ApiResponse<T> {
  status?: number;
  result: T;
}

export type ApiResponsePromise<T> = Promise<ApiResponse<T>>;

/* CONSTANTS */
const BASE_URL = 'BASE_URL'; // TODO: specify base url

export async function handleRefreshToken(): Promise<string | null> {
  const token = getToken();
  const refreshToken = getRefreshToken();

  if (!token) {
    return null;
  }

  try {
    const data = await fetch(`${BASE_URL}/refresh-token-endpoint`, {
      method: 'POST',
      headers: {
        Authorization: `${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    const refreshData = await data.json();

    if (refreshData.data.token) {
      setToken(refreshData.data.token);
      setRefreshToken(refreshData.data.refresh_token);

      return refreshData.data.token;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function post<T = any>(
  url: string,
  token: string,
  payload?: FetchParams['payload'],
): Promise<ApiResponse<T>> {
  const args: FetchParams = {
    url: `${BASE_URL}${url}`,
    method: 'POST',
    payload,
  };

  const data = await customFetch(args, token);
  const result = await data.json();
  const { status } = data;

  return { result, status };
}

async function get<T = any>(
  url: string,
  token: string,
): Promise<ApiResponse<T>> {
  const args: FetchParams = {
    url: `${BASE_URL}${url}`,
    method: 'GET',
  };
  const data = await customFetch(args, token);
  const result = await data.json();
  const { status } = data;

  return { result, status };
}

async function put<T = any>(
  url: string,
  token: string,
  payload?: FetchParams['payload'],
): Promise<ApiResponse<T>> {
  const args: FetchParams = {
    url: `${BASE_URL}${url}`,
    method: 'PUT',
    payload,
  };

  const data = await customFetch(args, token);
  const result = await data.json();
  const { status } = data;

  return { result, status };
}

async function patch<T = any>(
  url: string,
  token: string,
  payload?: FetchParams['payload'],
): Promise<ApiResponse<T>> {
  const args: FetchParams = {
    url: `${BASE_URL}${url}`,
    method: 'PATCH',
    payload,
  };
  const data = await customFetch(args, token);
  const result = await data.json();
  const { status } = data;

  return { result, status };
}

async function remove<T = any>(
  url: string,
  token: string,
  payload?: FetchParams['payload'],
): Promise<ApiResponse<T>> {
  const args: FetchParams = {
    url: `${BASE_URL}${url}`,
    method: 'DELETE',
    payload,
  };

  const data = await customFetch(args, token);
  const result = await data.json();
  const { status } = data;

  return { result, status };
}

export { post, get, put, patch, remove };
