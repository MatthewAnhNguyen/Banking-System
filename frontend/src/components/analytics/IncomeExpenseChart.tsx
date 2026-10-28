import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import type { MonthlyData } from "../../types/analytics";

interface Props {
  data: MonthlyData[];
}

const IncomeExpenseChart = ({ data }: Props) => {
  return (
    <Card sx={{ borderRadius: 3, height: 420 }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          Monthly Income vs Expense
        </Typography>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="income"
              name="Income"
              fill="#2e7d32"
              radius={[5, 5, 0, 0]}
            />

            <Bar
              dataKey="expense"
              name="Expense"
              fill="#d32f2f"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default IncomeExpenseChart;