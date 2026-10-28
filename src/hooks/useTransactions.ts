import { useCallback, useEffect, useState } from "react";
import { getHistory } from "../services/history.service";
import type { HistoryPage } from "../types/history";

export default function useTransactions(page = 0, size = 20) {
  const [history, setHistory] = useState<HistoryPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      setHistory(await getHistory(page, size));
    } catch {
      setError("Không tải được lịch sử giao dịch.");
    } finally {
      setLoading(false);
    }
  }, [page, size]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    transactions: history?.content ?? [],
    history,
    loading,
    error,
    refresh,
  };
}