import ProjectCard from "@/components/Project/projectCard";
import AdminLayout from "@/components/layout/AdminLayout";
import SessionsList from "@/components/sessions/sessionCard";
import SessionCard from "@/components/sessions/sessionCard";
import { Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import Head from "next/head";
import React, { useEffect } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import { useSelector } from "react-redux";
import { selectAllSessions } from "@/store/features/sessionSlice";
import { useDispatch } from "react-redux";
import { setAllSessions } from "@/store/features/session";

const Sessions = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(setAllSessions())
  },[])

  const allSessions = useSelector(selectAllSessions)
  
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
      {/* <div className="flex items-center justify-between w-full">
      <div className="flex items-center space-x-2">
        <Button
          variant="outlined"
          startIcon={<FilterListIcon />}
          endIcon={<span style={{fontSize:14, fontWeight:700}}>Filter</span>}
        >
        </Button>

        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small" 
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size='small'>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          // sx={{marginLeft:'100px'}}
        />
      </div>

      {/* Sort Button */}
      {/* <IconButton sx={{marginRight:'50px'}}>
        <SortIcon />
      </IconButton> */}
    {/* </div>  */}
        <div>
          {/* <Typography className="text-[14px] font-semibold">
            Live Sessions
          </Typography> */}
          <div className="flex overflow-hidden hover:overflow-x-auto  my-6 gap-2">
            <SessionsList sessions={allSessions} />
            {/* <SessionCard />
            <SessionCard />
            <SessionCard />
            <SessionCard /> */}
          </div>
        </div>
        {/* <div>
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
        </div> */}
        {/* <div>
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
        </div> */}
      </div>
    </AdminLayout>
  );
};

export default Sessions;
