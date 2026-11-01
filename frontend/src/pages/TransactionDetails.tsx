import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import type { Transaction } from "../types/transaction";
import { getTransaction } from "../services/history.service";
import { generateReceipt } from "../utils/generateReceipt";

export default function TransactionDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;
    const transactionId = Number(id);
    if (!Number.isInteger(transactionId) || transactionId < 1) {
      setError(true);
      return;
    }

    let active = true;
    getTransaction(transactionId)
      .then((data) => {
        if (active) setTransaction(data);
      })
      .catch(() => {
        if (active) setError(true);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const rows = [
    ["Mã giao dịch", transaction ? String(transaction.id) : "-"],
    ["Loại giao dịch", transaction?.transactionType ?? "-"],
    [
      "Số tiền",
      transaction ? transaction.amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" }) : "-",
    ],
    [
      "Ngày giao dịch",
      transaction
        ? dayjs(transaction.transactionDate).format("DD MMM YYYY, hh:mm A")
        : "-",
    ],
    ["Tài khoản nguồn", transaction?.sourceAccountNumber ?? "-"],
    ["Tài khoản đích", transaction?.targetAccountNumber ?? "-"],
  ];

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/transactions")}
        sx={{ mb: 3 }}
      >
        Quay lại danh sách giao dịch
      </Button>
      {error && <Alert severity="error" sx={{ mb: 2 }}>Không thể tải thông tin giao dịch.</Alert>}
      <Card>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
            mb={3}
          >
            <Typography variant="h5" fontWeight={700}>
              Chi tiết giao dịch
            </Typography>
            {transaction && <Chip label={transaction.status} color="success" />}
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={2}>
            {rows.map(([label, value]) => (
              <Grid key={label} size={{ xs: 12, md: 6 }}>
                <Typography color="text.secondary">{label}</Typography>
                <Typography variant="h6" fontWeight={600}>
                  {value}
                </Typography>
              </Grid>
            ))}
          </Grid>
          {transaction && (
            <Box mt={4} display="flex" gap={2} flexWrap="wrap">
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={() => generateReceipt(transaction)}
              >
                Tải biên lai
              </Button>
              <Button variant="outlined" onClick={() => window.print()}>
                In biên lai
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}