import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

import { updateBeneficiary } from "../../services/beneficiary.service";
import type { Beneficiary } from "../../types/beneficiary";
import type { BeneficiaryRequest } from "../../types/beneficiaryRequest";

interface Props {
  open: boolean;
  beneficiary: Beneficiary | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditBeneficiaryDialog({
  open,
  beneficiary,
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

  useEffect(() => {
    if (beneficiary) {
      setForm({
        beneficiaryName: beneficiary.beneficiaryName,
        accountNumber: beneficiary.accountNumber,
        ifscCode: beneficiary.ifscCode,
        bankName: beneficiary.bankName,
        nickname: beneficiary.nickname,
      });
    }
  }, [beneficiary]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    if (!beneficiary) return;

    await updateBeneficiary(beneficiary.id, form);

    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Beneficiary</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            name="beneficiaryName"
            label="Beneficiary Name"
            value={form.beneficiaryName}
            onChange={handleChange}
          />

          <TextField
            name="accountNumber"
            label="Account Number"
            value={form.accountNumber}
            onChange={handleChange}
          />

          <TextField
            name="ifscCode"
            label="IFSC Code"
            value={form.ifscCode}
            onChange={handleChange}
          />

          <TextField
            name="bankName"
            label="Bank Name"
            value={form.bankName}
            onChange={handleChange}
          />

          <TextField
            name="nickname"
            label="Nickname"
            value={form.nickname}
            onChange={handleChange}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={handleSave}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}