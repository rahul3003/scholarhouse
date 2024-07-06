import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "@/utils/apiSetup";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "@/store/features/userSlice";
import { setAllExperts } from "@/store/features/expert";
import { selectAllExperts } from "@/store/features/expertSlice";
import AWS from "aws-sdk";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import { selectAllCommunities } from "@/store/features/communitySlice";

AWS.config.update({
  accessKeyId: "AKIAVLDXGQUBG6DXXSKE",
  secretAccessKey: "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",
  region: "ap-south-1",
});

const s3 = new AWS.S3();

const DateTimeField = ({ label, value, onChange }) => (
  <TextField
    label={label}
    type="datetime-local"
    value={value}
    onChange={onChange}
    InputLabelProps={{
      shrink: true,
    }}
    fullWidth
    variant="outlined"
    margin="normal"
  />
);

const BasicInfotab = ({
  // basicInfo,
  // setBasicInfo,
  // selectedItems,
  // setSelectedItems,
  // sessionLevel,
  // setSessionLevel,
  // duration,
  // setDuration,
  // selectedDate,
  // setSelectedDate,
  // onNext,
  // imagePreview
  component,
}) => {
  const router = useRouter();
  const communities = useSelector(selectAllCommunities)
  // const dispatch=useDispatch()
  const [selectedExpertId, setSelectedExpertId] = useState("");
  const user = useSelector(selectUser);
  const experts = useSelector(selectAllExperts);
  const [openModal, setOpenModal] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [communityId, setCommunityId] = useState('');
  const [resources, setResources] = useState([{ name: "", link: "" }]);
  const [basicInfo, setBasicInfo] = useState({
    title: "",
    desc: "",
    category: "",
    // topic: '',
    // language: '',
    // sublanguage:'',
    startTime: "",
    endTime: "",
    image: [],
    imagePreview: null,
    videoLink: "",
  });
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([
    { startTime: "", endTime: "", location: "", title: "", desc: "" },
  ]);
  const [sessionDateTime, setSessionDateTime] = useState({
    startTime: "",
    endTime: "",
    location: "",
    expert_link: "",
    isOnline: true,
    participantLimit: 0,
    speakerId: selectedExpertId || undefined,
    expert_link: null,
    price: 0,
  });

  // // console.log('communityid',communityId )

  // console.log("sessionDateTime", sessionDateTime);

  // console.log("selectedd expert", selectedExpertId);

  const slotsData = [
    {
      startTime: sessionDateTime.startTime || "",
      endTime: sessionDateTime.endTime || "",
      location: "",
      expert_link: undefined,
      isOnline: true,
      participantLimit: 0,
      speakerId: selectedExpertId || null,
      expert_link: "",
      price: 0,
      isLive: component === "live" ? true : false,
    },
  ];

  // useEffect(() => {
  //   // Mock API response for file list
  //   const mockAPIResponse = [
  //     "File 1.txt",
  //     "File 2.jpg",
  //     "File 3.pdf",
  //     "File 4.docx",
  //     "File 5.png",
  //   ];
  //   setFileList(mockAPIResponse);
  // }, []);

  const tagsData = basicInfo.category;

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleDateTimeChange = (e) => {
    setBasicInfo({ ...basicInfo, dateTime: e.target.value });
  };

  // const handleItemSelect = (event) => {
  //   const { value } = event.target;

  //   // Toggle selected items
  //   if (selectedItems.includes(value)) {
  //     setSelectedItems(selectedItems.filter((item) => item !== value));
  //   } else {
  //     setSelectedItems([...selectedItems, value]);
  //   }
  // };

  // const handleChange = (event) => {
  //   setSessionLevel(event.target.value);
  // };

  // const handleDurationChange = (event) => {
  //   setDuration({ ...duration, value: event.target.value });
  // };

  // const handleUnitChange = (event) => {
  //   setDuration({ ...duration, unit: event.target.value });
  // };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBasicInfo((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddResource = () => {
    setResources([...resources, { name: "", link: "" }]);
  };

  const handleDeleteResource = (index) => {
    const updatedResources = [...resources];
    updatedResources.splice(index, 1);
    setResources(updatedResources);
  };

  const handleResourceNameChange = (event, index) => {
    const updatedResources = [...resources];
    updatedResources[index].name = event.target.value;
    setResources(updatedResources);
  };

  const handleResourceLinkChange = (event, index) => {
    const updatedResources = [...resources];
    updatedResources[index].link = event.target.value;
    setResources(updatedResources);
  };

  const handleStartTimeChange = (e) => {
    const newSlots = [...slots];
    newSlots[0].startTime = e.target.value;
    setSlots(newSlots);
  };

  const handleEndTimeChange = (e) => {
    const newSlots = [...slots];
    newSlots[0].endTime = e.target.value;
    setSlots(newSlots);
  };

  const handleLocationChange = (e) => {
    const newSlots = [...slots];
    newSlots[0].location = e.target.value;
    setSlots(newSlots);
  };

  // const formatTimeForBackend = (timeString) => {
  //   const date = moment(timeString, 'YYYY-MM-DDTHH:mm', true); // Parse with strict mode
  //   if (!date.isValid()) {
  //     throw new Error('Invalid date'); // Handle invalid date/time input
  //   }
  //   return date.toISOString(); // Format to ISO 8601
  // };

  // const handleSubmit = async () => {
  //   // console.log('submittt dataaaa', payload)

  //   const formattedStartTime = formatTimeForBackend(basicInfo.startTime);
  //   const formattedEndTime = formatTimeForBackend(basicInfo.endTime);

  //   const payload = {
  //     session:{slots: slots.map(slot => ({ startTime: formattedStartTime, endTime: formattedEndTime, title:slot.title, desc:slot.desc })),
  //       title: basicInfo.title,
  //       desc: basicInfo.desc,
  //       // category: basicInfo.category,
  //       // startTime: basicInfo.startTime,
  //       // endTime: basicInfo.endTime,
  //       infoImgs: [],
  //       videoUrl: basicInfo.videoLink,
  //     },
  //     resources,

  //     // Add more fields as needed
  //   };

  //   await api.post('/session', payload)
  //   .then((res)=>{
  //     console.log('res', res)
  //   })
  //   .catch((err)=>{
  //     console.log('error creating session:', err)
  //   })
  //   // You can handle form submission here
  //   // const formData = {
  //   //   basicInfo,
  //   //   resources,
  //   //   // sessionLevel,
  //   //   // duration,
  //   //   // selectedDate,
  //   //   // Add more fields as needed
  //   // };
  //   // console.log(formData); // Replace with your actual submission logic
  // };

  // const payload = {
  //   session: {
  //     slots: slots.map(slot => ({
  //       startTime: new Date(slot.startTime).toISOString(),
  //       endTime: new Date(slot.endTime).toISOString(),
  //       title: slot.title,
  //       desc: slot.desc,
  //     })),
  //     sessionData: {
  //       title: 'test',
  //       desc: 'test1',
  //       image: null,
  //       videoLink: 'link',
  //     },
  //   },
  //   resources: [
  //     { name: 'abc', link: 'link1' },
  //     { name: 'def', link: 'link2' },
  //   ],
  //   sessionDateTime: {
  //     startDate: new Date(sessionDateTime.startDate).toISOString(),
  //     endDate: new Date(sessionDateTime.endDate).toISOString(),
  //   },

  // };

  // const handleSubmit = async () => {
  //   try {
  //     // Validate and format start time
  //     const startTime = moment(basicInfo.startTime, 'HH:mm', true);
  //     if (!startTime.isValid()) {
  //       throw new Error('Invalid start time');
  //     }
  //     const formattedStartTime = startTime.toISOString();

  //     // Validate and format end time
  //     const endTime = moment(basicInfo.endTime, 'HH:mm', true);
  //     if (!endTime.isValid()) {
  //       throw new Error('Invalid end time');
  //     }
  //     const formattedEndTime = endTime.toISOString();

  //     // Prepare payload with formatted dates
  //     const payload = {
  //       session: {
  //         slots: [{
  //           startTime: formattedStartTime,
  //           endTime: formattedEndTime,
  //           title: basicInfo.title,
  //           desc: basicInfo.desc,
  //         }],
  //         sessionData: {
  //           title: basicInfo.title,
  //           desc: basicInfo.desc,
  //           videoLink: basicInfo.videoLink,
  //         },
  //       },
  //       resources: resources,
  //     };

  //     console.log('Submitting payload:', payload);

  //     // Now you can send the payload to your backend API
  //     // Example API call:
  //     await api.post('/session', payload)
  //       .then((res) => {
  //         console.log('Session created successfully:', res);
  //         // Handle success response
  //       })
  //       .catch((err) => {
  //         console.error('Error creating session:', err);
  //         // Handle error
  //       });
  //   } catch (error) {
  //     console.error('Error handling dates:', error.message);
  //     // Handle error in time formatting/validation
  //   }
  // };

  // const formattedSlots = sessionDateTime.map(slot => ({
  //   startTime: new Date(slot.startTime),
  //   endTime: new Date(slot.endTime),
  //   location: '',
  //   expert_link: ''
  // }));

  // console.log('formatted dataaa', formattedSlots)

  // const handleSubmit = async () => {
  //   const payload = {
  //     session: {
  //       slots.map(slot => ({
  //         startTime: new Date(slot.startTime),
  //         endTime: new Date(slot.endTime),
  //         location:'',
  //         expert_link:''
  //         // title: slot.title,
  //         // desc: slot.desc,
  //       })),
  //       // sessionData: {
  //         title: 'test',
  //         desc: 'test1',
  //         infoImgs: [],
  //         videoUrl: 'link',
  //       // },
  //     },
  //     resources: [
  //       { name: 'abc', link: 'link1' },
  //       { name: 'def', link: 'link2' },
  //     ],
  //     // sessionDateTime: {
  //     //   startDate: new Date(sessionDateTime.startDate).toISOString(),
  //     //   endDate: new Date(sessionDateTime.endDate).toISOString(),
  //     // },
  //   };

  //   console.log('Submitting data:', payload);

  //   // API call to post data to backend
  //   try {
  //     const response = await api.post('/session', payload);
  //     console.log('Session created successfully:', response.data);
  //   } catch (error) {
  //     console.error('Error creating session:', error);
  //   }
  // };
  // let roomId;

  const createRoomId = async () => {
    const tkn = await api.get("/session/token");

    console.log("token value is ", tkn.data.token);
    const config = {
      headers: {
        Authorization: `Bearer ${tkn.data.token}`,
        "Content-Type": "application/json",
      },
    };

    // let roomName = postObj.title.replace(/ /g, "_");
    // console.log("room name is ", roomName);

    // sending request to 100ms for creating a room
    const response = await axios.post(
      "https://api.100ms.live/v2/rooms",
      {
        name: "Scholar House",
        description: "This is a sample description for the room",
      },
      config
    );
    // console.log("room id is", roomId);

    return response?.data?.id;
  };

  const handleSubmit = async () => {
    let roomId = null;

    if (component === "live") {
      roomId = await createRoomId();
    }

    const fileName = `${Date.now()}-${basicInfo.image.name}`;
    const uploadParams = {
      Bucket: "subspace-test-0",
      Key: fileName, // Specify the folder and file name
      Body: basicInfo.image,
      ACL: "public-read", // Set ACL to allow public read access
    };

    const s3UploadResult = await s3.upload(uploadParams).promise();
    const imageUrl = s3UploadResult.Location;

    const payload = {
      session: {
        slots: Array.isArray(slotsData) ? slotsData : [slotsData],
        // sessionData: {
        title: basicInfo.title,
        desc: basicInfo.desc,
        infoImgs: [imageUrl],
        videoUrl: basicInfo.videoLink,
        tagsData: [],
        // roomId: roomId ? roomId : null,
        creatorId: user?.id,
        sessionType: null,
        isExclusive: true,
        communityId: parseInt(communityId),
        roomId: roomId,
        // bannerImgs: [bannerImgUrl],

        // },
        // Placeholder for tags data, if applicable
      },

      resources: resources.map((resource) => ({
        name: resource.name,
        link: resource.link,
        authorId: selectedExpertId,
        // location:'',
        // expert_link:''
      })),
    };

    console.log("Submitting data:", payload);
    // console.log('formatted dataaa', formattedSlots)

    try {
      await api.post("/session", payload).then((res) => {
        if (res.status === 200) {
          toast("Session created successfully");
          router.push("/admin/sessions/my_sessions");
        }
      });
      console.log("Session created successfully:", response.data);
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  console.log("component-----", component);

  const handleIdChange = (event) => {
    setSelectedExpertId(event.target.value);
  };

    const handleSelectChange = (event) => {
        setCommunityId(event.target.value);
    };

  return (
    <Box p={2}>
      <Typography sx={{ fontSize: 24, fontWeight: 600, marginBottom: "20px" }}>
        Basic Information
      </Typography>
      <Divider />

      <div className="flex flex-col">
        <Typography sx={{ fontSize: 18, fontWeight: 400, marginTop: "20px" }}>
          Session Thumbnail
        </Typography>
        <div className="flex flex-row">
          <div
            style={{
              width: 250,
              height: 200,
              backgroundColor: "#f0f0f0",
              borderRadius: 4,
              marginTop: "10px",
            }}
          >
            {basicInfo.imagePreview ? (
              <Image
                src={basicInfo.imagePreview}
                alt="Thumbnail"
                width={30} height={30}
                style={{ width: "100%", height: "100%", borderRadius: 4 }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#aaa",
                }}
              >
                No image uploaded
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ marginTop: "20px", marginLeft: "10px" }}
            >
              Upload your course Thumbnail here.
              <br />
              Important guidelines: 1200x800 pixels
              <br />
              or 12:8 Ratio.
              <br />
              Supported format: .jpg, .jpeg, or .png
            </Typography>
            <Button
              variant="contained"
              component="label"
              sx={{
                marginTop: "10px",
                width: "20vh",
                height: "5vh",
                marginLeft: "10px",
                marginTop: "2vh",
                backgroundColor: "#495AFF",
                borderRadius: "20px",
              }}
            >
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </Button>
          </div>
        </div>
      </div>
      <Typography sx={{ marginTop: "20px", marginBottom: "-10px" }}>
        Session Title
      </Typography>
      <TextField
        value={basicInfo.title}
        onChange={(e) => setBasicInfo({ ...basicInfo, title: e.target.value })}
        fullWidth
        variant="outlined"
        margin="normal"
        placeholder="Your session title"
      />
      <Typography sx={{ marginTop: "20px", marginBottom: "-10px" }}>
        Session Description
      </Typography>
      <TextField
        value={basicInfo.desc}
        onChange={(e) => setBasicInfo({ ...basicInfo, desc: e.target.value })}
        fullWidth
        variant="outlined"
        margin="normal"
        placeholder="Your session Description"
      />
      <Typography sx={{ marginTop: "20px", marginBottom: "-10px" }}>
        Select Community
      </Typography>
      <select value={communityId} onChange={handleSelectChange} required style={{marginTop:'20px', border: '1px solid #ccc', padding: '8px', outline: 'none', height:'50px', width:'450px'}}>
                <option value="">Select a Community</option>
                {communities.map((community, index) => (
                    <option key={index} value={community.id}>
                        {community.title}
                    </option>
                ))}
        </select>
      <Typography sx={{ marginTop: "20px", marginBottom: "-10px" }}>
        Category
      </Typography>
      <TextField
        value={basicInfo.category}
        onChange={(e) =>
          setBasicInfo({ ...basicInfo, category: e.target.value })
        }
        fullWidth
        variant="outlined"
        margin="normal"
        placeholder="Enter Session Category"
      />
      {component === "prerecorded" && (
        <Typography sx={{ marginTop: "20px", marginBottom: "-10px" }}>
          Video Link{" "}
        </Typography>
      )}
      {component === "prerecorded" && (
        <TextField
          value={basicInfo.videoLink}
          onChange={(e) =>
            setBasicInfo({ ...basicInfo, videoLink: e.target.value })
          }
          fullWidth
          variant="outlined"
          margin="normal"
          placeholder="Enter Video Link"
        />
      )}
      <Button
        variant="contained"
        onClick={handleAddResource}
        sx={{
          marginTop: "20px",
          backgroundColor: "#495AFF",
          borderRadius: "20px",
        }}
      >
        Add Resource
      </Button>
      {resources.map((resource, index) => (
        <div
          key={index}
          className="flex flex-row"
          style={{ marginTop: "20px" }}
        >
          <TextField
            value={resource.name}
            onChange={(e) => handleResourceNameChange(e, index)}
            fullWidth
            variant="outlined"
            margin="normal"
            placeholder="Resource Name"
            sx={{ marginRight: "10px" }}
          />
          <TextField
            value={resource.link}
            onChange={(e) => handleResourceLinkChange(e, index)}
            fullWidth
            variant="outlined"
            margin="normal"
            placeholder="Resource Link"
            sx={{ marginRight: "10px" }}
          />
          <IconButton onClick={() => handleDeleteResource(index)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ))}

      <Typography sx={{ marginTop: "20px", marginBottom: "10px" }}>
        Select Expert
      </Typography>
      <Select
        value={selectedExpertId}
        onChange={handleIdChange}
        // fullWidth
        variant="outlined"
        margin="normal"
        sx={{ width: "200px" }}
      >
        {experts.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>

      {/* <div className='flex flex-row'>
        <div className='flex flex-col mr-4'>
          <Typography sx={{ marginTop: '18px' }}>Select Date</Typography>
          <TextField
            id="date"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            margin="normal"
            sx={{ width: '30vh' }}
          />
        </div>
        <div className='flex flex-col mr-5 mt-2'>
          <Typography sx={{ marginTop: '20px', marginBottom: '-10px' }}>Start Time</Typography>
          <TextField
            value={slots[0].startTime}
            onChange={handleStartTimeChange}
            variant="outlined"
            margin="normal"
            placeholder='Enter Start Time'
            sx={{ width: '30vh' }}
          />
        </div>
        <div className='flex flex-col mr-5 mt-2'>
    <Typography sx={{ marginTop: '20px', marginBottom: '-10px' }}>End Time</Typography>
    <TextField
      value={slots[0].endTime}
      onChange={handleEndTimeChange}
      variant="outlined"
      margin="normal"
      placeholder='Enter End Time'
      sx={{ width: '30vh' }}
    />
  </div>
            </div> */}
      {component === "live" && (
        <TextField
          value={sessionDateTime.startTime}
          onChange={(e) =>
            setSessionDateTime({
              ...sessionDateTime,
              startTime: e.target.value,
            })
          }
          label="Start Date & Time"
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          variant="outlined"
          margin="normal"
        />
      )}
      {component === "live" && (
        <TextField
          value={sessionDateTime.endTime}
          onChange={(e) =>
            setSessionDateTime({ ...sessionDateTime, endTime: e.target.value })
          }
          label="End Date & Time"
          type="datetime-local"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          variant="outlined"
          margin="normal"
        />
      )}
      {/* <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogTitle>Select Resources</DialogTitle>
            <DialogContent>
            {fileList.map((file, index) => (
            <FormControlLabel
            key={index}
            control={<Checkbox checked={selectedItems.includes(file)} onChange={handleItemSelect} value={file} />}
            label={file}
            />
            ))}
            </DialogContent>
            <DialogActions>
            <Button onClick={handleCloseModal}>OK</Button>
            </DialogActions>
            </Dialog> */}
      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          marginTop: "20px",
          marginLeft: "120vh",
          borderRadius: "20px",
          backgroundColor: "#495AFF",
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default BasicInfotab;
