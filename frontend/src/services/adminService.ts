import api from "./api";
import type {
  AdminAccount,
  AdminAccountPage,
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

  async updateUserStatus(id: number, status: UserStatus): Promise<AdminUser> {
    const response = await api.patch<AdminUser>(
      `/admin/users/${id}/status`,
      { status }
    );
    return response.data;
  },

  async getAccounts(page = 0, size = 20): Promise<AdminAccountPage> {
    const response = await api.get<AdminAccountPage>("/admin/accounts", {
      params: { page, size },
    });
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
};

export default adminService;