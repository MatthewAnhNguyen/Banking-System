import api from "./api";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types/auth";

export async function login(request: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/auth/login", request);
  return response.data;
}

export async function register(
  request: RegisterRequest
): Promise<RegisterResponse> {
  const response = await api.post<RegisterResponse>("/auth/register", request);
  return response.data;
}