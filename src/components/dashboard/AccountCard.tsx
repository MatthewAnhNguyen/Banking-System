import {
  Paper,
  Typography,
  Chip,
  Box,
} from "@mui/material";

import CreditCardIcon from "@mui/icons-material/CreditCard";

import type { Account } from "../../types/account";

interface Props {
  account: Account;
}

export default function AccountCard({
  account,
}: Props) {

  const maskedAccount =
    "**** **** **** " +
    account.accountNumber.slice(-4);

  return (
    <Paper
      elevation={5}
      sx={{
        p: 3,
        borderRadius: 4,
        background:
          "linear-gradient(135deg,#2563EB,#1E3A8A)",
        color: "white",
        transition: ".3s",

        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <CreditCardIcon sx={{ fontSize: 40 }} />

        <Chip
          label={account.status}
          color="success"
        />
      </Box>

      <Typography mt={3}>
        {account.accountType}
      </Typography>

      <Typography
        variant="h6"
        mt={1}
      >
        {maskedAccount}
      </Typography>

      <Typography
        mt={3}
        color="rgba(255,255,255,.7)"
      >
        Available Balance
      </Typography>

      <Typography
        variant="h4"
        fontWeight="bold"
      >
        ₹ {account.balance.toLocaleString("en-IN")}
      </Typography>
    </Paper>
  );
}