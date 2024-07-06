"use client";
import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { FiBell, FiSearch, FiSun, FiMoon } from "react-icons/fi";

const Header = ({ toggleTheme, mode }) => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#fff", color: "#000", boxShadow: "none" }} // Correct usage
      className="flex justify-between shadow-none border-b-[1px] text-black dark:bg-black dark:text-white" // Avoid conflicting bg classes
    >
      <Toolbar className="flex justify-between">
        <div className="flex gap-2 items-center">
          {/* <Typography color="inherit" className="text-[14px]">
            Dashboard
          </Typography> */}
          {/* <Typography className="text-[14px]">/</Typography> */}
          <Typography className="text-[14px] flex gap-2">
            {window.location.pathname
              ?.split("/")
              ?.slice(1, window.location.pathname?.split("/")?.length)
              ?.map((data, index) => (
                <div key={index}>{`/ ${data}`}</div>
              ))}
          </Typography>
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
