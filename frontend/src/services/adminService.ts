import api from "./api";
import type {
  AdminAccount,
  AdminAccountPage,
  AdminCreateAccountRequest,
  AdminCreateUserRequest,
  AdminUpdateAccountRequest,
  AdminUpdateUserRequest,
  AdminUser,
  AdminUserPage,
  UserStatus,
} from "../types/admin";
import type { AccountStatus } from "../types/account";

const adminService = {
  async getUsers(page = 0, size = 20): Promise<AdminUserPage> {
    const response = await api.get<AdminUserPage>("/admin/users", {
      params: { page, size },
    });
    return response.data;
  },

  async createUser(data: AdminCreateUserRequest): Promise<AdminUser> {
    const response = await api.post<AdminUser>("/admin/users", data);
    return response.data;
  },

  async updateUser(id: number, data: AdminUpdateUserRequest): Promise<AdminUser> {
    const response = await api.put<AdminUser>(`/admin/users/${id}`, data);
    return response.data;
  },

  async updateUserStatus(id: number, status: UserStatus): Promise<AdminUser> {
    const response = await api.patch<AdminUser>(
      `/admin/users/${id}/status`,
      { status }
    );
    return response.data;
  },

  async deleteUser(id: number): Promise<void> {
    await api.delete(`/admin/users/${id}`);
  },

  async getAccounts(page = 0, size = 20): Promise<AdminAccountPage> {
    const response = await api.get<AdminAccountPage>("/admin/accounts", {
      params: { page, size },
    });
    return response.data;
  },

  async createAccount(data: AdminCreateAccountRequest): Promise<AdminAccount> {
    const response = await api.post<AdminAccount>("/admin/accounts", data);
    return response.data;
  },

  async updateAccount(
    id: number,
    data: AdminUpdateAccountRequest
  ): Promise<AdminAccount> {
    const response = await api.put<AdminAccount>(`/admin/accounts/${id}`, data);
    return response.data;
  },

  async updateAccountStatus(
    id: number,
    status: AccountStatus
  ): Promise<AdminAccount> {
    const response = await api.patch<AdminAccount>(
      `/admin/accounts/${id}/status`,
      { status }
    );
    return response.data;
  },

  async deleteAccount(id: number): Promise<void> {
    await api.delete(`/admin/accounts/${id}`);
  },
};

export default adminService;