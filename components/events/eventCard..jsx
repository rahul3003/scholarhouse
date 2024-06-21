"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import { FiUser } from "react-icons/fi";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { DateRange, Delete, Edit } from "@mui/icons-material";

const EventsCard = () => {
  return (
    <Card className="w-full dark:bg-black ring-[1px] ring-gray-200 max-w-[195px] min-w-[195px] max-h-[258px] rounded-lg shadow-none cursor-pointer ">
      <CardMedia
        component="img"
        alt="UI Design for Beginners"
        height="149"
        width={265}
        image="/placeholder.png"
        className="rounded-t-lg"
      />
      <CardContent className="p-0 dark:black">
        <div className="bg-[#F1F0FC] flex gap-2 text-[13px] items-center px-3 py-1 text-[#495AFF]">
          <DateRange className="text-[13px]" />
          <span>April 30, 2023</span>
        </div>
        <div className="flex flex-col gap-[.01px] px-3 py-3">
          <Typography
            variant="h6"
            noWrap
            className="text-[14px]  font-semibold mb-2"
          >
            Adobe Illustrator Scratch Course
          </Typography>
          <Typography
            variant="body2"
            noWrap
            className="text-gray-600 dark:text-gray-300"
          >
            More than 8yr Experience as Illustrator. Learn h...
          </Typography>
        </div>
        <Box className="flex justify-between space-x-2 mb-2 px-3">
          <div className="flex items-center justify-between  gap-2">
            <Button variant="contained" size="small">
              View
            </Button>
            <button className="bg-emerald-400 p-1 px-2 text-white rounded-md">
              <Edit  className="p-0 m-0 text-[18px]"/>
            </button>
            <button className="bg-red-400 p-1 px-2 text-white rounded-md">
              <Delete className="p-0 m-0 text-[18px]" />
            </button>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventsCard;
