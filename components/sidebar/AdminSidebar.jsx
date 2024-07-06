import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Collapse,
  useTheme,
  useMediaQuery,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { PiChartPieSliceFill } from "react-icons/pi";
import { FiSettings } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { BiMessageSquareDetail } from "react-icons/bi";
import { IoMdBook } from "react-icons/io";
import { BsCalendarEvent } from "react-icons/bs";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
  MdMenu,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUser } from "@/store/features/userSlice";
import Image from "next/image";
import HomeIcon from "@mui/icons-material/Home";

const AdminSidebar = () => {
  const router = useRouter();
  const user = useSelector(selectUser);

  const [page, setPage] = useState({ link: "Overview", state: false });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // State for sidebar collapse/expand
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const drawerWidth = sidebarOpen ? 240 : 72; // Adjust width based on state
  const dispatch = useDispatch();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePageClick = (link) => {
    setPage((prevState) => ({
      link,
      state: prevState.link === link ? !prevState.state : true,
    }));
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  const renderAdminItems = () => (
    <>
      <SidebarLink
        href="/admin/Home"
        text="Home"
        icon={<HomeIcon />}
        sidebarOpen={sidebarOpen}
      />
      <SidebarLink
        href="/admin/manageAccess"
        text="Manage Access"
        icon={<FaUsers size={25} />}
        sidebarOpen={sidebarOpen}
      />
      <SidebarLink
        href="/communities/explore"
        text="Communities"
        icon={<FaUsers size={25} />}
        sidebarOpen={sidebarOpen}
      />
      <SidebarCollapse
        text="Sessions"
        icon={<IoMdBook size={25} />}
        page={page}
        handlePageClick={handlePageClick}
        handleNavigation={handleNavigation}
        sidebarOpen={sidebarOpen}
      />
      <SidebarLink
        href="/admin/events"
        text="My Schedule"
        icon={<BsCalendarEvent size={25} />}
        sidebarOpen={sidebarOpen}
      />
      <SidebarLink
        href="/admin/settings"
        text="Settings"
        icon={<FiSettings size={25} />}
        sidebarOpen={sidebarOpen}
      />
    </>
  );

  const renderExpertItems = () => (
    <>
      <SidebarLink
        href="/faculty/overview"
        text="Overview"
        icon={<PiChartPieSliceFill size={25} />}
        sidebarOpen={sidebarOpen}
      />
      <SidebarLink
        href="/communities/explore"
        text="Communities"
        icon={<FaUsers size={25} />}
        sidebarOpen={sidebarOpen}
      />
      <SidebarCollapse
        text="Sessions"
        icon={<IoMdBook size={25} />}
        page={page}
        handlePageClick={handlePageClick}
        handleNavigation={handleNavigation}
        sidebarOpen={sidebarOpen}
      />
      <SidebarLink
        href="/faculty/mySchedule"
        text="My Schedule"
        icon={<BsCalendarEvent size={25} />}
        sidebarOpen={sidebarOpen}
      />
      <SidebarLink
        href="/faculty/resources"
        text="Resources"
        icon={<IoMdBook size={25} />}
        sidebarOpen={sidebarOpen}
      />
      <SidebarLink
        href="/faculty/profile"
        text="My Profile"
        icon={<FaUsers />}
        sidebarOpen={sidebarOpen}
      />
      {/* <SidebarLink
        href="/faculty/requests"
        text="Requests"
        icon={<BiMessageSquareDetail size={25} />}
        sidebarOpen={sidebarOpen}
      /> */}
      <SidebarLink
        href="/faculty/settings"
        text="Settings"
        icon={<FiSettings size={25} />}
        sidebarOpen={sidebarOpen}
      />
    </>
  );

  const renderUserItems = () => (
    <>
      <SidebarLink
        href="/users/overview"
        text="Overview"
        icon={<PiChartPieSliceFill size={25} />}
        sidebarOpen={sidebarOpen}
      />
      <SidebarLink
        href="/communities/explore"
        text="Communities"
        icon={<FaUsers size={25} />}
        sidebarOpen={sidebarOpen}
      />
      <SidebarLink
        href="/users/mySchedule"
        text="My Schedule"
        icon={<BsCalendarEvent size={25} />}
        sidebarOpen={sidebarOpen}
      />
      <SidebarLink
        href="/users/resources"
        text="Resources"
        icon={<IoMdBook size={25} />}
        sidebarOpen={sidebarOpen}
      />
      <SidebarLink
        href="/users/profile"
        text="My Profile"
        icon={<FaUsers size={25} />}
        sidebarOpen={sidebarOpen}
      />
      <SidebarLink
        href="/users/requests"
        text="Requests"
        icon={<BiMessageSquareDetail size={25} />}
        sidebarOpen={sidebarOpen}
      />
      <SidebarLink
        href="/users/settings"
        text="Settings"
        icon={<FiSettings size={25} />}
        sidebarOpen={sidebarOpen}
      />
    </>
  );

  const drawer = (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-center gap=-2">
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, px: 2 }}
          >
            <Image
              src="/logo.svg"
              alt="logo"
              width={sidebarOpen ? 200 : 50}
              height={200}
            />
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { md: "none" }, ml: 1 }}
          >
            <MdMenu />
          </IconButton>
          <IconButton onClick={handleSidebarToggle} sx={{ mx: "auto", my: 2 }}>
            {sidebarOpen ? (
              <MdOutlineKeyboardArrowLeft />
            ) : (
              <MdOutlineKeyboardArrowRight />
            )}
          </IconButton>
        </div>
        <List sx={{ mx: 1 }}>
          {user?.unifiedUserId?.adminId && renderAdminItems()}
          {user?.unifiedUserId?.expertId && renderExpertItems()}
          {user?.unifiedUserId?.userId && renderUserItems()}
        </List>
      </div>
      <Button
        color="error"
        onClick={() => {
          dispatch(logoutUser());
          router.push("/signup");
        }}
        className="mb-12"
      >
        Logout
      </Button>
    </div>
  );

  return (
    <nav>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              flexShrink: 0,
              transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </nav>
  );
};

const SidebarLink = ({ href, text, icon, sidebarOpen }) => (
  <Link href={href} passHref>
    <ListItem disablePadding>
      <ListItemButton sx={{ borderRadius: 1 }}>
        <ListItemIcon>{icon}</ListItemIcon>
        {sidebarOpen && <ListItemText primary={text} />}
      </ListItemButton>
    </ListItem>
  </Link>
);

const SidebarCollapse = ({
  text,
  icon,
  page,
  handlePageClick,
  handleNavigation,
  sidebarOpen,
}) => (
  <>
    <ListItem disablePadding onClick={() => handlePageClick(text)}>
      <ListItemButton sx={{ borderRadius: 1 }}>
        <ListItemIcon>{icon}</ListItemIcon>
        {sidebarOpen && <ListItemText primary={text} />}
        {sidebarOpen &&
          (page.link === text && page.state ? (
            <MdOutlineKeyboardArrowDown />
          ) : (
            <MdOutlineKeyboardArrowRight />
          ))}
      </ListItemButton>
    </ListItem>
    <Collapse
      in={page.link === text && page.state}
      timeout="auto"
      unmountOnExit
    >
      <List component="div" disablePadding sx={{ pl: 4 }}>
        <ListItemButton onClick={() => handleNavigation("/admin/sessions")}>
          <ListItemText primary="View All" />
        </ListItemButton>
        <ListItemButton
          onClick={() => handleNavigation("/admin/sessions/my_sessions")}
        >
          <ListItemText primary="My Sessions" />
        </ListItemButton>
      </List>
    </Collapse>
  </>
);

export default AdminSidebar;
