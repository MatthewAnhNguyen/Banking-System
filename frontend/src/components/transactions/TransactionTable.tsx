import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Transaction } from "../../types/transaction";

interface Props {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: Props) {
  const navigate = useNavigate();

  return (
    <Paper>
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
          {transactions.map((transaction) => (
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
              <TableCell>₹ {transaction.amount.toLocaleString("en-IN")}</TableCell>
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
    </Paper>
  );
}
