import api from "./api";
import type {
  AccountTransactionRequest,
  Transaction,
  TransferRequest,
} from "../types/transaction";

export async function deposit(
  request: AccountTransactionRequest
): Promise<Transaction> {
  const response = await api.post<Transaction>(
    "/transactions/deposit",
    request
  );
  return response.data;
}

export async function withdraw(
  request: AccountTransactionRequest
): Promise<Transaction> {
  const response = await api.post<Transaction>(
    "/transactions/withdraw",
    request
  );
  return response.data;
}

export async function transferMoney(
  request: TransferRequest
): Promise<Transaction> {
  const response = await api.post<Transaction>(
    "/transactions/transfer",
    request
  );
  return response.data;
}