"use client";
import React, { useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import useTheme from "@/hooks/useTheme";
import AdminSidebar from "@/components/sidebar/AdminSidebar";
import Header from "../appBar/Header";
import RightNotificationDrawer from "../sidebar/RightNotificationDrawer";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/userSlice";

const AdminLayout = ({ children, headContent }) => {
  const [theme, toggleTheme, mode] = useTheme();
  const user = useSelector(selectUser);
  useEffect(() => {
    console.log(user);
    document.documentElement.className = mode;
  }, [mode,user]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`flex ${mode} `}>
        {headContent}
        <AdminSidebar user={user} />
        <div className="flex-1 min-h-[92vh]   bg-white dark:bg-black text-black dark:text-white overflow-hidden">
          <Header toggleTheme={toggleTheme} mode={mode} />
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AdminLayout;
