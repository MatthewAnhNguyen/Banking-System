import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from "@mui/material";

const transactions = [
  {
    id: "TXN1001",
    type: "Deposit",
    amount: "₹50,000",
    status: "SUCCESS",
    date: "16 Jul 2026",
  },
  {
    id: "TXN1002",
    type: "Transfer",
    amount: "₹10,000",
    status: "SUCCESS",
    date: "15 Jul 2026",
  },
  {
    id: "TXN1003",
    type: "Withdraw",
    amount: "₹5,000",
    status: "PENDING",
    date: "15 Jul 2026",
  },
  {
    id: "TXN1004",
    type: "Transfer",
    amount: "₹20,000",
    status: "FAILED",
    date: "14 Jul 2026",
  },
];

export default function RecentTransactions() {
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
        Recent Transactions
      </Typography>

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>ID</TableCell>

            <TableCell>Date</TableCell>

            <TableCell>Type</TableCell>

            <TableCell>Amount</TableCell>

            <TableCell>Status</TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {transactions.map((txn) => (

            <TableRow key={txn.id}>

              <TableCell>{txn.id}</TableCell>

              <TableCell>{txn.date}</TableCell>

              <TableCell>{txn.type}</TableCell>

              <TableCell>{txn.amount}</TableCell>

              <TableCell>

                <Chip
                  label={txn.status}
                  color={
                    txn.status === "SUCCESS"
                      ? "success"
                      : txn.status === "PENDING"
                      ? "warning"
                      : "error"
                  }
                />

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </Paper>
  );
}