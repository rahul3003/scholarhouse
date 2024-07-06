import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

// const members = [
//   {
//     name: "John Doe",
//     photoUrl: "https://randomuser.me/api/portraits/men/1.jpg"
//   },
//   {
//     name: "Jane Smith",
//     photoUrl: "https://randomuser.me/api/portraits/women/1.jpg"
//   },
//   {
//     name: "Sam Johnson",
//     photoUrl: "https://randomuser.me/api/portraits/men/2.jpg"
//   },
//   {
//     name: "Emily Davis",
//     photoUrl: "https://randomuser.me/api/portraits/women/2.jpg"
//   },
//   {
//     name: "Michael Brown",
//     photoUrl: "https://randomuser.me/api/portraits/men/3.jpg"
//   },
//   {
//     name: "Sarah Wilson",
//     photoUrl: "https://randomuser.me/api/portraits/women/3.jpg"
//   },
//   {
//     name: "David Lee",
//     photoUrl: "https://randomuser.me/api/portraits/men/4.jpg"
//   },
//   {
//     name: "Laura Martinez",
//     photoUrl: "https://randomuser.me/api/portraits/women/4.jpg"
//   }
// ];

const Members = ({ members }) => {
  // const maxMembers = 6;

  return (
    <div>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "6px", marginRight: "10px" }}
      >
        {members ? (
          <Grid item xs={6} sm={4} md={3} lg={2} sx={{ marginRight: "5px" }}>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                overflow: "hidden",
                padding: "8px",
                height: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Image
                src={
                  members?.photoURL !== ""
                    ? members?.photoURL
                    : "/default_person.png"
                }
                alt={members?.name}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <Typography variant="body2" align="center">
                {members?.name}
              </Typography>
            </Box>
          </Grid>
        ) : (
          <div
            style={{ marginLeft: "40px", marginTop: "20px", fontWeight: 700 }}
          >
            No Members to Display
          </div>
        )}
      </Grid>
    </div>
  );
};

export default Members;
