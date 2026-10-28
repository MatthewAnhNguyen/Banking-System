import {
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
} from "recharts";

import useAnalytics from "../../hooks/useAnalytics";

export default function SpendingChart() {

  const { analytics, loading, error } =
    useAnalytics();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        p={4}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !analytics) {
    return (
      <Typography color="error">
        {error ?? "Unable to load analytics"}
      </Typography>
    );
  }

  const data = [
    {
      name: "Deposits",
      value: analytics.deposits.reduce(
        (a: number, b: number) => a + b,
        0
      ),
    },
    {
      name: "Withdrawals",
      value: analytics.withdrawals.reduce(
        (a: number, b: number) => a + b,
        0
      ),
    },
    {
      name: "Transfers",
      value: analytics.transfers.reduce(
        (a: number, b: number) => a + b,
        0
      ),
    },
  ];

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        mb={3}
      >
        Spending Distribution
      </Typography>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          />

          <Tooltip />

          <Legend />

        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
}