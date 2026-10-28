import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import {
  AccountBalanceWallet,
  Dashboard,
  Logout,
  ReceiptLong,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { removeToken } from "../../utils/token";

const drawerWidth = 260;

const menuItems = [
  {
    text: "Dashboard",
    icon: <Dashboard />,
    path: "/dashboard",
  },
  {
    text: "Accounts",
    icon: <AccountBalanceWallet />,
    path: "/accounts",
  },
  {
    text: "Transactions",
    icon: <ReceiptLong />,
    path: "/transactions",
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/", { replace: true });
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          bgcolor: "#0F172A",
          color: "white",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Toolbar />

      <List sx={{ flexGrow: 1 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={NavLink}
            to={item.path}
            sx={{
              color: "white",
              "&.active": {
                bgcolor: "#2563EB",
              },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ mb: 2 }}>
        <List>
          <ListItemButton
            onClick={handleLogout}
            sx={{
              color: "#EF4444",
              "&:hover": {
                bgcolor: "#1E293B",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#EF4444" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}