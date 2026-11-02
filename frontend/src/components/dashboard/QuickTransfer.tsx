import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
  CircularProgress,
} from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
import accountService from "../../services/account.service";
import { transferMoney } from "../../services/transaction.service";
import type { Account as BankAccount } from "../../types/account";

export default function QuickTransfer() {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);

  const [fromAccountId, setFromAccountId] = useState("");
  const [targetAccountNumber, setTargetAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      try {
        const accountsData = await accountService.getAccounts();
        if (!ignore) setAccounts(accountsData);
      } catch (error) {
        console.error(error);
        toast.error("Không thể tải danh sách tài khoản");
      }
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, []);

  const handleTransfer = async () => {
  if (!fromAccountId) {
    toast.error("Vui lòng chọn tài khoản nguồn");
    return;
  }

  if (!targetAccountNumber.trim()) {
    toast.error("Vui lòng nhập số tài khoản đích");
    return;
  }

  if (!amount || Number(amount) <= 0) {
    toast.error("Vui lòng nhập số tiền hợp lệ");
    return;
  }

  try {
    setLoading(true);

    await transferMoney({
      sourceAccountNumber: fromAccountId,
      targetAccountNumber: targetAccountNumber.trim(),
      amount: Number(amount),
    });

    toast.success("Chuyển tiền thành công");

    setTargetAccountNumber("");
    setAmount("");

  } catch (error: unknown) {
  console.error("Transfer Error:", error);

  if (axios.isAxiosError(error)) {
    console.log("Backend Error:", error.response?.data);

    toast.error(
      error.response?.data?.message ??
      "Chuyển tiền thất bại"
    );
  } else {
    toast.error("Chuyển tiền thất bại");
  }
} finally {
    setLoading(false);
}
};

  return (
    <Paper
      elevation={4}
      sx={{
        mt: 4,
        p: 4,
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={3}
      >
        Chuyển tiền nhanh
      </Typography>

      <Stack spacing={3}>
        <TextField
          select
          label="Tài khoản nguồn"
          fullWidth
          value={fromAccountId}
          onChange={(e) =>
            setFromAccountId(e.target.value)
          }
        >
          {accounts.map((account) => (
            <MenuItem
              key={account.accountNumber}
              value={account.accountNumber}
            >
              {account.accountNumber}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Số tài khoản đích"
          fullWidth
          value={targetAccountNumber}
          onChange={(e) => setTargetAccountNumber(e.target.value)}
        />

        <TextField
          label="Số tiền"
          type="number"
          fullWidth
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
        />

        <Button
          variant="contained"
          size="large"
          disabled={loading}
          onClick={handleTransfer}
        >
          {loading ? (
            <CircularProgress
              size={24}
              color="inherit"
            />
          ) : (
            "Chuyển tiền"
          )}
        </Button>
      </Stack>
    </Paper>
  );
}