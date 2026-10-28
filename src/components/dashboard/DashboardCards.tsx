import {
  AccountBalanceWallet,
  ReceiptLong,
  Savings,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import useDashboard from "../../hooks/useDashboard";

export default function DashboardCards() {
  const { dashboard, loading, error } = useDashboard();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !dashboard) {
    return (
      <Alert severity="error">
        {error ?? "Không tải được dữ liệu tổng quan."}
      </Alert>
    );
  }

  const cards = [
    {
      label: "Total Balance",
      value: `₹ ${dashboard.totalBalance.toLocaleString("en-IN")}`,
      icon: <Savings color="success" />,
    },
    {
      label: "Accounts",
      value: dashboard.totalAccounts.toLocaleString(),
      icon: <AccountBalanceWallet color="primary" />,
    },
    {
      label: "Transactions",
      value: dashboard.totalTransactions.toLocaleString(),
      icon: <ReceiptLong color="warning" />,
    },
  ];

  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      {cards.map((card) => (
        <Card key={card.label} sx={{ flex: 1 }}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" gap={2}>
              <Box>
                <Typography color="text.secondary">{card.label}</Typography>
                <Typography variant="h5" fontWeight={700} mt={1}>
                  {card.value}
                </Typography>
              </Box>
              {card.icon}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}