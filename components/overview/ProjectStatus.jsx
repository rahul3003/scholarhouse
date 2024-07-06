// components/ProjectStatus.js
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Completed", value: 67.6 },
  { name: "In Progress", value: 26.4 },
];

const COLORS = ["#B1E3FF", "#1C1C1C"];

const ProjectStatus = () => {
  return (
    <Card className="m-0 shadow-none rounded-[16px] w-[340px] md:max-w-[432px] md:min-w-[422px] min-h-[260px] md:max-h-[260px] bg-[#F7F9FB]">
      <CardContent className="px-[34px] py-[24px] flex md:gap-10 flex-col">
        <Typography variant="h6">Project Status</Typography>
        <div className="flex flex-col md:flex-row  justify-between items-center">
          <ResponsiveContainer width={150} height={150}>
            <PieChart>
              <Pie
                data={data}
                innerRadius={30}
                outerRadius={60}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-6">
            {data.map((data, index) => (
              <div className="flex items-center gap-2 " key={index}>
                <div
                  className={`w-[8px] min-h-[8px] rounded-full  ${
                    index == -0 ? "bg-[#B1E3FF]" : "bg-[#1C1C1C]"
                  }`}
                ></div>
                <Typography className="text-[17px] ">{data.name}</Typography>
                <span>{data.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectStatus;
