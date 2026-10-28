import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export default function AdminLayout() {
  return (
    <Box sx={{ p: 2 }}>
      <Outlet />
    </Box>
  );
}