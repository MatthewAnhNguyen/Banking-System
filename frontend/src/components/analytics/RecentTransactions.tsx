import {
  Card,
  CardContent,
  Chip,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { exportAnalyticsPDF } from "../../utils/pdfExport";
import {
  DataGrid,
  type GridColDef,
} from "@mui/x-data-grid";



import type {
  AnalyticsSummary,
  RecentTransaction,
} from "../../types/analytics";

interface Props {
  rows: RecentTransaction[];
  summary: AnalyticsSummary;
}
export default function RecentTransactions({
  rows,
  summary,
}: Props){
  const exportCSV = () => {
    const headers = ["Transaction", "Amount", "Date"];

    const csvRows = rows.map((row) => [
      row.type,
      row.amount,
      row.transactionDate,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvRows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "RecentTransactions.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  };

  const columns: GridColDef[] = [
    {
      field: "type",
      headerName: "Transaction",
      flex: 1,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === "DEPOSIT"
              ? "success"
              : params.value === "TRANSFER_CREDIT"
              ? "primary"
              : "error"
          }
          size="small"
        />
      ),
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => <>₹{params.value}</>,
    },
    {
      field: "transactionDate",
      headerName: "Date",
      flex: 1.5,
    },
  ];

  return (
    <Card
      sx={{
        mt: 3,
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">
            Recent Transactions
          </Typography>

         <Box display="flex" gap={2}>
  <Button
    variant="contained"
    onClick={exportCSV}
  >
    Export CSV
  </Button>

  <Button
    variant="outlined"
    onClick={() => exportAnalyticsPDF(summary, rows)}
  >
    Export PDF
  </Button>
</Box>
        </Box>

        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          pageSizeOptions={[5]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
                page: 0,
              },
            },
          }}
        />
      </CardContent>
    </Card>
  );
}