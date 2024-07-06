// src/components/CommunityInbox.jsx

import React, { useCallback, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import SendIcon from "@mui/icons-material/Send";
import SurveyModal from "../posts/surveyModal";
import PollsModal from "../posts/pollsModal";
import CreateProjectModal from "../Project/createProject";

import { Poll } from "@mui/icons-material";
import { File, FilePlus } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import api from "@/utils/apiSetup";
import { useDropzone } from "react-dropzone";
import { selectUser } from "@/store/features/userSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import AWS from "aws-sdk";
import { toast } from "react-toastify";
import Image from "next/image";

const CommunityInbox = ({
  success,
  setSuccess,
  setOpenImageModal,
  openImageModal,
  parentPost,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { communityId, postId } = router.query;
  const [openPollModal, setOpenPollModal] = useState(false);
  const [openProjectModal, setOpenProjectModal] = useState(false);

  const [uploadedImage, setUploadedImage] = useState(null);
  const user = useSelector(selectUser);

  const handleOpenProjectModal = () => {
    setOpenProjectModal(true);
  };

  const handleCloseProjectModal = () => {
    setOpenProjectModal(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const { control, handleSubmit, getValues, reset } = useForm({
    defaultValues: {
      creatorId: user?.unifiedUserId?.id,
      communityId: parseInt(communityId),
      title: null,
      isApproved: true,
      tags: undefined,
    },
  });

  // AWS Configuration
  const s3 = new AWS.S3({
    accessKeyId: "AKIAVLDXGQUBG6DXXSKE",
    secretAccessKey: "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",
    region: "ap-south-1",
  });

  const uploadImagesToS3 = async (images) => {
    const uploadPromises = images.map((image) => {
      const params = {
        Bucket: "subspace-test-0",
        Key: `posts/${Date.now()}_${image.name}`,
        Body: image,
        ACL: "public-read",
      };
      return s3.upload(params).promise();
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages.map((img, index) => ({
      index,
      type: "image",
      url: img.Location,
    }));
  };

  const handleImageDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedImage(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImageDrop,
  });

  const handleSendMessage = async (type, content) => {
    console.log(content);
    let data = content.DataTransferItem;
    let imageUrls = [];
    if (uploadedImage?.path) {
      imageUrls = await uploadImagesToS3([uploadedImage]);
    }

    if (type === "image") {
      api
        .post(`/thread`, {
          ...data,
          isPoll: false,
          communityId: parseInt(communityId),
          parentPostId: parentPost ? parentPost : undefined,
          assetsData: imageUrls,
        })
        .then((res) => {
          console.log(res.data);
          toast(`Created Post!`, { type: "success" });
          reset();
          setUploadedImage(null);
          setSuccess(!success);
        });
    }
  };

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        handleSendMessage("image", {
          image: [],
          DataTransferItem: {
            creatorId: user?.unifiedUserId?.id,
            communityId: parseInt(communityId),
            title: null,
            isApproved: true,
            content: message,
            tags: undefined,
          },
        });
      }
    },
    [
      message,
      uploadedImage,
      communityId,
      handleSendMessage,
      user?.unifiedUserId?.id,
    ]
  );

  return (
    <Box className=" px-4  pt-2 border-t-[1px] border-gray-300">
      {/* Message Input */}
      <TextField
        value={message}
        onChange={handleMessageChange}
        placeholder="Type a message"
        variant="outlined"
        fullWidth
        onKeyPress={handleKeyPress}
        multiline
        rows={1}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box className="relative">
                <IconButton onClick={handleMenuClick}>
                  <AddIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  className="z-50"
                >
                  {/* <MenuItem onClick={handleOpen}>
                    <Tooltip title="Create survey">
                      <Box display="flex" alignItems="center">
                        <InsertPhotoIcon fontSize="small" />
                        <span className="ml-2">Create survey</span>
                      </Box>
                    </Tooltip>
                  </MenuItem> */}
                  <MenuItem onClick={() => setOpenPollModal(true)}>
                    <Tooltip title="Create Poll">
                      <Box display="flex" alignItems="center">
                        <Poll fontSize="small" />
                        <span className="ml-2">Create Poll</span>
                      </Box>
                    </Tooltip>
                  </MenuItem>
                  <MenuItem onClick={handleOpenProjectModal}>
                    <Tooltip title="Create project">
                      <Box display="flex" alignItems="center">
                        <File fontSize="small" />
                        <span className="ml-2">Create project</span>
                      </Box>
                    </Tooltip>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <Tooltip title="Submit project">
                      <Box display="flex" alignItems="center">
                        <FilePlus fontSize="small" />
                        <span className="ml-2">Submit project</span>
                      </Box>
                    </Tooltip>
                  </MenuItem>
                </Menu>
              </Box>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <InsertPhotoIcon onClick={() => setOpenImageModal(true)} />
              </IconButton>

              <IconButton
                onClick={() => {
                  handleSendMessage("image", {
                    image: [],
                    DataTransferItem: {
                      creatorId: user?.unifiedUserId?.id,
                      communityId: parseInt(communityId),
                      title: null,
                      isApproved: true,
                      content: message,
                      tags: undefined,
                    },
                  });
                }}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        className="mt-4"
      />{" "}
      <SurveyModal open={open} handleClose={handleClose} />
      <PollsModal
        openPollModal={openPollModal}
        setOpenPollModal={setOpenPollModal}
        success={success}
        setSuccess={setSuccess}
      />
      <CreateProjectModal
        handleClose={handleCloseProjectModal}
        open={openProjectModal}
      />
      <CreateProjectModal
        handleClose={handleCloseProjectModal}
        open={openProjectModal}
      />
      {/* img Upload Modal */}
      <Dialog open={openImageModal} onClose={() => setOpenImageModal(false)}>
        <DialogTitle>{parentPost ? "Reply" : "Create post"}</DialogTitle>
        <form
          onSubmit={handleSubmit((data) => {
            handleSendMessage("image", {
              image: uploadedImage,
              DataTransferItem: data,
            });
            setOpenImageModal(false);
          })}
        >
          <DialogContent>
            {!parentPost && (
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    fullWidth
                    variant="outlined"
                    required
                    placeholder="Write abetter title for search..."
                    label="Title"
                    {...field}
                    margin="normal"
                  />
                )}
              />
            )}
            <Controller
              name="content"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  fullWidth
                  multiline
                  maxRows={3}
                  minRows={2}
                  variant="outlined"
                  placeholder={
                    parentPost ? "write reply..." : "Write a content"
                  }
                  label={parentPost ? "Reply" : "Content"}
                  {...field}
                  margin="normal"
                />
              )}
            />
            <div
              {...getRootProps({ className: "dropzone" })}
              style={{
                border: "2px dashed gray",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <input {...getInputProps()} />
              <Typography>
                Drag and drop an image here, or click to select an image
              </Typography>
            </div>
            {uploadedImage && (
              <Box mt={2}>
                <Image
                  src={URL.createObjectURL(uploadedImage)}
                  alt="uploaded"
                  className="w-[200px] h-[150px]"
                  style={{ aspectRatio: "16 / 9" }}
                  width={300}
                  height={150}
                />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenImageModal(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Publish
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default CommunityInbox;
