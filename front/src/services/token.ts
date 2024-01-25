export function getToken(): string | null {
  return window.localStorage.getItem('token');
}

export function getRefreshToken(): string | null {
  return window.localStorage.getItem('refreshToken');
}

export function setToken(token: string): void {
  window.localStorage.setItem('token', token);
}

export function setRefreshToken(refreshToken: string): void {
  window.localStorage.setItem('refreshToken', refreshToken);
}

export function removeToken() {
  localStorage.removeItem('token');
}

export function removeRefreshToken() {
  localStorage.removeItem('refreshToken');
}
