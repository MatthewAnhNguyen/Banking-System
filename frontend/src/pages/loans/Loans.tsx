import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { useLoans } from "../../hooks/useLoans";
import LoanTable from "../../components/loans/LoanTable";
import ApplyLoanDialog from "../../components/loans/ApplyLoanDialog";

export default function Loans() {
  const { loans, loading, refresh } = useLoans();

  const [search, setSearch] = useState("");
  const [openApply, setOpenApply] = useState(false);

  const filteredLoans = useMemo(() => {
    return loans.filter((loan) =>
      loan.loanNumber.toLowerCase().includes(search.toLowerCase()) ||
      loan.loanType.toLowerCase().includes(search.toLowerCase()) ||
      loan.status.toLowerCase().includes(search.toLowerCase())
    );
  }, [loans, search]);

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        My Loans
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
        >
          <TextField
            label="Search Loans"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 350 }}
          />

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenApply(true)}
          >
            Apply Loan
          </Button>
        </Stack>
      </Paper>

      <LoanTable
        loans={filteredLoans}
        loading={loading}
      />

      <ApplyLoanDialog
        open={openApply}
        onClose={() => setOpenApply(false)}
        onSuccess={refresh}
      />
    </Box>
  );
}