import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import useBeneficiaries from "../../hooks/useBeneficiaries";
import BeneficiaryTable from "../../components/beneficiaries/BeneficiaryTable";
import AddBeneficiaryDialog from "../../components/beneficiaries/AddBeneficiaryDialog";
import EditBeneficiaryDialog from "../../components/beneficiaries/EditBeneficiaryDialog";

import type { Beneficiary } from "../../types/beneficiary";
import { deleteBeneficiary } from "../../services/beneficiary.service";

export default function Beneficiaries() {
  const { beneficiaries, loading, refresh } = useBeneficiaries();

  const [search, setSearch] = useState("");

  const [openAdd, setOpenAdd] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const [selectedBeneficiary, setSelectedBeneficiary] =
    useState<Beneficiary | null>(null);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const filteredBeneficiaries = useMemo(() => {
    return beneficiaries.filter((b) =>
      b.beneficiaryName.toLowerCase().includes(search.toLowerCase()) ||
      b.accountNumber.includes(search) ||
      b.bankName.toLowerCase().includes(search.toLowerCase()) ||
      b.ifscCode.toLowerCase().includes(search.toLowerCase()) ||
      b.nickname.toLowerCase().includes(search.toLowerCase())
    );
  }, [beneficiaries, search]);

  const handleEdit = (beneficiary: Beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setOpenEdit(true);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (deleteId === null) return;

    try {
      await deleteBeneficiary(deleteId);

      refresh();

      setSnackbar({
        open: true,
        message: "Beneficiary deleted successfully",
        severity: "success",
      });
    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        message: "Failed to delete beneficiary",
        severity: "error",
      });
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <Box p={3}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight={700}>
          Beneficiaries
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAdd(true)}
        >
          Add Beneficiary
        </Button>
      </Stack>

      <TextField
        fullWidth
        label="Search Beneficiary"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

      <BeneficiaryTable
        beneficiaries={filteredBeneficiaries}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <AddBeneficiaryDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSuccess={() => {
          refresh();
          setOpenAdd(false);

          setSnackbar({
            open: true,
            message: "Beneficiary added successfully",
            severity: "success",
          });
        }}
      />

      <EditBeneficiaryDialog
        open={openEdit}
        beneficiary={selectedBeneficiary}
        onClose={() => {
          setOpenEdit(false);
          setSelectedBeneficiary(null);
        }}
        onSuccess={() => {
          refresh();

          setSnackbar({
            open: true,
            message: "Beneficiary updated successfully",
            severity: "success",
          });
        }}
      />

      <Dialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
      >
        <DialogTitle>Delete Beneficiary</DialogTitle>

        <DialogContent>
          Are you sure you want to delete this beneficiary?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>
            Cancel
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={confirmDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() =>
          setSnackbar((prev) => ({
            ...prev,
            open: false,
          }))
        }
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}