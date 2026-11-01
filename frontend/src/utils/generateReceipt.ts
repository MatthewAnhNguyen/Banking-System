import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Transaction } from "../types/transaction";

export const generateReceipt = (transaction: Transaction) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Enterprise Banking System", 20, 20);

  doc.setFontSize(14);
  doc.text("Transaction Receipt", 20, 32);

  autoTable(doc, {
    startY: 45,
    body: [
      ["Transaction ID", String(transaction.id)],
      ["Transaction Type", transaction.transactionType],
      ["Amount", Number(transaction.amount).toLocaleString("vi-VN", { style: "currency", currency: "VND" })],
      ["Date", transaction.transactionDate],
      ["Source Account", transaction.sourceAccountNumber ?? "-"],
      ["Target Account", transaction.targetAccountNumber ?? "-"],
      ["Status", transaction.status],
    ],
  });

  doc.save(`Receipt-${transaction.id}.pdf`);
};
