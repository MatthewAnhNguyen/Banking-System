import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  Divider,
} from "@mui/material";

import type { Account } from "../../types/account";

interface Props {
  open: boolean;
  account: Account | null;
  onClose: () => void;
}

export default function AccountDetailsDialog({
  open,
  account,
  onClose,
}: Props) {
  if (!account) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Chi tiết tài khoản
      </DialogTitle>

      <DialogContent>

        <Stack spacing={2} mt={1}>

          <Typography>
            <b>Số tài khoản:</b> {account.accountNumber}
          </Typography>

          <Divider />

          <Typography>
            <b>Loại tài khoản:</b> {account.accountType}
          </Typography>

          <Typography>
            <b>Số dư:</b> {account.balance.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
          </Typography>

          <Typography>
            <b>Trạng thái:</b> {account.status}
          </Typography>

        </Stack>

      </DialogContent>

      <DialogActions>

        <Button
          variant="contained"
          onClick={onClose}
        >
          Đóng
        </Button>

      </DialogActions>
    </Dialog>
  );
}