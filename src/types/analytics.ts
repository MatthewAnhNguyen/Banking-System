export interface AnalyticsSummary {
    totalBalance: number;
    monthlyIncome: number;
    monthlyExpense: number;
    savings: number;
    totalTransactions: number;
}

export interface MonthlyData {
    month: string;
    income: number;
    expense: number;
}

export interface CategoryExpense {
    category: string;
    amount: number;
}
export interface RecentTransaction {

    id:number;

    type:string;

    amount:number;

    transactionDate:string;
}
export interface MonthlyTrend {
    month: string;
    income: number;
    expense: number;
}
export interface AnalyticsResponse {
  months: string[];
  deposits: number[];
  withdrawals: number[];
  transfers: number[];
}