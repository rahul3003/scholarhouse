import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
  Collapse,
} from "@mui/material";
import { PiChartPieSliceFill } from "react-icons/pi";
import { FiSettings } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { RiSurveyLine } from "react-icons/ri";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { BsCalendarEvent } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight, MdMenu } from "react-icons/md";
import { IoMdBook } from "react-icons/io";
import Link from "next/link";
import { useTheme, useMediaQuery } from "@mui/material";

const AdminSidebar = () => {
  const [page, setPage] = useState({ link: "Overview", state: false });
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handlePageClick = (link) => {
    setPage((prevState) => ({
      link,
      state: prevState.link === link ? !prevState.state : true,
    }));
  };

  const drawer = (
    <div>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1, px: 2 }}
        >
          ScholarHouse
        </Typography>
      </Toolbar>
      <Typography
        sx={{ fontSize: 16, color: "text.secondary", px: 3, py: 1 }}
        noWrap
        component="div"
      >
        Dashboard
      </Typography>
      <List sx={{ mx: 1 }}>
        <Link href="/admin/overview" passHref>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                borderRadius: 1,
              }}
              className={`${page.link === "Overview" ? "bg-gray-200 dark:bg-gray-800":""}`}
              onClick={() => handlePageClick("Overview")}
            >
              <ListItemIcon>
                <PiChartPieSliceFill />
              </ListItemIcon>
              <ListItemText primary="Overview" />
            </ListItemButton>
          </ListItem>
        </Link>
        <ListItem disablePadding onClick={() => handlePageClick("Sessions")}>
          <ListItemButton
            sx={{
              borderRadius: 1,
            }}
            className={`${page.link === "Sessions" ? "bg-gray-200 dark:bg-gray-800":""}`}
          >
            <ListItemIcon>
              {page.link === "Sessions" && page.state ? (
                <MdOutlineKeyboardArrowDown />
              ) : (
                <MdOutlineKeyboardArrowRight />
              )}
            </ListItemIcon>
            <IoMdBook />
            <ListItemText primary="Sessions" />
          </ListItemButton>
        </ListItem>
        <Collapse in={page.link === "Sessions" && page.state} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            <Link href="/admin/sessions" passHref>
              <ListItemButton>
                <ListItemText primary="Sessions Subitem" />
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
        <Link href="/admin/communities" passHref>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                pl: 3,
                bgcolor: page.link === "Communities" ? "grey.200" : "transparent",
                borderRadius: 1,
              }}
              onClick={() => handlePageClick("Communities")}
            >
              <ListItemIcon>
                <FaUsers />
              </ListItemIcon>
              <ListItemText primary="Communities" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/admin/profile" passHref>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                pl: 3,
                bgcolor: page.link === "Profile" ? "grey.200" : "transparent",
                borderRadius: 1,
              }}
              onClick={() => handlePageClick("Profile")}
            >
              <ListItemIcon>
                <AiOutlineUser />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/admin/requests" passHref>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                pl: 3,
                bgcolor: page.link === "Requests" ? "grey.200" : "transparent",
                borderRadius: 1,
              }}
              onClick={() => handlePageClick("Requests")}
            >
              <ListItemIcon>
                <BiMessageSquareDetail />
              </ListItemIcon>
              <ListItemText primary="Requests" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/admin/survey" passHref>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                pl: 3,
                bgcolor: page.link === "Survey" ? "grey.200" : "transparent",
                borderRadius: 1,
              }}
              onClick={() => handlePageClick("Survey")}
            >
              <ListItemIcon>
                <RiSurveyLine />
              </ListItemIcon>
              <ListItemText primary="Survey" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Typography sx={{ fontSize: 16, color: "text.secondary", px: 3, py: 1 }} noWrap component="div">
          Pages
        </Typography>
        <Link href="/admin/department" passHref>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                pl: 3,
                bgcolor: page.link === "Department" ? "grey.200" : "transparent",
                borderRadius: 1,
              }}
              onClick={() => handlePageClick("Department")}
            >
              <ListItemIcon>
                <HiOutlineBuildingOffice2 />
              </ListItemIcon>
              <ListItemText primary="My Department" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/admin/events" passHref>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                pl: 3,
                bgcolor: page.link === "Events" ? "grey.200" : "transparent",
                borderRadius: 1,
              }}
              onClick={() => handlePageClick("Events")}
            >
              <ListItemIcon>
                <BsCalendarEvent />
              </ListItemIcon>
              <ListItemText primary="Events" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/admin/requests-page" passHref>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                pl: 3,
                bgcolor: page.link === "RequestsPage" ? "grey.200" : "transparent",
                borderRadius: 1,
              }}
              onClick={() => handlePageClick("RequestsPage")}
            >
              <ListItemIcon>
                <BiMessageSquareDetail />
              </ListItemIcon>
              <ListItemText primary="Requests" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href="/admin/settings" passHref>
          <ListItem disablePadding>
            <ListItemButton
              sx={{
                pl: 3,
                bgcolor: page.link === "Settings" ? "grey.200" : "transparent",
                borderRadius: 1,
              }}
              onClick={() => handlePageClick("Settings")}
            >
              <ListItemIcon>
                <FiSettings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <nav>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ display: { md: "none" }, ml: 1 }}
      >
        <MdMenu />
      </IconButton>
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
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

export default AdminSidebar;
