import {
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import type { Account } from "../../types/account";

interface Props {
  accounts: Account[];
}

export default function AccountSummary({ accounts }: Props) {
  const totalAccounts = accounts.length;

  const savingsAccounts = accounts.filter(
    (a) => a.accountType === "SAVINGS"
  ).length;

  const checkingAccounts = accounts.filter(
    (a) => a.accountType === "CHECKING"
  ).length;

  const totalBalance = accounts.reduce(
    (sum, account) => sum + account.balance,
    0
  );

  const cards = [
    {
      title: "Total Accounts",
      value: totalAccounts,
    },
    {
      title: "Savings Accounts",
      value: savingsAccounts,
    },
    {
      title: "Checking Accounts",
      value: checkingAccounts,
    },
    {
      title: "Total Balance",
      value: `₹ ${totalBalance.toLocaleString("en-IN")}`,
    },
  ];

  return (
    <Grid container spacing={3} mb={4}>
      {cards.map((card) => (
        <Grid
          key={card.title}
          size={{ xs: 12, sm: 6, md: 3 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {card.title}
            </Typography>

            <Typography
              variant="h5"
              fontWeight="bold"
              mt={1}
            >
              {card.value}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
