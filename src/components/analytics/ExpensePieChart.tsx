import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

import type { CategoryExpense } from "../../types/analytics";

interface Props {
  data: CategoryExpense[];
}

const COLORS = [
  "#1976d2",
  "#d32f2f",
  "#2e7d32",
  "#ed6c02",
];

const ExpensePieChart = ({ data }: Props) => {
  return (
    <Card sx={{ borderRadius: 3, height: 420 }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          Expense Distribution
        </Typography>

        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              outerRadius={120}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ExpensePieChart;