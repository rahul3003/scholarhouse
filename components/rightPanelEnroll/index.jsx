import React, { useEffect, useState } from "react";
import { Box, Typography, Divider, Icon, Button } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import FileCopyIcon from "@mui/icons-material/FileCopy";
import api from "@/utils/apiSetup";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/userSlice";
import { selectSession } from "@/store/features/sessionSlice";
import { toast } from "react-toastify";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useRouter } from "next/router";

// const spec = {
//   value:'21 hour',
//   date:'03/07/2024',
// }

// const spec1={
//   value:'intermediate',
//   members:50,
//   language:'English'
// }

const RightPanelEnroll = ({members}) => {

  const router=useRouter()

  

  const [copied, setCopied] = useState(false);

  const user = useSelector(selectUser)
  const session=useSelector(selectSession)
  const userId=user?.id
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    // Your logic to copy link
    alert("Link copied!");
  };

  const handleEnroll=async ()=>{
    console.log('userrrrr', userId, session?.id, session?.SessionSlot[0]?.id)

    const payload={
      sessionId: session?.id,
      sessionSlotId: session?.SessionSlot[0]?.id,
      price:0
    }

    await api.post(`/user/${userId}/sessions`,payload )
    .then((res)=>{
      console.log('res', res)
      if(res.status === 201){
      toast('succesfully enrolled')
      router.push(`/admin/sessions`)
      } 
      // else if(res.status === 400){
      //   console.log('error enrolling', res.message)
      // }
    })
    .catch((err)=>{
      console.log('err', err)
      toast.error(err)
    })
  }

  const handleCopy = () => {
    setCopied(true);
    toast('Link copied to Clipboard ')
    // setTimeout(() => {
    //   setCopied(false); // Reset the copied state after 2 seconds
    // }, 2000);
  };

  


  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "20px",
      }}
    >
      <div>
      {new Date(session.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
      <Divider sx={{ marginY: "8px" }} />
      </div>
      {/* <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Icon sx={{height:'100%'}}>
          <AccessTimeIcon sx={{ fontSize: 20 }} />
        </Icon>
        <Typography sx={{ fontWeight: 600, fontSize: 15.5, marginLeft: '8px', marginTop: '5px' }}>
          Session Duration
        </Typography>
      </div>
      <Typography variant="body1" sx={{ marginTop: '9px', fontWeight: 400, fontSize: 15.5, whiteSpace: "pre-line" }}>
        {spec.value}
      </Typography>
    </div> */}
    {/* <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Icon sx={{height:'100%'}}>
          <SignalCellularAltOutlinedIcon sx={{ fontSize: 20 }} />
        </Icon>
        <Typography sx={{ fontWeight: 600, fontSize: 15.5, marginLeft: '8px', marginTop: '5px' }}>
          Course Level
        </Typography>
      </div>
      <Typography variant="body1" sx={{ marginTop: '9px', fontWeight: 400, fontSize: 15.5, whiteSpace: "pre-line" }}>
        {spec1.value}
      </Typography>
    </div> */}
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Icon sx={{height:'100%'}}>
          <PeopleAltOutlinedIcon sx={{ fontSize: 20 }} />
        </Icon>
        <Typography sx={{ fontWeight: 600, fontSize: 15.5, marginLeft: '8px', marginTop: '5px' }}>
          Members Enrolled
        </Typography>
      </div>
      <Typography variant="body1" sx={{ marginTop: '9px', fontWeight: 400, fontSize: 15.5, whiteSpace: "pre-line" }}>
        {members}
      </Typography>
    </div>
    {/* <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Icon sx={{height:'100%'}}>
          <LibraryBooksIcon sx={{ fontSize: 20 }} />
        </Icon>
        <Typography sx={{ fontWeight: 600, fontSize: 15.5, marginLeft: '8px', marginTop: '5px' }}>
          Language
        </Typography>
      </div>
      <Typography variant="body1" sx={{ marginTop: '9px', fontWeight: 400, fontSize: 15.5, whiteSpace: "pre-line" }}>
        {spec1.language}
      </Typography>
    </div> */}
    <Divider sx={{ marginY: "8px" }} />
    <Button
    onClick={handleEnroll} 
    sx={{marginTop:'10px', marginBottom:'10px', backgroundColor:'#495AFF'}} variant="contained" fullWidth>
      Enroll Now
    </Button>
    <Divider sx={{ marginY: "8px" }} />
    <Typography>
      This session includes:
    </Typography>
    <div className="flex flex-row ">
    <Icon sx={{height:'100%'}}>
      <LibraryBooksIcon sx={{ fontSize: 20 }} />
      </Icon>
    <Typography sx={{marginTop:'7px', marginLeft:'5px', color:'#4E5566', fontSize:14}}>
        Free exercises file & downloadable resources
    </Typography>
    </div>
    <Divider sx={{ marginY: "8px" }} />
    <Typography>
      Share this course
    </Typography>
    <CopyToClipboard text={currentUrl} onCopy={handleCopy}>
    <Box
      onClick={handleCopyLink}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '5px 8px',
        background: '#F5F7FA',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop:'10px'
      }}
    >
      <Icon sx={{ fontSize: '20px', color: '#4E5566', height:'100%' }}>
        <FileCopyIcon />
      </Icon>
      <Typography sx={{ marginLeft: '5px', fontSize: 14, color: '#4E5566' }}>
        Copy Link
      </Typography>
    </Box> 
      </CopyToClipboard>
    {/* <Box
      onClick={handleCopyLink}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '5px 8px',
        background: '#F5F7FA',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop:'10px'
      }}
    >
      <Icon sx={{ fontSize: '20px', color: '#4E5566', height:'100%' }}>
        <FileCopyIcon />
      </Icon>
      <Typography sx={{ marginLeft: '5px', fontSize: 14, color: '#4E5566' }}>
        Copy Link
      </Typography>
    </Box> */}
    </Box>
  );
};

export default RightPanelEnroll;
