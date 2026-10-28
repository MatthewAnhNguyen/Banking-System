import {
  Grid,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";

import useAccounts from "../../hooks/useAccounts";

import AccountCard from "./AccountCard";

export default function AccountCards() {

  const {
    accounts,
    loading,
  } = useAccounts();

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (accounts.length === 0) {
    return (
      <Typography>
        No Accounts Found
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>

      {accounts.map((account) => (

        <Grid
          key={account.id}
          size={{ xs: 12, md: 6 }}
        >

          <AccountCard
            account={account}
          />

        </Grid>

      ))}

    </Grid>
  );
}