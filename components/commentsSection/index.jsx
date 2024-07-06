import React, { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
  Typography,
  Grid,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import img from "next/image";
import { useSelector } from "react-redux";
import { selectSession } from "@/store/features/sessionSlice";
import { selectUser } from "@/store/features/userSlice";
import api from "@/utils/apiSetup";
// // import { useSelector } from 'react-redux';
// import { selectUser } from '@/store/features/userSlice';
import AWS from "aws-sdk";
import Image from "next/image";
// import api from '@/utils/apiSetup';

AWS.config.update({
  accessKeyId: "AKIAVLDXGQUBG6DXXSKE",
  secretAccessKey: "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",
  region: "ap-south-1",
});

const s3 = new AWS.S3();

const CommentsSection = () => {
  const user = useSelector(selectUser);
  const session = useSelector(selectSession);
  const sessionId = session?.id;

  // const user = useSelector(selectUser);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [images, setImages] = useState([]);
  const [commentFields, setCommentFields] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    // clubId && fetchMessagesForClub();
  },[]);

  const fetchMessages = async () => {
    try {
      const response = await api.get(`/thread/session/${sessionId}`);
      if (response.status === 200) {
        const fetchedMessages = response.data.posts.map((post) => {
          const creatorData =
            post.creator.user ||
            post.creator.admin ||
            post.creator.expert ||
            post.creator.partner;
          return {
            ...post,
            creatorData,
            comments: [],
          };
        });
        setMessages(fetchedMessages);
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // const fetchMessagesForClub= async()=>{
  //   console.log("meg for clubsss")
  //   try {
  //     const response = await api.get(`/thread/club/${clubId}`);
  //     if (response.status === 200) {
  //       const fetchedMessages = response.data.posts.map((post) => {
  //         const creatorData = post.creator.user || post.creator.admin || post.creator.expert || post.creator.partner;
  //         return {
  //           ...post,
  //           creatorData,
  //           comments: []
  //         };
  //       });
  //       console.log('fetched msgssss', fetchedMessages)
  //       setMessages(fetchedMessages);
  //     } else {
  //       console.error('Failed to fetch messages');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching messages:', error);
  //   }
  // }

  // const handlePostMessage = async () => {
  //   try {
  //     let assetsData = [];

  //     for (let i = 0; i < images.length; i++) {
  //       const image = images[i];
  //       const fileName = `${Date.now()}-${image.name}`;
  //       const params = {
  //         Bucket: 'subspace-test-0',
  //         Key: fileName,
  //         Body: image,
  //         ContentType: image.type,
  //         ACL: 'public-read'
  //       };
  //       const uploadResult = await s3.upload(params).promise();
  //       assetsData.push({
  //         type: 'image',
  //         url: uploadResult.Location,
  //         index: i
  //       });
  //     }

  //     const messageData = {
  //       content: newMessage.trim(),
  //       creatorId: user.unifiedUserId.id,
  //       isGreeting: false,
  //       isAsk: false,
  //       communityId: communityId ? communityId : null,
  //       clubId: clubId ? clubId : null,
  //       assetsData: assetsData
  //     };

  //     const response = await api.post('/thread', messageData);
  //     if (response.status === 200) {
  //       const newPost = response.data.createdPost;
  //       const creatorData = newPost.creator.user || newPost.creator.admin || newPost.creator.expert || newPost.creator.partner;
  //       newPost.creatorData = creatorData;
  //       setMessages([newPost, ...messages]);
  //       setNewMessage('');
  //       setImages([]);
  //     } else {
  //       throw new Error('Failed to post message');
  //     }
  //   } catch (error) {
  //     console.error('Error posting message:', error);
  //   }
  // };

  const handlePostMessage = async () => {
    try {
      let assetsData = [];

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const fileName = `${Date.now()}-${image.name}`;
        const params = {
          Bucket: "subspace-test-0",
          Key: fileName,
          Body: image,
          ContentType: image.type,
          ACL: "public-read",
        };
        const uploadResult = await s3.upload(params).promise();
        assetsData.push({
          type: "image",
          url: uploadResult.Location,
          index: i,
        });
      }

      const messageData = {
        content: newMessage.trim(),
        creatorId: user.unifiedUserId.id,
        isGreeting: false,
        isAsk: false,
        communityId: null,
        sessionId: sessionId ? sessionId : null,
        assetsData: assetsData,
      };

      const response = await api.post("/thread", messageData);
      if (response.status === 200) {
        const newPost = response.data.createdPost;
        const creatorData =
          newPost.creator.user ||
          newPost.creator.admin ||
          newPost.creator.expert ||
          newPost.creator.partner;
        newPost.creatorData = creatorData;
        setMessages([newPost, ...messages]);
        setNewMessage("");
        setImages([]);
      } else {
        throw new Error("Failed to post message");
      }
    } catch (error) {
      console.error("Error posting message:", error);
    }
  };

  const handleImageChange = (event) => {
    const selectedImages = event.target.files;
    setImages([...images, ...selectedImages]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const toggleCommentField = (postId) => {
    setCommentFields((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const handleCommentMessage = async (postId) => {
    try {
      const messageData = {
        parentPostId: postId,
        content: commentInputs[postId]?.trim(),
        creatorId: user.unifiedUserId.id,
        // communityId: communityId ? communityId : null,
        // clubId:  clubId?clubId: null,
        sessionId: sessionId ? sessionId : null,
        isGreeting: false,
        isAsk: false,
        assetsData: [],
      };

      const response = await api.post("/thread", messageData);
      if (response.status === 200) {
        const newComment = response.data.createdPost;
        newComment.creatorData = user;
        setMessages([newComment, ...messages]);
        setCommentInputs((prevInputs) => ({
          ...prevInputs,
          [postId]: "",
        }));
      } else {
        throw new Error("Failed to send comment");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleCommentInputChange = (postId, value) => {
    setCommentInputs((prevInputs) => ({
      ...prevInputs,
      [postId]: value,
    }));
  };

  const handleLike = (postId) => {
    const userId = user.unifiedUserId.id;

    api
      .patch(`/thread/${postId}/user/${userId}`)
      .then((res) => {
        if (res.status === 200) {
          fetchMessages();
        }
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };

  const commentsContainerStyle = {
    maxHeight: "200px", // Adjust the height as needed
    overflowY: "auto",
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#ffff",
        color: "#000",
        padding: 2,
        marginTop: "0px",
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: 22, marginBottom: "14px" }}>
        Comments
      </Typography>
      <Card
        sx={{ backgroundColor: "#fff", marginBottom: 2, marginRight: "10px" }}
      >
        <CardContent>
          <TextField
            fullWidth
            multiline
            rows={2}
            variant="outlined"
            placeholder="Type your comment here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            sx={{ backgroundColor: "#fff", borderRadius: 1 }}
          />
          {images.map((image, index) => (
            <Box key={index} mt={2} mb={2} display="flex" alignItems="center">
              <Box
                display="flex"
                alignItems="center"
                sx={{ position: "relative" }}
              >
                <Typography variant="body2">{image.name}</Typography>
                <IconButton
                  onClick={() => handleRemoveImage(index)}
                  sx={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    backgroundColor: "#fff",
                    padding: "4px",
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ))}
          <input
            accept="image/*"
            type="file"
            style={{ display: "none" }}
            id="upload-button"
            onChange={handleImageChange}
            multiple
            ref={fileInputRef}
          />
          <label htmlFor="upload-button">
            <IconButton
              component="span"
              color="primary"
              sx={{ marginTop: 2, color: "#495AFF" }}
            >
              <InsertPhotoIcon />
            </IconButton>
          </label>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePostMessage} //handlePostMEssage here
            sx={{
              marginTop: 2,
              marginLeft: 2,
              borderRadius: "20px",
              backgroundColor: "#495AFF",
            }}
          >
            Post
          </Button>
        </CardContent>
      </Card>
      {messages
        ?.filter((parentId) => parentId.parentPostId === null)
        .map((msg) => (
          <Card key={msg.id} sx={{ backgroundColor: "#fff", marginBottom: 2 }}>
            <CardHeader
              avatar={<Avatar src={msg?.creatorData?.photoURL} />}
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={msg?.creatorData?.name}
              subheader={new Date(msg?.createdAt).toLocaleString()}
              sx={{ color: "#000" }}
            />
            <CardContent>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginLeft: "20px" }}
              >
                {msg.content}
              </Typography>
              {msg?.assets?.length > 0 && (
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                  {msg.assets.map((asset, index) => (
                    <Grid item xs={6} key={index}>
                      {asset.type === "image" && (
                        <Image
                          src={asset.url}
                          alt={`msg-${index}`}
                          style={{ width: "100%", borderRadius: 8 }}
                          width={30}
                          height={30}
                        />
                      )}
                    </Grid>
                  ))}
                </Grid>
              )}
              <div className="flex flex-col">
                <Box
                  sx={{ display: "flex", alignItems: "center", marginTop: 2 }}
                >
                  <IconButton
                    aria-label="like"
                    sx={{ marginRight: 1 }}
                    onClick={() => handleLike(msg?.id)}
                  >
                    <FavoriteIcon />
                  </IconButton>
                  <Typography variant="body2" sx={{ marginRight: 2 }}>
                    {msg?.likes?.length} Likes
                  </Typography>
                  <IconButton
                    aria-label="comment"
                    sx={{ marginRight: 1 }}
                    onClick={() => toggleCommentField(msg.id)}
                  >
                    <CommentIcon />
                  </IconButton>
                  <Typography variant="body2">
                    {
                      messages.filter(
                        (comment) => comment.parentPostId === msg.id
                      ).length
                    }{" "}
                    Comments
                  </Typography>
                </Box>
                {commentFields[msg.id] && (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 1,
                      }}
                    >
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Write a comment..."
                        value={commentInputs[msg.id]}
                        onChange={(e) =>
                          handleCommentInputChange(msg.id, e.target.value)
                        }
                        sx={{ backgroundColor: "#fff", borderRadius: 1 }}
                      />
                      <IconButton
                        color="primary"
                        aria-label="send comment"
                        onClick={() => handleCommentMessage(msg.id)}
                      >
                        <SendIcon />
                      </IconButton>
                    </Box>
                    <Box sx={{ ...commentsContainerStyle }}>
                      {messages
                        .filter((comment) => comment.parentPostId === msg.id)
                        .map((comment, index) => (
                          <Box
                            key={index}
                            sx={{
                              marginTop: 2,
                              marginLeft: 4,
                              marginBottom: 2,
                            }}
                          >
                            <Card>
                              <CardHeader
                                avatar={
                                  <Avatar src={comment.creatorData?.photoURL} />
                                }
                                title={comment.creatorData?.name}
                                subheader={new Date(
                                  comment.createdAt
                                ).toLocaleString()}
                                sx={{ color: "#000" }}
                              />
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{
                                  marginLeft: "10vh",
                                  marginBottom: "20px",
                                }}
                              >
                                {comment.content}
                              </Typography>
                            </Card>
                          </Box>
                        ))}
                    </Box>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
    </Box>
  );
};

export default CommentsSection;
