import {
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import useAnalytics from "../../hooks/useAnalytics";

export default function BalanceTrend() {
  const { analytics, loading, error } = useAnalytics();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
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

  const data = analytics.months.map((month: string, index: number) => ({
    month,
    balance:
      analytics.deposits[index] -
      analytics.withdrawals[index],
  }));

  return (
    <Paper
      elevation={4}
      sx={{ p: 3, borderRadius: 4 }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        mb={3}
      >
        Balance Trend
      </Typography>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="balance"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}