import AdminLayout from "@/components/layout/AdminLayout";
import { IconButton, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VideoPlayer from "@/components/videoPlayer";
import { useRouter } from "next/router";
import TabsComponent from "@/components/tabs";
import RightPanelEnroll from "@/components/rightPanelEnroll";
import GroupedMembers from "@/components/groupedMembers";

const session = {
  title: "Dummy Title",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, libero quis interdum tempus, justo velit convallis urna, vitae ultrices felis ligula at nisi.",
  videoLink: "https://www.youtube.com/watch?v=BU0HuZLGSuU", // Replace with your actual video link
};

const dummyMembers = [
  {
    id: 1,
    details: {
      name: 'John Doe',
      photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAbxLFQV-czLC8EIyE7-XELkRxB7NuHx9XxQ&s', // Replace with actual URL to member's photo
    },
  },
];

const SessionEnroll = () => {
  const router = useRouter();

  const handleBackButton = () => {
    console.log('Back button clicked');
    router.back();
  };

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
      <div style={{ display: "flex", flexDirection: "row" }}>
        {/* Left 75% section */}
        <div style={{ flex: "72%", padding: "20px" }}>
          {/* <IconButton onClick={handleBackButton} style={{ marginBottom: "10px" }}>
            <ArrowBackIcon />
          </IconButton> */}
          <Typography style={{ fontSize: 24, marginLeft: "20px", fontWeight: 700, marginBottom: "20px" }}>
            {session.title}
          </Typography>
          <Typography style={{ fontSize: 18, marginLeft: "20px", marginBottom: "20px" }}>
            {session.description}
          </Typography>
          <div className="flex flex-row" style={{marginBottom:'10px', marginLeft:'15px'}}>
          <GroupedMembers members={dummyMembers} />
          <div className="flex flex-col">
          <Typography sx={{marginLeft:'10px', marginTop:'25px', fontSize:12}}>
            Created By:
          </Typography>
          <Typography sx={{marginLeft:'10px', marginTop:'0px', fontSize:14, fontWeight:600}}>
            {dummyMembers[0].details.name}
          </Typography>
          </div>
          </div>
          <div style={{ width: "95%", height: "350px", backgroundColor: "gray", marginLeft: "20px", marginRight: "20px" }}>
            <VideoPlayer videoLink={session.videoLink} />
          </div>
          <TabsComponent />
        </div>
        {/* Right 25% section */}
        <div style={{ flex: "28%", padding: "20px" }}>
            <RightPanelEnroll />
        </div>
      </div>
    </AdminLayout>
  );
};

export default SessionEnroll;
