// components/UserTrends.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', thisYear: 4000, lastYear: 2400 },
  { month: 'Feb', thisYear: 3000, lastYear: 1398 },
  { month: 'Mar', thisYear: 2000, lastYear: 9800 },
  { month: 'Apr', thisYear: 2780, lastYear: 3908 },
  { month: 'May', thisYear: 1890, lastYear: 4800 },
  { month: 'Jun', thisYear: 2390, lastYear: 3800 },
  { month: 'Jul', thisYear: 3490, lastYear: 4300 },
];

const UserTrends = () => {
  return (
    <Card className="m-0 shadow-none rounded-[16px]  md:min-w-[700px] bg-[#F7F9FB]">
      <CardContent className='px-[24px] py-[24px]'>
        <Typography variant="h6">Total Users</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            {/* Remove CartesianGrid to avoid grid lines */}
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="thisYear" stroke="#000" strokeWidth={2} />
            <Line type="monotone" dataKey="lastYear" stroke="#B1E3FF" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default UserTrends;
