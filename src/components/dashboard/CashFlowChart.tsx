import {
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import useAnalytics from "../../hooks/useAnalytics";

export default function CashFlowChart() {

  const {
    analytics,
    loading,
    error,
  } = useAnalytics();

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

  const data = analytics.months.map((month: string, index: number) => ({
      month,
      cashflow:
        analytics.deposits[index] -
        analytics.withdrawals[index] -
        analytics.transfers[index],
    })
  );

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
        Monthly Cash Flow
      </Typography>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <AreaChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="cashflow"
          />

        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
}