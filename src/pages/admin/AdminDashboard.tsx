import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import adminService from "../../services/adminService";

interface DashboardSummary {
  totalUsers: number;
  totalAccounts: number;
}

export default function AdminDashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [users, accounts] = await Promise.all([
        adminService.getUsers(0, 1),
        adminService.getAccounts(0, 1),
      ]);

      setSummary({
        totalUsers: users.totalElements,
        totalAccounts: accounts.totalElements,
      });
    } catch (loadError) {
      console.error("Failed to load admin dashboard:", loadError);
      setError("Unable to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Admin Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={() => void loadDashboard()}
          disabled={loading}
        >
          Refresh
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading && !summary ? (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography color="text.secondary">Total Users</Typography>
              <Typography variant="h4" fontWeight="bold">
                {summary?.totalUsers.toLocaleString() ?? "--"}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography color="text.secondary">Total Accounts</Typography>
              <Typography variant="h4" fontWeight="bold">
                {summary?.totalAccounts.toLocaleString() ?? "--"}
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      )}
    </Box>
  );
}
