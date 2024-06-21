import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const requests = [
  { name: "Anila" },
  { name: "Rebecca" },
  { name: "Rebecca" },
  { name: "Rebecca" },
 
 
  // Add more requests
];

const Requests = () => {
  return (
    <div className="pl-6 pr-2">
      <Typography className="text-[14px]">Requests</Typography>
      <List className="m-0 p-0 py-1 overflow-hidden overflow-y-auto">
        {requests.map((request, index) => (
          <ListItem key={index} className="flex items-center gap-3 px-1">
            <Avatar className="h-[24px] w-[24px] p-1 text-[13px]">{request.name?.charAt(0)}</Avatar>
            <ListItemText primary={request.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Requests;
