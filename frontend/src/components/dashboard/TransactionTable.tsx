import { useMemo, useState } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useTransactions from "../../hooks/useTransactions";

export default function TransactionTable() {
  const { transactions, loading } = useTransactions();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const filteredTransactions = useMemo(() => {
    const query = search.toLowerCase();
    return transactions.filter((transaction) =>
      [
        transaction.id.toString(),
        transaction.transactionType,
        transaction.sourceAccountNumber ?? "",
        transaction.targetAccountNumber ?? "",
      ].some((value) => value.toLowerCase().includes(query))
    );
  }, [transactions, search]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={4} sx={{ mt: 4, p: 3, borderRadius: 4 }}>
      <Typography variant="h6" fontWeight="bold" mb={3}>
        Recent Transactions
      </Typography>
      <TextField
        fullWidth
        placeholder="Search transaction ID, type or account number"
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setPage(0);
        }}
        sx={{ mb: 3 }}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Transaction ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Accounts</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTransactions
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((transaction) => (
              <TableRow
                key={transaction.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(`/transactions/${transaction.id}`)}
              >
                <TableCell>{transaction.id}</TableCell>
                <TableCell>
                  {new Date(transaction.transactionDate).toLocaleString()}
                </TableCell>
                <TableCell>{transaction.transactionType}</TableCell>
                <TableCell>
                  ₹ {transaction.amount.toLocaleString("en-IN")}
                </TableCell>
                <TableCell>
                  <Chip label={transaction.status} color="success" />
                </TableCell>
                <TableCell>
                  {transaction.sourceAccountNumber ?? "-"}
                  {transaction.targetAccountNumber
                    ? ` → ${transaction.targetAccountNumber}`
                    : ""}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredTransactions.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(_, value) => setPage(value)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(Number(event.target.value));
          setPage(0);
        }}
      />
    </Paper>
  );
}
