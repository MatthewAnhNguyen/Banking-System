import { Typography } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export default function Logo() {
  return (
    <>
      <AccountBalanceIcon
        sx={{
          fontSize: 60,
          color: "#2563EB",
          display: "block",
          mx: "auto",
        }}
      />

      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        mt={2}
      >
        Enterprise Bank
      </Typography>
    </>
  );
}