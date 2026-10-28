export type TransactionType = "DEPOSIT" | "WITHDRAWAL" | "TRANSFER";
export type TransactionStatus = "SUCCESS";

export interface Transaction {
  id: number;
  transactionType: TransactionType;
  amount: number;
  transactionDate: string;
  status: TransactionStatus;
  sourceAccountNumber: string | null;
  targetAccountNumber: string | null;
}

export interface AccountTransactionRequest {
  accountNumber: string;
  amount: number;
}

export interface TransferRequest {
  sourceAccountNumber: string;
  targetAccountNumber: string;
  amount: number;
}