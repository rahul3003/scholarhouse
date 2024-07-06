import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Divider,
} from "@mui/material";
import { FiUser } from "react-icons/fi";
import { useRouter } from "next/router";
import api from "@/utils/apiSetup";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSessionById } from "@/store/features/sessionSlice";
import { selectUser } from "@/store/features/userSlice";

// const sessions = [
//   {
//     id: 1,
//     infoImgs: "/placeholder.png",
//     title: "Adobe Illustrator Scratch Course",
//     author: "Pesu",
//     isOnline: true,
//     date: "2024-06-19",
//     members: 123,
//     tag: "Design",
//     description: "More than 8yr Experience as Illustrator. Learn how to create stunning illustrations...",
//   },
//   {
//     id: 2,
//     infoImgs: "/placeholder.png",
//     title: "Adobe Illustrator Scratch Course",
//     author: "Pesu",
//     isOnline: true,
//     date: "2024-06-19",
//     members: 123,
//     tag: "Design",
//     description: "More than 8yr Experience as Illustrator. Learn how to create stunning illustrations...",
//   },
//   {
//     id: 3,
//     infoImgs: "/placeholder.png",
//     title: "Adobe Illustrator Scratch Course",
//     author: "Pesu",
//     isOnline: true,
//     date: "2024-06-19",
//     members: 123,
//     tag: "Design",
//     description: "More than 8yr Experience as Illustrator. Learn how to create stunning illustrations...",
//   },
//   {
//     id: 4,
//     infoImgs: "/placeholder.png",
//     title: "Adobe Illustrator Scratch Course",
//     author: "Pesu",
//     isOnline: true,
//     date: "2024-06-19",
//     members: 123,
//     tag: "Design",
//     description: "More than 8yr Experience as Illustrator. Learn how to create stunning illustrations...",
//   },
//   {
//     id: 5,
//     infoImgs: "/placeholder.png",
//     title: "Adobe Illustrator Scratch Course",
//     author: "Pesu",
//     isOnline: true,
//     date: "2024-06-19",
//     members: 123,
//     tag: "Design",
//     description: "More than 8yr Experience as Illustrator. Learn how to create stunning illustrations...",
//   },
//   // Add more sessions as needed
// ];

const SessionCard = ({ session, check }) => {
  const [members, setMembers] = useState();

  const user = useSelector(selectUser);

  const userId = user?.id;

  const sessionId = session?.id;

  const sessionSlotId = session?.SessionSlot[0]?.id;

  const [tag, setTag] = useState();
  const router = useRouter();
  const dispatch = useDispatch();
  console.log("sessionnnnn", session);
  // const tagId = session?.tags[0]?.tagId

  useEffect(() => {
    // tagId !== NaN && getTagName()
    getAttendanceCount();
  }, []);

  const getAttendanceCount = async () => {
    api
      .get(`/session/getTotalAttendance?sessionSlotId=${sessionSlotId}`)
      .then((res) => {
        console.log("countres----", res.data.data);
        setMembers(res.data.data);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };

  // const getTagName=async ()=>{
  //   await api.get(`/tag/getTagName?tagId=${tagId}`)
  //   .then((res)=>{
  //     console.log('tagress',res.data.data.name)
  //     setTag(res.data.data.name)
  //   })
  //   .catch((err)=>{
  //     console.log('error:', err)
  //   })
  // }

  const handleCardClick = async (session) => {
    console.log("session no.", session?.id);
    dispatch(setSelectedSessionById(session?.id));
    await api
      .get(
        `/session/getEnrolStatus?userId=${userId}&sessionId=${sessionId}&sessionSlotId=${sessionSlotId}`
      )
      .then((res) => {
        console.log("enrolstatusres", res.data.data);
        if (res.data.data === null) {
          router.push(`/admin/sessions/enroll/${session?.id}`);
        } else {
          router.push(`/admin/sessions/enrolled/${session?.id}`);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });

    // router.push(`/admin/sessions/enroll/${id}`)
  };

  return (
    <Card
      onClick={() => handleCardClick(session)}
      sx={{
        width: "250px",
        height: "320px",
        margin: "10px",
        transition: "transform 0.2s",
        cursor: "pointer",
        border: "1px solid",
        borderColor: "grey.300",
        "&:hover": {
          transform: "scale(1.05)",
        },
        "@media (max-width: 600px)": {
          width: "100%",
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ height: "140px", overflow: "hidden" }}>
        <CardMedia
          component="img"
          alt="session image"
          height="100%"
          image={session?.infoImgs}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Ensures image fills the entire space
          }}
        />
      </Box>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 2,
          backgroundColor: "background.default",
          flex: "1 0 auto",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            {/* {session?.tags.length !==0 && <Chip label={tag} size="small" sx={{ marginTop: 0, marginLeft: 0 }} />} */}
            <Typography variant="body2" color="textSecondary">
              {new Date(session.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Typography>
          </Box>
          <Typography
            variant="h7"
            sx={{
              fontWeight: "bold",
              marginBottom: 1,
              marginLeft: 1,
              overflowWrap: "break-word",
              width: "90%",
            }}
          >
            {session.title}
          </Typography>
        </Box>
        <Divider sx={{ marginTop: "auto" }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            marginTop: 1,
          }}
        >
          <FiUser color="blue" />
          <Typography variant="body2" color="textSecondary">
            {members} Members
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const SessionList = ({ sessions, check }) => {
  const maxRows = 2;
  const maxSessions = maxRows * 4;

  const displayedSessions =
    check === "dashboard" ? sessions.slice(0, maxSessions) : sessions;

  console.log("sesion insidee", sessions);
  return (
    <Box className="flex flex-wrap gap-2 justify-start">
      {displayedSessions?.length !== 0 ? (
        displayedSessions?.map((session) => (
          <SessionCard key={session?.id} session={session} />
        ))
      ) : (
        <div>
          <Typography
            className="text-gray-500"
            sx={{ fontSize: 20, fontWeight: 500 }}
          >
            No sessions to display
          </Typography>
        </div>
      )}
    </Box>
  );
};

export default SessionList;
