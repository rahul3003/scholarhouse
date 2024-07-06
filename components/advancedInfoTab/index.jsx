import React from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";

const AdvancedInfoTab = ({ advancedInfo, setAdvancedInfo, handleSubmit }) => {
  const {
    image,
    imagePreview,
    video,
    videoPreview,
    sessionHighlights,
    targetAudience,
    sessionRequirements,
  } = advancedInfo;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdvancedInfo((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setAdvancedInfo((prev) => ({
        ...prev,
        video: file,
        videoPreview: videoUrl,
      }));
    }
  };

  const handleAddNewAnswer = (category) => {
    setAdvancedInfo((prev) => ({
      ...prev,
      [category]: [...prev[category], ""],
    }));
  };

  const handleAnswerChange = (category, index, value) => {
    setAdvancedInfo((prev) => ({
      ...prev,
      [category]: prev[category].map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleRemoveAnswer = (category, index) => {
    setAdvancedInfo((prev) => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index),
    }));
  };

  return (
    <Box p={2}>
      <Typography sx={{ fontSize: 24, fontWeight: 600, marginBottom: "20px" }}>
        Advanced Information
      </Typography>
      <Divider />
      <Box display="flex" alignItems="center" gap={2}>
        {/* Thumbnail component */}
        <div className="flex flex-col">
          <Typography sx={{ fontSize: 24, fontWeight: 400, marginTop: "20px" }}>
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
              {imagePreview ? (
                <Image
                  src={imagePreview}
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

        {/* Video upload component */}
        <div className="flex flex-col ml-12">
          <Typography sx={{ fontSize: 24, fontWeight: 400, marginTop: "20px" }}>
            Session Video
          </Typography>
          <div className="flex flex-row">
            <div
              style={{
                width: 250,
                height: 200,
                backgroundColor: "#f0f0f0",
                borderRadius: 4,
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {videoPreview ? (
                <video
                  controls
                  style={{ width: "100%", height: "100%", borderRadius: 4 }}
                >
                  <source src={videoPreview} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
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
                  No video uploaded
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginTop: "20px", marginLeft: "10px" }}
              >
                Members who watch a well-made promo video
                <br />
                are 5X more likely to enroll in your session.
                <br />
                We have seen that statistic go up to 10X for
                <br />
                exceptionally awesome videos.
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
                Upload Video
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  style={{ display: "none" }}
                />
              </Button>
            </div>
            <Divider sx={{ marginTop: "20px" }} />
          </div>
        </div>
      </Box>
      <Divider sx={{ marginTop: "30px" }} />
      <Typography sx={{ marginTop: "20px", fontSize: 22, marginLeft: "10px" }}>
        Session Description
      </Typography>
      <TextField
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        sx={{ marginTop: "20px" }}
        placeholder="Enter your session descriptions..."
      />
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" sx={{ marginTop: "20px" }}>
          What you will teach in this Session?
        </Typography>
        <Button
          sx={{ color: "blue" }}
          onClick={() => handleAddNewAnswer("sessionHighlights")}
        >
          + Add New
        </Button>
      </Box>
      {sessionHighlights.map((answer, index) => (
        <Box key={index} display="flex" alignItems="center" marginBottom="10px">
          <TextField
            value={answer}
            onChange={(e) =>
              handleAnswerChange("sessionHighlights", index, e.target.value)
            }
            fullWidth
            margin="normal"
            placeholder="Enter a highlight of the session..."
          />
          {(index > 0 || sessionHighlights.length > 1) && (
            <IconButton
              onClick={() => handleRemoveAnswer("sessionHighlights", index)}
              aria-label="delete"
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" sx={{ marginTop: "20px" }}>
          Target Audience
        </Typography>
        <Button
          sx={{ color: "blue" }}
          onClick={() => handleAddNewAnswer("targetAudience")}
        >
          + Add New
        </Button>
      </Box>
      {targetAudience?.map((answer, index) => (
        <Box key={index} display="flex" alignItems="center" marginBottom="10px">
          <TextField
            value={answer}
            onChange={(e) =>
              handleAnswerChange("targetAudience", index, e.target.value)
            }
            fullWidth
            margin="normal"
            placeholder="Describe the target audience..."
          />
          {(index > 0 || targetAudience.length > 1) && (
            <IconButton
              onClick={() => handleRemoveAnswer("targetAudience", index)}
              aria-label="delete"
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" sx={{ marginTop: "20px" }}>
          Session Requirements
        </Typography>
        <Button
          sx={{ color: "blue" }}
          onClick={() => handleAddNewAnswer("sessionRequirements")}
        >
          + Add New
        </Button>
      </Box>
      {sessionRequirements.map((answer, index) => (
        <Box key={index} display="flex" alignItems="center" marginBottom="10px">
          <TextField
            value={answer}
            onChange={(e) =>
              handleAnswerChange("sessionRequirements", index, e.target.value)
            }
            fullWidth
            margin="normal"
            placeholder="What are your session requirements..."
          />
          {(index > 0 || sessionRequirements.length > 1) && (
            <IconButton
              onClick={() => handleRemoveAnswer("sessionRequirements", index)}
              aria-label="delete"
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}
      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{
          marginLeft: "129vh",
          backgroundColor: "#495AFF",
          borderRadius: "20px",
          color: "#fff",
          paddingX: "10px",
        }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default AdvancedInfoTab;
