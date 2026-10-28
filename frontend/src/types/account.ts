export type AccountType = "SAVINGS" | "CHECKING";
export type AccountStatus = "ACTIVE" | "BLOCKED";

export interface Account {
  id: number;
  accountNumber: string;
  balance: number;
  accountType: AccountType;
  status: AccountStatus;
  createdAt: string;
}