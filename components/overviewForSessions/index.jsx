import React from 'react';
import { Typography, Box } from '@mui/material'; // Adjust imports as per your setup
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Icon for the tick
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const descriptionText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue. Aenean lacinia bibendum nulla sed consectetur.";

  const highlightedSection = {
    title: "What you will learn in this sessions",
    points: [
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit",
      "Nulla vitae elit libero"
    ]
  };


const OverviewForSessions = ({session}) => {


  return (
    <div>
      <Typography sx={{fontSize:24, fontWeight:600}} gutterBottom>
        Description
      </Typography>
      <Typography variant="body1" gutterBottom>
        {session.desc}
      </Typography>
      {/* <div style={{ backgroundColor: '#E1F7E3', padding: '12px', marginBottom: '16px', marginTop:'20px' }}>
        <Typography variant="h5" gutterBottom>
          {highlightedSection.title}
        </Typography>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {highlightedSection.points.map((point, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#E1F7E3',
                  borderRadius: '50%',
                  marginRight: '12px',
                }}
              >
                <CheckCircleIcon style={{ color: 'darkgreen', fontSize: '16px' }} />
              </Box>
              <Typography variant="body1" sx={{color:'#4E5566'}}>{point}</Typography>
            </li>
          ))}
        </ul>
      </div> */}
      {/* <Typography sx={{fontSize:25, fontWeight:600, marginTop:'20px'}} gutterBottom>
      Who this session is for
      </Typography> */}
      {/* <div style={{ backgroundColor: '#ffff', padding: '12px', marginBottom: '8px', marginTop:'-15px' }}> */}
        {/* <Typography variant="h4" gutterBottom>
          {highlightedSection.title}
        </Typography> */}
        {/* <ul style={{ listStyleType: 'none', padding: 0 }}>
          {highlightedSection.points.map((point, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '24px', // Adjust size as needed
                  height: '24px', // Adjust size as needed
                  backgroundColor: 'white', // Blue color
                  borderRadius: '50%',
                  marginRight: '12px',
                }}
              >
                <ArrowForwardIcon style={{ color: 'blue', fontSize: '16px' }} /> {/* Adjust icon size */}
              {/* </Box> */}
              {/* // <Typography variant="body1">{point}</Typography> */}
            {/* // </li> */}
          {/* ))} */}
        {/* // </ul>  */}
      {/* </div> */}
      {/* <Typography sx={{fontSize:25, fontWeight:600, marginTop:0}} gutterBottom>
      Session Requirements
      </Typography> */}
      {/* <div style={{ backgroundColor: '#ffff', padding: '12px', marginBottom: '8px', marginTop:'-15px' }}>
        {/* <Typography variant="h4" gutterBottom>
          {highlightedSection.title}
        </Typography> */}
        {/* <ul style={{ listStyleType: 'none', padding: 0 }}>
          {highlightedSection.points.map((point, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '24px', // Adjust size as needed
                  height: '24px', // Adjust size as needed
                  backgroundColor: 'white', // Blue color
                  borderRadius: '50%',
                  marginRight: '12px',
                }}
              >
                <ArrowForwardIcon style={{ color: 'blue', fontSize: '16px' }} /> {/* Adjust icon size */}
              {/* </Box> */}
              {/* <Typography variant="body1">{point}</Typography> */}
            {/* </li> */}
          {/* ))} */}
        {/* </ul> */} 
      {/* </div> */}
    </div>
  );
};

export default OverviewForSessions;
