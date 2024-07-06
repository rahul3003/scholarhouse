import AdminLayout from "@/components/layout/AdminLayout";
import SessionsList from "@/components/sessions/sessionCard";
import { Button, IconButton, InputAdornment, Menu, MenuItem, TextField } from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectUserSessions, setUserSessions } from "@/store/features/userSlice";
import { useRouter } from "next/router";
import { selectAllSessions } from "@/store/features/sessionSlice";

const MySessions = () => {
  const user=useSelector(selectUser)

  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(setUserSessions(user?.id))
  },[dispatch])

  const router=useRouter()

  const sessions = useSelector(selectAllSessions)

  const userSessions = sessions.filter(session=>session.creatorId === user?.id)

  // const userSessions = userSession.sessions

  const [anchorEl, setAnchorEl] = useState(null);
  // const [selectedComponent, setSelectedComponent] = useState();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (component) => {
    console.log('add session clicked', component)
    router.push({
      pathname: '/admin/sessions/my_sessions/createSession',
      query: { component }
    });
    handleMenuClose();
  };

  console.log('usersessionsss', userSessions)

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
      <div className="flex items-center justify-between w-full">
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
      {/* <Button
          sx={{marginRight:'50px'}}
          variant="outlined"
          startIcon={<SortIcon />}
          endIcon={<span style={{fontSize:14, fontWeight:700}}>Sort</span>}
        >
        </Button> */}

    </div>
        <div>
          {/* <Typography className="text-[14px] font-semibold">
            Live Sessions
          </Typography> */}
          <div className="flex overflow-hidden hover:overflow-x-auto  my-6 gap-6">
            <SessionsList sessions={userSessions} />
          </div>
        </div>
      </div>
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
        <IconButton onClick={handleMenuClick} sx={{ backgroundColor: 'blue', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', color: 'blue',
    '&:hover': {
      backgroundColor: 'lightblue',
    },}}>
          <AddIcon sx={{color:'#ffff'}} />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleMenuItemClick('live')}>Create Live Session</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('prerecorded')}>Create Pre-recorded Session</MenuItem>
        </Menu>
      </div>
    </AdminLayout>
  );
};

export default MySessions;
