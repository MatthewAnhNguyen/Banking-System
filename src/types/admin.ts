import type { AccountStatus, AccountType } from "./account";
import type { PageResponse } from "./history";

export type UserStatus = "ACTIVE" | "DISABLED";

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: "USER" | "ADMIN";
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

export type AdminUserPage = PageResponse<AdminUser>;
export type AdminAccountPage = PageResponse<AdminAccount>;