import React, { useEffect, useState } from 'react';
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router';
import BasicInfotab from '../basicInfoTab';
import AdvancedInfoTab from '../advancedInfoTab';
import DeleteIcon from '@mui/icons-material/Delete';
import { setAllExperts, setExperts } from '@/store/features/expertSlice';
import { useDispatch } from 'react-redux';

const SessionCreateForm = ({component}) => {

  const dispatch=useDispatch()
  const [activeTab, setActiveTab] = useState('basic');
  const [basicInfo, setBasicInfo] = useState({
    title: '',
    desc: '',
    category: '',
    topic: '',
    language: '',
    sublanguage:'',
    startTime: '',
    endTime: '',
    image:null,
    imagePreview: null,
  });
  const [advancedInfo, setAdvancedInfo] = useState({
    image: null,
    imagePreview: null,
    video: null,
    videoPreview: null,
    contentanswers: [''],
    allAnswers: [],
    sessionHighlights: [''],
    targetAudience: [''],
    sessionRequirements: [''],
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [sessionLevel, setSessionLevel] = useState('');
  const [duration, setDuration] = useState({ value: '', unit: 'days' });
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(()=>{
    dispatch(setExperts())
  },[dispatch])
  

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleNext = () => {
    setActiveTab('advanced');
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log('Basic Info:', basicInfo);
    console.log('Advanced Info:', advancedInfo);
    console.log('Selected Items:', selectedItems);
    console.log('Session Level:', sessionLevel);
    console.log('Duration:', duration);
    console.log('Selected Date:', selectedDate);
  };

  console.log('componnet', component)

  return (
    <Box>
      {/* <Box sx={{ display: 'flex', borderBottom: '1px solid #ccc' }}>
        <Button
          onClick={() => handleTabClick('basic')}
          sx={{
            flex: 1,
            color: activeTab === 'basic' ? 'primary.main' : 'black',
            borderBottom: activeTab === 'basic' ? '2px solid' : '2px solid transparent',
          }}
        >
          Basic Information
        </Button>
        <Button
          onClick={() => handleTabClick('advanced')}
          sx={{
            flex: 1,
            color: activeTab === 'advanced' ? 'primary.main' : 'black',
            borderBottom: activeTab === 'advanced' ? '2px solid' : '2px solid transparent',
          }}
        >
          Advanced Information
        </Button>
      </Box> */}
      {activeTab === 'basic' && (
        <BasicInfotab
        component={component}
          // basicInfo={basicInfo}
          // setBasicInfo={setBasicInfo}
          // selectedItems={selectedItems}
          // setSelectedItems={setSelectedItems}
          // sessionLevel={sessionLevel}
          // setSessionLevel={setSessionLevel}
          // duration={duration}
          // setDuration={setDuration}
          // selectedDate={selectedDate}
          // setSelectedDate={setSelectedDate}
          // onNext={handleNext}
        />
      )}
      {activeTab === 'advanced' && (
        <AdvancedInfoTab
          advancedInfo={advancedInfo}
          setAdvancedInfo={setAdvancedInfo}
          handleSubmit={handleSubmit}
        />
      )}
    </Box>
  );
};

export default SessionCreateForm;
