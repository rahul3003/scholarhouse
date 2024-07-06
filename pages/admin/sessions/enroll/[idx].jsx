import AdminLayout from "@/components/layout/AdminLayout";
import { CardMedia, IconButton, Typography } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import TabsComponent from "@/components/tabs";
import RightPanelEnroll from "@/components/rightPanelEnroll";
import { useSelector } from "react-redux";
import { selectSession } from "@/store/features/sessionSlice";
import api from "@/utils/apiSetup";

const SessionEnroll = () => {
  const router = useRouter();

  const [members, setMembers] = useState();

  const session = useSelector(selectSession);
  const sessionSlotId = session?.SessionSlot[0]?.id;

  useEffect(() => {
    getAttendanceCount();
  }, [sessionSlotId]);

  const getAttendanceCount = async () => {
    api
      .get(`/session/getTotalAttendance?sessionSlotId=${sessionSlotId}`)
      .then((res) => {
        setMembers(res.data.data);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };

  // const handleBackButton = () => {
  //   console.log('Back button clicked');
  //   router.back();
  // };

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
          <Typography
            style={{
              fontSize: 24,
              marginLeft: "20px",
              fontWeight: 700,
              marginBottom: "20px",
            }}
          >
            {session.title}
          </Typography>
          {/* <Typography style={{ fontSize: 18, marginLeft: "20px", marginBottom: "20px" }}>
            {session.desc}
          </Typography> */}
          <div
            className="flex flex-row"
            style={{ marginBottom: "10px", marginLeft: "15px" }}
          >
            {/* <GroupedMembers members={dummyMembers} /> */}
            {/* <div className="flex flex-col">
          <Typography sx={{marginLeft:'10px', marginTop:'25px', fontSize:12}}>
            Created By:
          </Typography>
          <Typography sx={{marginLeft:'10px', marginTop:'0px', fontSize:14, fontWeight:600}}>
            {dummyMembers[0].details.name}
          </Typography>
          </div> */}
          </div>
          <div
            style={{
              width: "95%",
              height: "350px",
              marginLeft: "20px",
              marginRight: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <CardMedia
              component="img"
              alt="session image"
              image={session?.infoImgs} // Use your session image field here
              style={{
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit: "contain",
              }} // Ensure the image fits within the container
            />
          </div>
          <TabsComponent />
        </div>
        {/* Right 25% section */}
        <div style={{ flex: "28%", padding: "20px" }}>
          <RightPanelEnroll members={members} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default SessionEnroll;
