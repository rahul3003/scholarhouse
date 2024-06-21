"use client";
import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { MdMenu } from "react-icons/md";
import { useTheme, useMediaQuery } from "@mui/material";

const notifications = [
  { title: "Design department", time: "Just now" },
  { title: "AI / ML", time: "59 minutes ago" },
  { title: "MBA", time: "Today, 11:59 AM" },
  { title: "Engineering", time: "13 hours ago" },
  { title: "MCOM", time: "18 hours ago" },
];

const activities = [
  { title: "New session by Kirit (design)", time: "Just now" },
  { title: "Released a new research paper", time: "10 minutes ago" },
  { title: "New session by Suresh (PVU)", time: "18 hours ago" },
  { title: "Released a new research paper", time: "Today, 11:59 AM" },
  { title: "Released a new research paper", time: "Feb 2, 2024" },
];

const requests = ["Anala", "Rebecca", "Taara", "Shanaya", "Shrishti", "Anant"];

const RightNotificationDrawer = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const drawerWidth = 300;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      className="h-full bg-white dark:bg-black text-black dark:text-white"
      sx={{ width: drawerWidth }}
    >
      <Toolbar className="flex justify-between px-4">
        <Typography variant="h6" noWrap>
          Notifications
        </Typography>
        <IconButton color="inherit" onClick={handleDrawerToggle}>
          <MdMenu />
        </IconButton>
      </Toolbar>
      <Box className="px-4 py-2">
        <Typography variant="subtitle1" className="text-gray-500 dark:text-gray-300">
          Notifications
        </Typography>
        <List>
          {notifications.map((notification, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemText primary={notification.title} secondary={notification.time} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Typography variant="subtitle1" className="text-gray-500 dark:text-gray-300 mt-4">
          Activities
        </Typography>
        <List>
          {activities.map((activity, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemText primary={activity.title} secondary={activity.time} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Typography variant="subtitle1" className="text-gray-500 dark:text-gray-300 mt-4">
          Requests
        </Typography>
        <List>
          {requests.map((request, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemText primary={request} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <nav>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="end"
        onClick={handleDrawerToggle}
        sx={{ display: { md: "none" }, mr: 1 }}
      >
        <MdMenu />
      </IconButton>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="right"
        open={!isMobile || mobileOpen}
        onClose={isMobile ? handleDrawerToggle : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </nav>
  );
};

export default RightNotificationDrawer;
