import api from "./api";

import type {
  AnalyticsSummary,
  MonthlyData,
  CategoryExpense,
  RecentTransaction,
  MonthlyTrend,
} from "../types/analytics";

export const getSummary = async (): Promise<AnalyticsSummary> => {
  const response = await api.get<AnalyticsSummary>(
    "/analytics/summary"
  );

  return response.data;
};

export const getMonthlyIncomeExpense = async (): Promise<MonthlyData[]> => {
  const response = await api.get<MonthlyData[]>(
    "/analytics/monthly-income-expense"
  );

  return response.data;
};

export const getCategoryExpenses = async (): Promise<CategoryExpense[]> => {
  const response = await api.get<CategoryExpense[]>(
    "/analytics/category-expenses"
  );

  return response.data;
};

export const getRecentTransactions = async (): Promise<RecentTransaction[]> => {
  const response = await api.get<RecentTransaction[]>(
    "/analytics/recent-transactions"
  );

  return response.data;
};

export const getMonthlyTrend = async (): Promise<MonthlyTrend[]> => {
  const response = await api.get<MonthlyTrend[]>(
    "/analytics/monthly-trend"
  );

  return response.data;
};