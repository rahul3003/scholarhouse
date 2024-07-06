import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OverviewForSession from '../overviewForSessions';
import Members from '../members';
import { selectSession } from '@/store/features/sessionSlice';
import { useSelector } from 'react-redux';
import CommentsSection from '../commentsSection';
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
  const session = useSelector(selectSession)

  const speaker = session?.SessionSlot[0]?.speakers
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (
    <Box sx={{ width: '100%', overflow:'hidden' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', position:'sticky', top:0, backgroundColor:'#ffff', marginTop:'20px', marginLeft:'10px', marginRight:'20px' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Expert" {...a11yProps(1)} />
          <Tab label="Review" {...a11yProps(2)} />
          {/* <Tab label="Members" {...a11yProps(3)} /> Use a unique index for Members tab */}
        </Tabs>
      </Box>

      {/* Render different content based on the active tab */}
      <CustomTabPanel value={value} index={0}>
        <OverviewForSession session={session}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Members members={speaker} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CommentsSection />
      </CustomTabPanel>
      {/* <CustomTabPanel value={value} index={3}>
        tab4
      </CustomTabPanel> */}
    </Box>
  );
}
