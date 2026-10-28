import api from "./api";
import type { HistoryPage } from "../types/history";
import type { Transaction } from "../types/transaction";

export async function getHistory(
  page = 0,
  size = 20
): Promise<HistoryPage> {
  const response = await api.get<HistoryPage>("/history", {
    params: { page, size },
  });
  return response.data;
}

export async function getTransaction(id: number): Promise<Transaction> {
  const response = await api.get<Transaction>(`/history/${id}`);
  return response.data;
}