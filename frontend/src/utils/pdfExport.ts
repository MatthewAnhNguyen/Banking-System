import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type {
  AnalyticsSummary,
  RecentTransaction,
} from "../types/analytics";

export const exportAnalyticsPDF = (
  summary: AnalyticsSummary,
  rows: RecentTransaction[]
) => {
  const doc = new jsPDF();

  // ===== Title =====
  doc.setFontSize(20);
  doc.text("Enterprise Banking System", 14, 20);

  doc.setFontSize(15);
  doc.text("Analytics Report", 14, 30);

  // ===== Summary =====
  doc.setFontSize(12);

  doc.text(`Total Balance : ₹${summary.totalBalance}`, 14, 45);
  doc.text(`Monthly Income : ₹${summary.monthlyIncome}`, 14, 55);
  doc.text(`Monthly Expense : ₹${summary.monthlyExpense}`, 14, 65);
  doc.text(`Savings : ₹${summary.savings}`, 14, 75);
  doc.text(`Transactions : ${summary.totalTransactions}`, 14, 85);

  // ===== Transactions Table =====
  autoTable(doc, {
    startY: 95,
    head: [["Transaction", "Amount", "Date"]],
    body: rows.map((row) => [
      row.type,
      `₹${row.amount}`,
      row.transactionDate,
    ]),
  });

  doc.save("Analytics_Report.pdf");
};