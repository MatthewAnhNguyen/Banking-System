import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";

import type { LoanRequest } from "../../types/loanRequest";
import { applyLoan } from "../../services/loan.service";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ApplyLoanDialog({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [form, setForm] = useState<LoanRequest>({
    loanType: "",
    loanAmount: 10000,
    tenureMonths: 12,
  });

  const handleLoanTypeChange = (event: SelectChangeEvent) => {
    const value = event.target.value;

    console.log("Selected Loan Type:", value);

    setForm((prev) => ({
      ...prev,
      loanType: value,
    }));
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    // Remove focus from Apply button before closing dialog
    event.currentTarget.blur();

    console.log("Submitting Loan:", form);

    if (!form.loanType) {
      alert("Please select a loan type.");
      return;
    }

    try {
      const response = await applyLoan(form);

      console.log("Loan Applied:", response.data);

      setForm({
        loanType: "",
        loanAmount: 10000,
        tenureMonths: 12,
      });

      onSuccess();

      onClose();
    } catch (error) {
      console.error("Failed to apply loan:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      disableRestoreFocus={false}
    >
      <DialogTitle>Apply for Loan</DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={2}>
          <FormControl fullWidth>
            <InputLabel id="loan-type-label">
              Loan Type
            </InputLabel>

            <Select
              labelId="loan-type-label"
              name="loanType"
              value={form.loanType}
              label="Loan Type"
              onChange={handleLoanTypeChange}
            >
              <MenuItem value="HOME_LOAN">
                Home Loan
              </MenuItem>

              <MenuItem value="CAR_LOAN">
                Car Loan
              </MenuItem>

              <MenuItem value="PERSONAL_LOAN">
                Personal Loan
              </MenuItem>

              <MenuItem value="EDUCATION_LOAN">
                Education Loan
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Loan Amount"
            name="loanAmount"
            type="number"
            value={form.loanAmount}
            onChange={handleNumberChange}
            fullWidth
          />

          <TextField
            label="Tenure (Months)"
            name="tenureMonths"
            type="number"
            value={form.tenureMonths}
            onChange={handleNumberChange}
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
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}