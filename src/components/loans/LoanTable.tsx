import { Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type {
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";

import type { Loan } from "../../types/loan";

interface Props {
  loans: Loan[];
  loading: boolean;
}

export default function LoanTable({
  loans,
  loading,
}: Props) {
  const columns: GridColDef<Loan>[] = [
    {
      field: "loanNumber",
      headerName: "Loan Number",
      flex: 1.3,
    },
    {
      field: "loanType",
      headerName: "Loan Type",
      flex: 1,
    },
    {
      field: "loanAmount",
      headerName: "Amount",
      flex: 1,
      valueFormatter: (value) => `₹${Number(value).toLocaleString()}`,
    },
    {
      field: "interestRate",
      headerName: "Interest %",
      flex: 0.8,
      valueFormatter: (value) => `${value}%`,
    },
    {
      field: "tenureMonths",
      headerName: "Tenure",
      flex: 0.8,
      valueFormatter: (value) => `${value} Months`,
    },
    {
      field: "emiAmount",
      headerName: "EMI",
      flex: 1,
      valueFormatter: (value) => `₹${Number(value).toLocaleString()}`,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params: GridRenderCellParams<Loan>) => {
        const status = params.row.status;

        let color: "success" | "warning" | "error" | "default" = "default";

        if (status === "APPROVED") {
          color = "success";
        } else if (status === "PENDING") {
          color = "warning";
        } else if (status === "REJECTED") {
          color = "error";
        }

        return (
          <Chip
            label={status}
            color={color}
            size="small"
          />
        );
      },
    },
  ];

  return (
    <DataGrid
      rows={loans}
      columns={columns}
      loading={loading}
      getRowId={(row) => row.loanNumber}
      autoHeight
      pageSizeOptions={[5, 10, 20]}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
            page: 0,
          },
        },
      }}
      disableRowSelectionOnClick
    />
  );
}