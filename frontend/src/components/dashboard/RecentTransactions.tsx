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
    type: "Nạp tiền",
    amount: "50.000 ₫",
    status: "THÀNH CÔNG",
    date: "16/07/2026",
  },
  {
    id: "TXN1002",
    type: "Chuyển khoản",
    amount: "10.000 ₫",
    status: "THÀNH CÔNG",
    date: "15/07/2026",
  },
  {
    id: "TXN1003",
    type: "Rút tiền",
    amount: "5.000 ₫",
    status: "CHỜ XỬ LÝ",
    date: "15/07/2026",
  },
  {
    id: "TXN1004",
    type: "Chuyển khoản",
    amount: "20.000 ₫",
    status: "THẤT BẠI",
    date: "14/07/2026",
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
        Giao dịch gần đây
      </Typography>

      <Table>

        <TableHead>

          <TableRow>

            <TableCell>ID</TableCell>

            <TableCell>Ngày</TableCell>

            <TableCell>Loại giao dịch</TableCell>

            <TableCell>Số tiền</TableCell>

            <TableCell>Trạng thái</TableCell>

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
                    txn.status === "THÀNH CÔNG"
                      ? "success"
                      : txn.status === "CHỜ XỬ LÝ"
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