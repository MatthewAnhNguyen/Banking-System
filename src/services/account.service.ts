import api from "./api";
import type { Account } from "../types/account";
import type { CreateAccountRequest } from "../types/createAccount";

const accountService = {
  async getAccounts(): Promise<Account[]> {
    const response = await api.get<Account[]>("/accounts/me");
    return response.data;
  },

  async createAccount(data: CreateAccountRequest): Promise<Account> {
    const response = await api.post<Account>("/accounts", data);
    return response.data;
  },
};

export default accountService;