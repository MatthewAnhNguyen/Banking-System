import api from "./api";
import type { Transaction } from "../types/transaction";

export const getTransactionByReference = async (
  transactionId: number
): Promise<Transaction> => {
  const response = await api.get<Transaction>(`/history/${transactionId}`);
  return response.data;
};
