import AdminLayout from "@/components/layout/AdminLayout";
import { IconButton, Typography, Box, Avatar } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import VideoPlayer from "@/components/videoPlayer";
import GroupedMembers from "@/components/groupedMembers";
import ForEnrolled from '@/components/tabs/forEnrolled'

const session = {
  title: "Dummy Title",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, libero quis interdum tempus, justo velit convallis urna, vitae ultrices felis ligula at nisi.",
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
  {
    id: 2,
    details: {
      name: 'Jane Smith',
      photoURL: 'https://randomuser.me/api/portraits/women/1.jpg', // Replace with actual URL to member's photo
    },
  },
];

const Enrolled = () => {
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
        {isClient && (
          <>
            <Box style={{ width: "95%", height: "400px", backgroundColor: "gray", marginBottom: "10px" }}>
              <VideoPlayer videoLink={session.videoLink} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{fontSize:24, fontWeight:550, marginLeft:'20px'}}>{session.title}</Typography>
              {/* <Typography variant="body1">{session.description}</Typography> */}
            </Box>
            <Box mt={0}>
              <ForEnrolled />
            </Box>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default Enrolled;