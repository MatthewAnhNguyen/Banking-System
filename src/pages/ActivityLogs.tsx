import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  CircularProgress,
  TextField,
  TablePagination,
  Stack,
  Card,
  CardContent,
  Button,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PaymentsIcon from "@mui/icons-material/Payments";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

import dayjs from "dayjs";

import { getActivities } from "../services/activityService";
import type { ActivityLog } from "../types/activity";

export default function ActivityLogs() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);



  const loadActivities = async () => {
    try {
      setLoading(true);
      const data = await getActivities();
      setActivities(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredActivities = activities.filter((activity) =>
    activity.activity.toLowerCase().includes(search.toLowerCase())
  );

  const totalActivities = activities.length;

  const successActivities = activities.filter(
    (a) => a.status === "SUCCESS"
  ).length;

  const failedActivities = activities.filter(
    (a) => a.status === "FAILED"
  ).length;
  useEffect(() => {
    loadActivities();
  }, []);
  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Activity Logs
      </Typography>

      {/* Summary Cards */}
     <Stack
  direction={{ xs: "column", md: "row" }}
  spacing={3}
  mb={3}
>
  <Card sx={{ flex: 1 }}>
    <CardContent>
      <Typography variant="h6">
        Total Activities
      </Typography>

      <Typography variant="h4" fontWeight="bold">
        {totalActivities}
      </Typography>
    </CardContent>
  </Card>

  <Card sx={{ flex: 1 }}>
    <CardContent>
      <Typography variant="h6">
        Successful
      </Typography>

      <Typography
        variant="h4"
        fontWeight="bold"
        color="success.main"
      >
        {successActivities}
      </Typography>
    </CardContent>
  </Card>

  <Card sx={{ flex: 1 }}>
    <CardContent>
      <Typography variant="h6">
        Failed
      </Typography>

      <Typography
        variant="h4"
        fontWeight="bold"
        color="error.main"
      >
        {failedActivities}
      </Typography>
    </CardContent>
  </Card>
</Stack>

      {/* Refresh Button */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={loadActivities}
        >
          Refresh
        </Button>
      </Box>

      {/* Search */}
      <TextField
        fullWidth
        label="Search Activity"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
        margin="normal"
      />

      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Date & Time</b>
              </TableCell>
              <TableCell>
                <b>Activity</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredActivities
              .slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
              .map((activity) => (
                <TableRow key={activity.id} hover>
                  <TableCell>
                    {dayjs(activity.activityTime).format(
                      "DD MMM YYYY hh:mm A"
                    )}
                  </TableCell>

                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      {activity.activity.includes("Deposited") && (
                        <AccountBalanceWalletIcon color="success" />
                      )}

                      {activity.activity.includes("Withdraw") && (
                        <PaymentsIcon color="error" />
                      )}

                      {activity.activity.includes("Transfer") && (
                        <SwapHorizIcon color="primary" />
                      )}

                      {activity.activity}
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={activity.status}
                      color={
                        activity.status === "SUCCESS"
                          ? "success"
                          : activity.status === "FAILED"
                          ? "error"
                          : "warning"
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}

            {filteredActivities.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <Typography color="text.secondary" py={3}>
                    No activity found matching your search.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filteredActivities.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>
    </Box>
  );
}