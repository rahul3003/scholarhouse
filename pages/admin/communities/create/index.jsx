import CommunityForm from "@/components/community/communityForm";
import CommunitySidebar from "@/components/community/communitySidebar";
import AdminLayout from "@/components/layout/AdminLayout";
import { Avatar, Badge } from "@mui/material";
import Head from "next/head";
import React from "react";
import { Tooltip } from "recharts";

const index = () => {
  return (
    <AdminLayout
      headContent={
        <Head>
          <title>ScholarHouse || Community create</title>
          <meta name="description" content="Learn your choice" />
          <meta property="og:image" content="/meta-image.png" />
        </Head>
      }
    >
      <div className="flex h-[86vh] ">
        <CommunitySidebar />
        <div className="flex justify-center items-center w-full overflow-y-auto">
          <CommunityForm />
        </div>
      </div>
    </AdminLayout>
  );
};

export default index;
