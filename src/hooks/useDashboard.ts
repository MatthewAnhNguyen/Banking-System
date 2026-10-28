import { useEffect, useState } from "react";
import accountService from "../services/account.service";
import { getHistory } from "../services/history.service";

interface DashboardSummary {
  totalBalance: number;
  totalAccounts: number;
  totalTransactions: number;
}

export default function useDashboard() {
  const [dashboard, setDashboard] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      try {
        const [accounts, history] = await Promise.all([
          accountService.getAccounts(),
          getHistory(0, 1),
        ]);

        if (!active) return;

        setDashboard({
          totalBalance: accounts.reduce(
            (total, account) => total + account.balance,
            0
          ),
          totalAccounts: accounts.length,
          totalTransactions: history.totalElements,
        });
      } catch {
        if (active) {
          setError("Không tải được dữ liệu tổng quan.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadDashboard();

    return () => {
      active = false;
    };
  }, []);

  return { dashboard, loading, error };
}