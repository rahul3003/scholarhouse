"use client";
import React, { useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import useTheme from "@/hooks/useTheme";
import AdminSidebar from "@/components/sidebar/AdminSidebar";
import Header from "../appBar/Header";
import RightNotificationDrawer from "../sidebar/RightNotificationDrawer";

const AdminLayout = ({ children, headContent }) => {
  const [theme, toggleTheme, mode] = useTheme();

  useEffect(() => {
    document.documentElement.className = mode;
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`flex ${mode}`}>
        {headContent}
        <AdminSidebar />
        <div className="flex-1 min-h-screen pb-10  bg-white dark:bg-black text-black dark:text-white overflow-hidden">
          <Header toggleTheme={toggleTheme} mode={mode} />
          {children}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AdminLayout;