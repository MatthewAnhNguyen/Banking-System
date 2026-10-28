import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";

import SummaryCards from "../../components/analytics/SummaryCards";
import IncomeExpenseChart from "../../components/analytics/IncomeExpenseChart";
import ExpensePieChart from "../../components/analytics/ExpensePieChart";
import TransactionTrendChart from "../../components/analytics/TransactionTrendChart";
import RecentTransactions from "../../components/analytics/RecentTransactions";

import {
  getSummary,
  getMonthlyIncomeExpense,
  getCategoryExpenses,
  getRecentTransactions,
  getMonthlyTrend,
} from "../../services/analyticsService";

import type {
  AnalyticsSummary,
  MonthlyData,
  CategoryExpense,
  RecentTransaction,
  MonthlyTrend,
} from "../../types/analytics";

const Analytics = () => {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [monthly, setMonthly] = useState<MonthlyData[]>([]);
  const [categories, setCategories] = useState<CategoryExpense[]>([]);
  const [transactions, setTransactions] = useState<RecentTransaction[]>([]);
  const [trend, setTrend] = useState<MonthlyTrend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const [
          summaryData,
          monthlyData,
          categoryData,
          transactionData,
          trendData,
        ] = await Promise.all([
          getSummary(),
          getMonthlyIncomeExpense(),
          getCategoryExpenses(),
          getRecentTransactions(),
          getMonthlyTrend(),
        ]);

        setSummary(summaryData);
        setMonthly(monthlyData);
        console.log("Monthly Data:", monthlyData);
        setCategories(categoryData);
        setTransactions(transactionData);
        setTrend(trendData);
      } catch (error) {
        console.error("Failed to load analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 30 }}>
        <h2>Loading Analytics...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: 30 }}>
      <h1
        style={{
          marginBottom: 30,
          fontWeight: 700,
        }}
      >
        Analytics Dashboard
      </h1>

      {summary && (
        <>
          {/* Summary Cards */}
          <SummaryCards summary={summary} />

          {/* Charts */}
          <Grid
            container
            spacing={3}
            sx={{ mt: 2 }}
          >
            <Grid size={{ xs: 12, md: 8 }}>
              <IncomeExpenseChart data={monthly} />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <ExpensePieChart data={categories} />
            </Grid>
          </Grid>

          {/* Transaction Trend */}
          <Grid
            container
            spacing={3}
            sx={{ mt: 2 }}
          >
            <Grid size={{ xs: 12 }}>
              <TransactionTrendChart data={trend} />
            </Grid>
          </Grid>

          {/* Recent Transactions */}
          <RecentTransactions
  rows={transactions}
  summary={summary}
/>
        </>
      )}
    </div>
  );
};

export default Analytics;