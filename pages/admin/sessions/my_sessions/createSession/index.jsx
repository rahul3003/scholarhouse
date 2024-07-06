// import { useInternalNotification } from "antd/es/notification/useNotification";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import CreateSessionForm from "@/components/createSession";
import AdminLayout from "@/components/layout/AdminLayout";
import SessionCreateFrom from "@/components/sessionCreateForm";
import { IconButton, Typography, Box, Avatar } from "@mui/material";
import { useRouter } from "next/router";




const CreateSession = () => {

  const router = useRouter();
  const { component } = router.query;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <AdminLayout>
      <Head>
        <title>ScholarHouse || Sessions</title>
        <meta name="description" content="Learn your choice" />
        <meta property="og:image" content="/meta-image.png" />
      </Head>
      <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
        <SessionCreateFrom component={component}/>
      </div>
    </AdminLayout>
  );
};

export default CreateSession;