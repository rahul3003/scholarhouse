"use client";
import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { FiBell, FiSearch, FiSun, FiMoon } from "react-icons/fi";

const Header = ({ toggleTheme, mode }) => {
  return (
    <AppBar
      position="static"
      className="flex  justify-between bg-white dark:bg-black text-black dark:text-white shadow-none border-b-[1px] "
    >
      <Toolbar className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Typography color="inherit" className="text-[14px]">
            Dashboard
          </Typography>
          <Typography className="text-[14px]">/</Typography>
          <Typography className="text-[14px]">Default</Typography>
        </div>
        <div className="flex items-center gap-3">
          <IconButton color="inherit">
            <FiSearch />
          </IconButton>
          <IconButton color="inherit" onClick={toggleTheme}>
            {mode === "dark" ? <FiSun /> : <FiMoon />}
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
