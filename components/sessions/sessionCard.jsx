"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { FiUser } from "react-icons/fi";
import { HiOutlineStatusOnline } from "react-icons/hi";

const SessionCard = () => {
  return (
    <Card className="w-full dark:bg-black max-w-[265px] min-w-[265px] rounded-lg shadow-none cursor-pointer hover:scale-105">
      <CardMedia
        component="img"
        alt="UI Design for Beginners"
        height="149"
        width={265}
        image="/placeholder.png"
        className="rounded-t-lg"
      />
      <CardContent className="p-0 dark:black px-1">
        <Typography variant="h6" noWrap className="text-lg font-semibold mb-2">
          Adobe Illustrator Scratch Course
        </Typography>
        <Box className="flex justify-between space-x-2 mb-2 dark:">
          <div className="flex items-center  gap-2">
            <FiUser className="text-gray-500" />
            <Typography variant="body2" className="text-gray-700 dark:text-gray-300">
              Pesu
            </Typography>
          </div>
          <div className="flex items-center  gap-2">
            <HiOutlineStatusOnline className="text-green-500" />
            <Typography variant="body2" className="text-green-500">
              Online
            </Typography>
          </div>
        </Box>
        <Typography variant="body2" noWrap className="text-gray-600 dark:text-gray-300">
          More than 8yr Experience as Illustrator. Learn h...
        </Typography>
        <Box className="flex items-center space-x-2 mt-2">
          <HiOutlineStatusOnline className="text-green-500" />
          <Typography variant="body2" className="text-green-500">
            Online
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SessionCard;
