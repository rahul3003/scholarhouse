import React from 'react';
import { Typography, Box } from '@mui/material';

import { useSelector } from 'react-redux';
import { selectSession } from '@/store/features/sessionSlice';
// const heading = "Description";
  const paragraph = "We cover everything you need to build your first website. From creating your first page through to uploading your website to the internet. We’ll use the world’s most popular (and free) web design tool called Visual Studio Code. There are exercise files you can download and then work along with me. At the end of each video I have a downloadable version of where we are in the process so that you can compare your project with mine. This will enable you to see easily where you might have a problem. We will delve into all the good stuff such as how to create your very own mobile burger menu from scratch learning some basic JavaScript and jQuer ";

const LecturenotesForEnrolled = () => {

  const session = useSelector(selectSession)
  const resources = session?.resource


  return (
    <div>
      {/* <h1>Resource List</h1> */}
      <ul style={{ listStyleType: 'disc', paddingLeft: '10px' }}>
        {resources.length !==0 ? resources.map((resource, index) => (
          <li key={index} style={{ marginBottom: '8px' }}>
            <span>{resource.name} - </span>
            <a style={{color:'blue'}} href={resource.link} target="_blank" rel="noopener noreferrer">
              {resource.link}
            </a>
          </li>
        )):
        <div style={{fontSize:22}}>
        No Resources to Display  
        </div>}
      </ul>
    </div>
  );
};

export default LecturenotesForEnrolled;
