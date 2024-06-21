import React from "react";
import { Container, Grid, Toolbar } from "@mui/material";
import OverviewStats from "@/components/overview/OverviewStats";
import AdminSidebar from "@/components/sidebar/AdminSidebar";
import ProjectStatus from "@/components/overview/ProjectStatus";
import AdminLayout from "@/components/layout/AdminLayout";
import Head from "next/head";
import UserTrends from "@/components/overview/userTrends";

const Overview = () => {
  return (
    <AdminLayout
      headContent={
        <Head>
          <title>ScholarHouse || Admin Overview</title>
          <meta name="description" content="access your overview" />
          <meta property="og:image" content="/meta-image.png" />
        </Head>
      }
    >
      <div className="flex flex-col md:flex-row gap-3 py-2">
        <div className="flex flex-col gap-6">
          <Container className="m-0 md:w-[70%] flex flex-col md:flex-row gap-6">
            <OverviewStats title="Members" value="26505" change="+15.03%" />
            <OverviewStats title="Community" value="715" change="-0.03%" />
          </Container>
          <Container className="m-0 md:w-[70%] flex flex-col md:flex-row gap-6">
            <OverviewStats title="Sessions" value="3212" change="+6.08%" />
            <OverviewStats
              title="Total Projects"
              value="15203"
              change="+11.02%"
            />
          </Container>
        </div>
        <Container className="m-0 w-[50%]">
          <ProjectStatus />
        </Container>
      </div>
      <Container className="m-0 w-full pt-4">
        <UserTrends />
      </Container>
    </AdminLayout>
  );
};

export default Overview;
