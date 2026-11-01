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
          label="Tìm kiếm"
          placeholder="Tìm kiếm theo số tài khoản hoặc loại giao dịch..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          size="small"
        />

        <TextField
          select
          label="Loại giao dịch"
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
          size="small"
          sx={{ minWidth: 220 }}
        >
          <MenuItem value="">
            Tất cả giao dịch
          </MenuItem>

          <MenuItem value="DEPOSIT">
            Nạp tiền
          </MenuItem>

          <MenuItem value="WITHDRAWAL">
            Rút tiền
          </MenuItem>

          <MenuItem value="TRANSFER">
            Chuyển khoản
          </MenuItem>

        </TextField>
      </Box>

      <Button
        variant="contained"
        onClick={onNewTransaction}
      >
        Giao dịch mới
      </Button>
    </Box>
  );
}