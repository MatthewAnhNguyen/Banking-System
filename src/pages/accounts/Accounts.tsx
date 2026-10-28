import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";

import useAccounts from "../../hooks/useAccounts";

import AccountSearch from "../../components/accounts/AccountSearch";
import AccountFilter from "../../components/accounts/AccountFilter";
import AccountsGrid from "../../components/accounts/AccountsGrid";
import AccountSummary from "../../components/accounts/AccountSummary";
import CreateAccountDialog from "../../components/accounts/CreateAccountDialog";

export default function Accounts() {
  const { accounts, loading,fetchAccounts, } = useAccounts();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [openCreate, setOpenCreate] = useState(false);

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch = account.accountNumber
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      status === "ALL" || account.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <Box sx={{ px: 3, py: 2 }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight={700}>
          My Accounts
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => setOpenCreate(true)}
        >
          + Create Account
        </Button>
      </Box>

      {/* Summary Cards */}
      <AccountSummary accounts={accounts} />

      {/* Search & Filter */}
      <Box
        display="flex"
        gap={2}
        mb={3}
        flexWrap="wrap"
      >
        <Box flex={2} minWidth={250}>
          <AccountSearch
            value={search}
            onChange={setSearch}
          />
        </Box>

        <Box flex={1} minWidth={180}>
          <AccountFilter
            value={status}
            onChange={setStatus}
          />
        </Box>
      </Box>

      {/* Accounts Grid */}
      {loading ? (
        <Typography>Loading...</Typography>
      ) : filteredAccounts.length === 0 ? (
        <Typography>No accounts found.</Typography>
      ) : (
        <AccountsGrid accounts={filteredAccounts} />
      )}

      {/* Create Account Dialog */}
   <CreateAccountDialog
  open={openCreate}
  onClose={() => setOpenCreate(false)}
  onSuccess={fetchAccounts}
/>
    </Box>
  );
}