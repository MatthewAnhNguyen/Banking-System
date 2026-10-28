import { useCallback, useEffect, useState } from "react";
import accountService from "../services/account.service";
import type { Account } from "../types/account";

export default function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      setAccounts(await accountService.getAccounts());
    } catch {
      setError("Không tải được danh sách tài khoản.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchAccounts();
  }, [fetchAccounts]);

  return { accounts, loading, error, fetchAccounts };
}