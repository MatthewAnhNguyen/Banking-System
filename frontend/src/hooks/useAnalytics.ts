import { useEffect, useState } from "react";
import { getAnalytics } from "../services/analytics.service";
import type { AnalyticsResponse } from "../types/analytics";

export default function useAnalytics() {
  const [analytics, setAnalytics] =
    useState<AnalyticsResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {

    let cancelled = false;

    const loadAnalytics = async () => {

      try {

        const data = await getAnalytics();

        if (!cancelled) {
          setAnalytics(data);
        }

      } catch (err) {

        console.error(err);

        if (!cancelled) {
          setError("Failed to load analytics");
        }

      } finally {

        if (!cancelled) {
          setLoading(false);
        }

      }

    };

    void loadAnalytics();

    return () => {
      cancelled = true;
    };

  }, []);

  return {
    analytics,
    loading,
    error,
  };
}