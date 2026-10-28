import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import accountService from "../../services/account.service";
import type { AccountType } from "../../types/account";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateAccountDialog({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [accountType, setAccountType] = useState<AccountType>("SAVINGS");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const clearForm = () => {
    setAccountType("SAVINGS");
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await accountService.createAccount({
        accountType,
      });

      setSuccess(true);

      clearForm();

      onSuccess();

      onClose();
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create New Account</DialogTitle>

        <DialogContent>
          <Stack spacing={3} mt={2}>
            <TextField
              select
              label="Account Type"
              value={accountType}
              onChange={(e) =>
                setAccountType(e.target.value as AccountType)
              }
              fullWidth
            >
              <MenuItem value="SAVINGS">
                Savings
              </MenuItem>

            <MenuItem value="CHECKING">
              Checking
              </MenuItem>
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Account"}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Account Created Successfully
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={() => setError(false)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Failed to Create Account
        </Alert>
      </Snackbar>
    </>
  );
}
