import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  TextField,
} from "@mui/material";
import { requestCard } from "../../services/card.service";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function RequestCardDialog({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [cardType, setCardType] = useState("DEBIT");

  const handleSubmit = async () => {
    await requestCard({
      cardType,
    });

    onSuccess();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Request New Card</DialogTitle>

      <DialogContent>
        <TextField
          select
          fullWidth
          margin="normal"
          label="Card Type"
          value={cardType}
          onChange={(e) => setCardType(e.target.value)}
        >
          <MenuItem value="DEBIT">Debit Card</MenuItem>
          <MenuItem value="CREDIT">Credit Card</MenuItem>
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button
          variant="contained"
          onClick={handleSubmit}
        >
          Request
        </Button>
      </DialogActions>
    </Dialog>
  );
}