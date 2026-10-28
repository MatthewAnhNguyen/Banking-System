const TOKEN_KEY = "jwtToken";
const ROLE_KEY = "bankingRole";

export type UserRole = "USER" | "ADMIN";

export function saveAuth(token: string, role: UserRole): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLE_KEY, role);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRole(): UserRole | null {
  const role = localStorage.getItem(ROLE_KEY);
  return role === "USER" || role === "ADMIN" ? role : null;
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
}

export function isAuthenticated(): boolean {
  return getToken() !== null;
}