import { Box, Stack, Typography } from "@mui/material";
import DashboardCards from "../../components/dashboard/DashboardCards";
import AccountCards from "../../components/dashboard/AccountCards";
import QuickTransfer from "../../components/dashboard/QuickTransfer";
import TransactionTable from "../../components/dashboard/TransactionTable";

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Dashboard
      </Typography>

      <Stack spacing={4}>
        <DashboardCards />
        <AccountCards />
        <QuickTransfer />
        <TransactionTable />
      </Stack>
    </Box>
  );
}