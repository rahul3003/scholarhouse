import React from "react";
import { List, ListItem, Typography } from "@mui/material";
import { Person2Rounded } from "@mui/icons-material";

const activities = [
  { name: "Anila", date: "22/05/2024" },
  { name: "Rebecca", date: "22/05/2024" },
  { name: "Rebecca", date: "22/05/2024" },
  { name: "Rebecca", date: "22/05/2024" },
  { name: "Rebecca", date: "22/05/2024" },
  { name: "Rebecca hgfdshf ", date: "22/05/2024" },
  // Add more requests
];

const Activities = () => {
  return (
    <div className="pl-6 pr-2">
      <Typography className="text-[14px]">Activities</Typography>
      <List className="m-0 p-0 py-1  overflow-hidden overflow-y-auto">
        {activities.map((request, index) => (
          <ListItem
            key={index}
            className="flex gap-2 px-1 items-start justify-start"
          >
            <div className="w-[24px] h-[24px] rounded-[8px] bg-[#E5ECF6] items-center justify-center mt-[1px]">
              <Person2Rounded />
            </div>
            <div>
              <Typography className="text-[14px]" noWrap>
                {request.name}
              </Typography>
              <Typography className="text-[12px] text-black/40">
                {request.date}
              </Typography>
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Activities;
