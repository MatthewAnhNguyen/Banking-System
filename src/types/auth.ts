export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  tokenType: "Bearer";
  accessToken: string;
  expiresInSeconds: number;
  userId: number;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  id: number;
  username: string;
  email: string;
  message: string;
}