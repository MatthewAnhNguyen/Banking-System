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
        Account Details
      </DialogTitle>

      <DialogContent>

        <Stack spacing={2} mt={1}>

          <Typography>
            <b>Account Number:</b> {account.accountNumber}
          </Typography>

          <Divider />

          <Typography>
            <b>Account Type:</b> {account.accountType}
          </Typography>

          <Typography>
            <b>Balance:</b> ₹ {account.balance.toLocaleString("en-IN")}
          </Typography>

          <Typography>
            <b>Status:</b> {account.status}
          </Typography>

        </Stack>

      </DialogContent>

      <DialogActions>

        <Button
          variant="contained"
          onClick={onClose}
        >
          Close
        </Button>

      </DialogActions>
    </Dialog>
  );
}