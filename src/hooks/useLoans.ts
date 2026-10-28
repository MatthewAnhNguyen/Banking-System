import { useEffect, useState } from "react";

import type { Loan } from "../types/loan";

import { getMyLoans } from "../services/loan.service";

export function useLoans() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
  try {
    setLoading(true);

    const data = await getMyLoans();

    console.log("Loans fetched:", data);

    setLoans(data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    refresh();
  }, []);

  return {
    loans,
    loading,
    refresh,
  };
}