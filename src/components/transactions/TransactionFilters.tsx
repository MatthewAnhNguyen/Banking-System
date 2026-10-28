import {
  Box,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  onNewTransaction: () => void;
}

export default function TransactionFilters({
  search,
  setSearch,
  type,
  setType,
  onNewTransaction,
}: Props) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      flexWrap="wrap"
      gap={2}
      mb={3}
    >
      <Box
        display="flex"
        gap={2}
        flexWrap="wrap"
      >
        <TextField
          label="Search"
          placeholder="Search by account number or transaction type..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          size="small"
        />

        <TextField
          select
          label="Transaction Type"
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
          size="small"
          sx={{ minWidth: 220 }}
        >
          <MenuItem value="">
            All Transactions
          </MenuItem>

          <MenuItem value="DEPOSIT">
            Deposit
          </MenuItem>

          <MenuItem value="WITHDRAWAL">
            Withdraw
          </MenuItem>

          <MenuItem value="TRANSFER">
            Transfer
          </MenuItem>

        </TextField>
      </Box>

      <Button
        variant="contained"
        onClick={onNewTransaction}
      >
        New Transaction
      </Button>
    </Box>
  );
}
