import type { AccountStatus, AccountType } from "./account";
import type { PageResponse } from "./history";

export type UserStatus = "ACTIVE" | "DISABLED";
export type UserRole = "USER" | "ADMIN";

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

export interface AdminAccount {
  id: number;
  accountNumber: string;
  balance: number;
  accountType: AccountType;
  status: AccountStatus;
  createdAt: string;
  userId: number;
  username: string;
  email: string;
}

export interface AdminCreateUserRequest {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  status: UserStatus;
}

export interface AdminUpdateUserRequest {
  username: string;
  email: string;
  password?: string;
  role: UserRole;
  status: UserStatus;
}

export interface AdminCreateAccountRequest {
  userId: number;
  accountType: AccountType;
  balance: number;
  status: AccountStatus;
}

export interface AdminUpdateAccountRequest {
  accountType: AccountType;
  balance: number;
  status: AccountStatus;
}

export type AdminUserPage = PageResponse<AdminUser>;
export type AdminAccountPage = PageResponse<AdminAccount>;