import { Grid, Paper, Typography } from "@mui/material";
import type { Transaction } from "../../types/transaction";

interface Props {
  transactions: Transaction[];
}

export default function TransactionCards({
  transactions,
}: Props) {
  const totalTransactions = transactions.length;

  const deposits = transactions.filter(
    (t) => t.transactionType === "DEPOSIT"
  ).length;

  const withdrawals = transactions.filter(
    (t) => t.transactionType === "WITHDRAWAL"
  ).length;

  const transfers = transactions.filter(
    (t) =>
      t.transactionType === "TRANSFER"
  ).length;

  const cards = [
    {
      title: "Total Transactions",
      value: totalTransactions,
    },
    {
      title: "Deposits",
      value: deposits,
    },
    {
      title: "Withdrawals",
      value: withdrawals,
    },
    {
      title: "Transfers",
      value: transfers,
    },
  ];

  return (
    <Grid container spacing={3} mb={3}>
      {cards.map((card) => (
        <Grid
          key={card.title}
          size={{ xs: 12, sm: 6, md: 3 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 3,
              textAlign: "center",
            }}
          >
            <Typography
              variant="subtitle2"
              color="text.secondary"
            >
              {card.title}
            </Typography>

            <Typography
              variant="h4"
              fontWeight={700}
            >
              {card.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
