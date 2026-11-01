import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";
import type { TransactionType } from "../../types/transaction";

import {
  deposit,
  withdraw,
  transferMoney,
} from "../../services/transaction.service";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateTransactionDialog({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [transactionType, setTransactionType] =
    useState<TransactionType>("DEPOSIT");

  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");

  const resetForm = () => {
    setTransactionType("DEPOSIT");
    setFromAccount("");
    setToAccount("");
    setAmount("");
  };

  const handleSubmit = async () => {
    const parsedAmount = Number(amount);

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      alert("Số tiền phải lớn hơn 0");
      return;
    }

    if (
      (transactionType === "WITHDRAWAL" ||
        transactionType === "TRANSFER") &&
      !fromAccount.trim()
    ) {
      alert("Vui lòng nhập tài khoản nguồn");
      return;
    }

    if (
      (transactionType === "DEPOSIT" ||
        transactionType === "TRANSFER") &&
      !toAccount.trim()
    ) {
      alert("Vui lòng nhập tài khoản đích");
      return;
    }

    if (
      transactionType === "TRANSFER" &&
      fromAccount.trim() === toAccount.trim()
    ) {
      alert("Tài khoản nguồn và đích không được trùng nhau");
      return;
    }

    try {
      switch (transactionType) {
        case "DEPOSIT":
          await deposit({
            accountNumber: toAccount.trim(),
            amount: parsedAmount,
          });
          break;

        case "WITHDRAWAL":
          await withdraw({
            accountNumber: fromAccount.trim(),
            amount: parsedAmount,
          });
          break;

        case "TRANSFER":
          await transferMoney({
            sourceAccountNumber: fromAccount.trim(),
            targetAccountNumber: toAccount.trim(),
            amount: parsedAmount,
          });
          break;
      }

      onSuccess();
      onClose();
      resetForm();
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message ??
          error.response?.data?.error ??
          "Giao dịch thất bại"
        : "Giao dịch thất bại";

      alert(message);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Giao dịch mới
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={2}>
          <TextField
            select
            label="Loại giao dịch"
            value={transactionType}
            onChange={(e) =>
              setTransactionType(e.target.value as TransactionType)
            }
          >
            <MenuItem value="DEPOSIT">
              Nạp tiền
            </MenuItem>

            <MenuItem value="WITHDRAWAL">
              Rút tiền
            </MenuItem>

            <MenuItem value="TRANSFER">
              Chuyển khoản
            </MenuItem>
          </TextField>

          {(transactionType === "WITHDRAWAL" ||
            transactionType === "TRANSFER") && (
            <TextField
              required
              label="Từ số tài khoản"
              value={fromAccount}
              onChange={(e) =>
                setFromAccount(e.target.value)
              }
            />
          )}

          {(transactionType === "DEPOSIT" ||
            transactionType === "TRANSFER") && (
            <TextField
              required
              label="Đến số tài khoản"
              value={toAccount}
              onChange={(e) =>
                setToAccount(e.target.value)
              }
            />
          )}

          <TextField
            required
            label="Số tiền"
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
            inputProps={{ min: 0.01, step: 0.01 }}
          />

        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Hủy
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}