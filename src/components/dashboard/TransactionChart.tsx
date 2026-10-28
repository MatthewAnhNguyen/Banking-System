import {
  Paper,
  Typography,
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

const data = [
  { month: "Jan", deposit: 12000, withdraw: 8000 },
  { month: "Feb", deposit: 18000, withdraw: 9000 },
  { month: "Mar", deposit: 25000, withdraw: 15000 },
  { month: "Apr", deposit: 22000, withdraw: 12000 },
  { month: "May", deposit: 30000, withdraw: 18000 },
  { month: "Jun", deposit: 42000, withdraw: 20000 },
];

export default function TransactionChart() {
  return (
    <Paper
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h6"
        fontWeight="bold"
        mb={2}
      >
        Monthly Banking Analytics
      </Typography>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="deposit"
            stroke="#2563EB"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="withdraw"
            stroke="#DC2626"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}