import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DescriptionForEnrolled from '@/components/descriptionForEnrolled';
import LecturenotesForEnrolled from '@/components/lecturenotesForEnrolled';
import CommentsSection from '@/components/commentsSection';
// import OverviewForSession from '../overviewForSessions';
// import Members from '../members';
// import TaskBoard from '../activity'
// import PrerecordedVideos from '../prerecordedVideos';
// import CommunityForClub from '../communityForClub'
// import MembersForClub from '../membersForClub'
// import ActivityForClub from '../activity';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children} {/* Render children within the CustomTabPanel */}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', overflow:'hidden' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', position:'sticky', top:0, backgroundColor:'#ffff', marginTop:'20px', marginLeft:'10px', marginRight:'20px' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Description" {...a11yProps(0)} />
          <Tab label="Lecture Notes" {...a11yProps(1)} />
          {/* <Tab label="Attach File" {...a11yProps(2)} /> */}
          <Tab label="Comments" {...a11yProps(2)} /> 
        </Tabs>
      </Box>

      {/* Render different content based on the active tab */}
      <CustomTabPanel value={value} index={0}>
        <DescriptionForEnrolled />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <LecturenotesForEnrolled />
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={2}>
        tab3
      </CustomTabPanel> */}
      <CustomTabPanel value={value} index={2}>
       <CommentsSection />
      </CustomTabPanel>
    </Box>
  );
}
