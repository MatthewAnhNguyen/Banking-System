import {
  Box,
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink, useNavigate } from "react-router-dom";
import { getRole, removeToken } from "../utils/token";

const drawerWidth = 248;

export default function Sidebar() {
  const navigate = useNavigate();
  const isAdmin = getRole() === "ADMIN";

  const links = [
    { label: "Dashboard", to: "/dashboard", icon: <DashboardIcon /> },
    { label: "Accounts", to: "/accounts", icon: <AccountBalanceIcon /> },
    { label: "Transactions", to: "/transactions", icon: <ReceiptLongIcon /> },
    ...(isAdmin
      ? [{
          label: "Administration",
          to: "/admin",
          icon: <AdminPanelSettingsIcon />,
        }]
      : []),
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight={700}>
          Banking
        </Typography>
      </Toolbar>

      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <List sx={{ flex: 1 }}>
          {links.map((link) => (
            <ListItemButton
              key={link.to}
              component={NavLink}
              to={link.to}
              sx={{ "&.active": { bgcolor: "action.selected" } }}
            >
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText primary={link.label} />
            </ListItemButton>
          ))}
        </List>

        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            startIcon={<LogoutIcon />}
            onClick={() => {
              removeToken();
              navigate("/", { replace: true });
            }}
          >
            Log out
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}