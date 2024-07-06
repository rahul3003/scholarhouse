import React from "react";
import AdminLayout from "./AdminLayout";
import CommunitySidebar from "../community/communitySidebar";
import SubCommunitySidebar from "../community/subCommunitySidebar";
import Head from "next/head";

const CommunityLayout = ({ children }) => {
  return (
    <AdminLayout
      headContent={
        <Head>
          <title>ScholarHouse || Community</title>
          <meta name="description" content="Learn your choice" />
          <meta property="og:image" content="/meta-image.png" />
        </Head>
      }
    >
      <div className="flex h-[90vh] overflow-hidden">
        <CommunitySidebar />
        <SubCommunitySidebar />
      </div>
    </AdminLayout>
  );
};

export default CommunityLayout;
