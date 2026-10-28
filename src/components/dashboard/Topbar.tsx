import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Badge,
  Box,
  Menu,
  MenuItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
} from "../../services/notificationService";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EmailIcon from "@mui/icons-material/Email";
import SmsIcon from "@mui/icons-material/Sms";

import type { Notification } from "../../types/Notification";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
dayjs.extend(relativeTime);
export default function Topbar() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [profileAnchorEl, setProfileAnchorEl] =
  useState<null | HTMLElement>(null);

const profileOpen = Boolean(profileAnchorEl);
const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const loadUnreadCount = async () => {
    try {
      const count = await getUnreadCount();
      setUnreadCount(count);
    } catch (error) {
      console.error("Failed to load notification count:", error);
    }
  };

  const handleNotificationClick = async (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorEl(event.currentTarget);

    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Failed to load notifications:", error);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfileMenuOpen = (
  event: React.MouseEvent<HTMLElement>
) => {
  setProfileAnchorEl(event.currentTarget);
};

const handleProfileMenuClose = () => {
  setProfileAnchorEl(null);
};
const handleMarkAsRead = async (id: number) => {
  try {
    await markAsRead(id);

    // Reload notifications
    const data = await getNotifications();
    setNotifications(data);

    // Reload unread badge
    const count = await getUnreadCount();
    setUnreadCount(count);

  } catch (error) {
    console.error(error);
  }
};
const handleMarkAllAsRead = async () => {
  try {
    await markAllAsRead();

    const notifications = await getNotifications();
    setNotifications(notifications);

    const count = await getUnreadCount();
    setUnreadCount(count);
  } catch (error) {
    console.error(error);
  }
};
const getNotificationIcon = (type: string) => {
  switch (type) {
    case "EMAIL":
      return <EmailIcon color="primary" />;

    case "SMS":
      return <SmsIcon color="success" />;

    default:
      return <NotificationsActiveIcon color="warning" />;
  }
};


  useEffect(() => {
    loadUnreadCount();
  }, []);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "#0F172A",
        color: "#FFFFFF",
        borderBottom: "1px solid #1E293B",
      }}
    >
      <Toolbar sx={{ position: "relative" }}>
        {/* Center Title */}
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            color: "#FFFFFF",
          }}
        >
          Enterprise Banking Dashboard
        </Typography>

        {/* Right Side */}
        <Box
          sx={{
            ml: "auto",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <IconButton color="inherit">
            <LightModeIcon />
          </IconButton>

          <IconButton
            color="inherit"
            onClick={handleNotificationClick}
          >
            <Badge
              badgeContent={unreadCount}
              color="error"
            >
              <NotificationsIcon />
              
            </Badge>
          </IconButton>
<Avatar
  onClick={handleProfileMenuOpen}
  sx={{
    bgcolor: "#2563EB",
    cursor: "pointer",
    transition: "0.2s ease",
    "&:hover": {
      transform: "scale(1.08)",
      boxShadow: 3,
    },
  }}
>
  H
</Avatar>
       
        </Box>
{/* Notification Menu */}
<Menu
  anchorEl={anchorEl}
  open={open}
  onClose={handleClose}
  PaperProps={{
    sx: {
      width: 380,
      maxHeight: 500,
      borderRadius: 2,
    },
  }}
>
  {/* Header */}
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      px: 2,
      py: 1,
    }}
  >
    <Typography fontWeight="bold">
      Notifications
    </Typography>

    <Typography
      variant="body2"
      sx={{
        color: "#1976D2",
        cursor: "pointer",
        fontWeight: 600,
      }}
      onClick={handleMarkAllAsRead}
    >
      Mark All Read
    </Typography>
  </Box>

  <Divider />

  <Box
    sx={{
      maxHeight: 350,
      overflowY: "auto",
    }}
  >
    {notifications.length === 0 ? (
      <MenuItem>
        <ListItemText
          primary="No Notifications"
          secondary="You're all caught up!"
        />
      </MenuItem>
    ) : (
      notifications.map((notification) => (
        <MenuItem
          key={notification.id}
          onClick={() => handleMarkAsRead(notification.id)}
          sx={{
            alignItems: "flex-start",
            gap: 2,
            py: 1.5,
            bgcolor: notification.read ? "background.paper" : "#E3F2FD",
            borderLeft: notification.read
              ? "none"
              : "4px solid #1976D2",
            "&:hover": {
              bgcolor: "#F5F7FA",
            },
          }}
        >
          {/* Icon + Blue Dot */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mt: 0.5,
            }}
          >
            {!notification.read && (
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor: "#1976D2",
                }}
              />
            )}

            {getNotificationIcon(notification.notificationType)}
          </Box>

          {/* Notification Details */}
          <ListItemText
            primary={
              <Typography
                fontWeight={notification.read ? 500 : 700}
              >
                {notification.title}
              </Typography>
            }
            secondary={
              <>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {notification.message}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.disabled"
                  sx={{
                    display: "block",
                    mt: 0.5,
                  }}
                >
                  {dayjs(notification.createdAt).fromNow()}
                </Typography>
              </>
            }
          />
        </MenuItem>
      ))
    )}
  </Box>

  <Divider />

  <MenuItem
    onClick={() => {
      handleClose();
      navigate("/notifications");
    }}
    sx={{
      justifyContent: "center",
      color: "#1976D2",
      fontWeight: 600,
    }}
  >
    View All Notifications
  </MenuItem>
</Menu>
{/* Profile Menu */}
<Menu
  anchorEl={profileAnchorEl}
  open={profileOpen}
  onClose={handleProfileMenuClose}
  PaperProps={{
    sx: {
      width: 250,
      borderRadius: 2,
    },
  }}
>
  <MenuItem
    onClick={() => {
      handleProfileMenuClose();
      navigate("/profile");
    }}
  >
    <PersonIcon sx={{ mr: 2 }} />
    My Profile
  </MenuItem>

  <MenuItem
    onClick={() => {
      handleProfileMenuClose();
      navigate("/settings");
    }}
  >
    <SettingsIcon sx={{ mr: 2 }} />
    Settings
  </MenuItem>

  <Divider />

  <MenuItem
    onClick={() => {
      handleProfileMenuClose();
    }}
  >
    <LogoutIcon
      sx={{
        mr: 2,
        color: "error.main",
      }}
    />
    Logout
  </MenuItem>
</Menu>
      </Toolbar>
    </AppBar>
  );
}