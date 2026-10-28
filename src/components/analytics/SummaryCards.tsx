import {
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  AccountBalanceWallet,
  TrendingUp,
  TrendingDown,
  Savings,
} from "@mui/icons-material";

import type { AnalyticsSummary } from "../../types/analytics";

interface Props {
  summary: AnalyticsSummary;
}

const SummaryCards = ({ summary }: Props) => {

  const cards = [
    {
      title: "Total Balance",
      value: `₹${summary.totalBalance.toLocaleString()}`,
      icon: <AccountBalanceWallet fontSize="large" />,
      color: "#1976d2",
    },
    {
      title: "Monthly Income",
      value: `₹${summary.monthlyIncome.toLocaleString()}`,
      icon: <TrendingUp fontSize="large" />,
      color: "#2e7d32",
    },
    {
      title: "Monthly Expense",
      value: `₹${summary.monthlyExpense.toLocaleString()}`,
      icon: <TrendingDown fontSize="large" />,
      color: "#d32f2f",
    },
    {
      title: "Savings",
      value: `₹${summary.savings.toLocaleString()}`,
      icon: <Savings fontSize="large" />,
      color: "#ed6c02",
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={card.title}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 4,
            }}
          >
            <CardContent>
              <Typography color="text.secondary">
                {card.title}
              </Typography>

              <Typography
                variant="h5"
                fontWeight="bold"
                mt={1}
              >
                {card.value}
              </Typography>

              <Typography
                mt={2}
                sx={{
                  color: card.color,
                }}
              >
                {card.icon}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryCards;