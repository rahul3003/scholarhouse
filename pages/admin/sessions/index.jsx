import ProjectCard from "@/components/Project/projectCard";
import AdminLayout from "@/components/layout/AdminLayout";
import SessionCard from "@/components/sessions/sessionCard";
import { Button, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";

const Sessions = () => {
  return (
    <AdminLayout
      headContent={
        <Head>
          <title>ScholarHouse || Sessions</title>
          <meta name="description" content="Learn your choice" />
          <meta property="og:image" content="/meta-image.png" />
        </Head>
      }
    >
      <div className="flex flex-col gap-3 py-2 w-full px-6 ">
        <div className="flex items-end justify-end w-full">
          <Button variant="contained">Create</Button>
        </div>
        <div>
          <Typography className="text-[14px] font-semibold">
            Live Sessions
          </Typography>
          <div className="flex overflow-hidden hover:overflow-x-auto  my-6 gap-6">
            <SessionCard />
            <SessionCard />
            <SessionCard />
            <SessionCard />
            <SessionCard />
          </div>
        </div>
        <div>
          <Typography className="text-[14px] font-semibold">
            Pre Recorded Sessions
          </Typography>
          <div className="flex overflow-hidden hover:overflow-x-auto  my-6 gap-6">
            <SessionCard />
            <SessionCard />
            <SessionCard />
            <SessionCard />
            <SessionCard />
          </div>
        </div>
        <div>
          <Typography className="text-[14px] font-semibold">
            Completed Sessions
          </Typography>
          <div className="flex overflow-hidden hover:overflow-x-auto  my-6 gap-6">
            <SessionCard />
            <SessionCard />
            <SessionCard />
            <SessionCard />
            <SessionCard />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Sessions;
