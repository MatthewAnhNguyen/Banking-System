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
    ["Transaction ID", transaction ? String(transaction.id) : "-"],
    ["Transaction Type", transaction?.transactionType ?? "-"],
    [
      "Amount",
      transaction ? `₹ ${transaction.amount.toLocaleString("en-IN")}` : "-",
    ],
    [
      "Transaction Date",
      transaction
        ? dayjs(transaction.transactionDate).format("DD MMM YYYY, hh:mm A")
        : "-",
    ],
    ["Source Account", transaction?.sourceAccountNumber ?? "-"],
    ["Target Account", transaction?.targetAccountNumber ?? "-"],
  ];

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/transactions")}
        sx={{ mb: 3 }}
      >
        Back to Transactions
      </Button>
      {error && <Alert severity="error" sx={{ mb: 2 }}>Transaction could not be loaded.</Alert>}
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
              Transaction Details
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
                Download Receipt
              </Button>
              <Button variant="outlined" onClick={() => window.print()}>
                Print Receipt
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
