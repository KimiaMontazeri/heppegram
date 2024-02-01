export function getUsername(): string | undefined {
  return window.localStorage.getItem('username') || undefined;
}

export function setUsername(username: string): void {
  window.localStorage.setItem('username', username);
}

export function removeUsername() {
  localStorage.removeItem('username');
}
