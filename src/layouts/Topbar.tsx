import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Box,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Topbar() {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={1}
      sx={{
        width: "calc(100% - 250px)",
        ml: "250px",
        backgroundColor: "#fff",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 600 }}
        >
          Enterprise Banking System
        </Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <IconButton color="inherit">
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit">
            <Avatar sx={{ width: 36, height: 36 }}>
              <AccountCircleIcon />
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}