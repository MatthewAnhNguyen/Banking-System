import {
  Card,
  CardContent,
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
  Legend,
} from "recharts";

import type { MonthlyTrend } from "../../types/analytics";

interface Props {
  data: MonthlyTrend[];
}

export default function TransactionTrendChart({ data }: Props) {
  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>

        <Typography
          variant="h6"
          mb={2}
        >
          Transaction Trend
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

            <Legend />

            <Line
              type="monotone"
              dataKey="income"
              stroke="#2e7d32"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="#d32f2f"
              strokeWidth={3}
            />

          </LineChart>
        </ResponsiveContainer>

      </CardContent>
    </Card>
  );
}