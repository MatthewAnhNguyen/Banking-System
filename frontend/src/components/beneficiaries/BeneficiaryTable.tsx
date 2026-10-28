import {
  Paper,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import type {
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import type { Beneficiary } from "../../types/beneficiary";

interface Props {
  beneficiaries: Beneficiary[];
  loading: boolean;
  onEdit: (beneficiary: Beneficiary) => void;
  onDelete: (id: number) => void;
}

export default function BeneficiaryTable({
  beneficiaries,
  loading,
  onEdit,
  onDelete,
}: Props) {
  const columns: GridColDef<Beneficiary>[] = [
    {
      field: "beneficiaryName",
      headerName: "Beneficiary",
      flex: 1,
    },
    {
      field: "accountNumber",
      headerName: "Account Number",
      flex: 1,
    },
    {
      field: "ifscCode",
      headerName: "IFSC",
      flex: 1,
    },
    {
      field: "bankName",
      headerName: "Bank",
      flex: 1,
    },
    {
      field: "nickname",
      headerName: "Nickname",
      flex: 1,
    },
    {
      field: "verified",
      headerName: "Verified",
      flex: 1,
      renderCell: (params: GridRenderCellParams<Beneficiary, boolean>) => (
        <Chip
          label={params.value ? "Verified" : "Pending"}
          color={params.value ? "success" : "warning"}
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      renderCell: (params: GridRenderCellParams<Beneficiary>) => (
        <>
          <Tooltip title="Edit">
            <IconButton
              color="primary"
              onClick={() => onEdit(params.row)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() => onDelete(params.row.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Paper sx={{ height: 550, mt: 2 }}>
      <DataGrid
        rows={beneficiaries}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 10,
            },
          },
        }}
      />
    </Paper>
  );
}