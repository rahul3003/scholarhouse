import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { People } from "@mui/icons-material";

const OverviewStats = ({ title, value, change }) => {
  return (
    <Card className="shadow-none rounded-[16px] max-w-[212px] min-w-[212px] max-h-[116px] bg-[#E3F5FF]">
      <CardContent className="px-[24px] py-[24px] flex flex-col gap-[8px]">
        <div className="flex justify-between gap-4">
          <Typography className="text-[14px]">{title}</Typography>
          <People />
        </div>
        <div className="flex justify-between gap-4 items-center">
          <Typography className="text-[24px] font-semibold">{value}</Typography>
          <Typography color="textSecondary" className="text-[12px]">{change}</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewStats;
