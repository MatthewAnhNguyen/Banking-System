import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

import { addBeneficiary } from "../../services/beneficiary.service";
import type { BeneficiaryRequest } from "../../types/beneficiaryRequest";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddBeneficiaryDialog({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [form, setForm] = useState<BeneficiaryRequest>({
    beneficiaryName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    nickname: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await addBeneficiary(form);

      onSuccess();

      setForm({
        beneficiaryName: "",
        accountNumber: "",
        ifscCode: "",
        bankName: "",
        nickname: "",
      });

      onClose();
    } catch (error) {
      console.error("Failed to add beneficiary:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Add Beneficiary</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            name="beneficiaryName"
            label="Beneficiary Name"
            value={form.beneficiaryName}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            name="accountNumber"
            label="Account Number"
            value={form.accountNumber}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            name="ifscCode"
            label="IFSC Code"
            value={form.ifscCode}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            name="bankName"
            label="Bank Name"
            value={form.bankName}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            name="nickname"
            label="Nickname"
            value={form.nickname}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}