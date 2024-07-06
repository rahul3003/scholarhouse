import React from 'react';
import { Typography, Box } from '@mui/material';

// const heading = "Description";
  const paragraph = "We cover everything you need to build your first website. From creating your first page through to uploading your website to the internet. We’ll use the world’s most popular (and free) web design tool called Visual Studio Code. There are exercise files you can download and then work along with me. At the end of each video I have a downloadable version of where we are in the process so that you can compare your project with mine. This will enable you to see easily where you might have a problem. We will delve into all the good stuff such as how to create your very own mobile burger menu from scratch learning some basic JavaScript and jQuer ";

const DescriptionForEnrolled = () => {
  return (
    <Box >
      <Typography sx={{fontSize:24, fontWeight:600}} gutterBottom>
        Lecture Description
      </Typography>
      <Typography variant="body1" sx={{fontSize:16}}>
        {paragraph}
      </Typography>
    </Box>
  );
};

export default DescriptionForEnrolled;
