import {
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import useAnalytics from "../../hooks/useAnalytics";

export default function AnalyticsChart() {

  const {
    analytics,
    loading,
    error,
  } = useAnalytics();

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
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

  const chartData = analytics.months.map((month: string, index: number)  => ({
    month,
    deposits: analytics.deposits[index],
    withdrawals: analytics.withdrawals[index],
    transfers: analytics.transfers[index],
  }));

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        mt: 4,
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={3}
      >
        Banking Analytics
      </Typography>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <BarChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar
            dataKey="deposits"
            name="Deposits"
          />

          <Bar
            dataKey="withdrawals"
            name="Withdrawals"
          />

          <Bar
            dataKey="transfers"
            name="Transfers"
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}