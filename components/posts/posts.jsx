// src/components/Post.jsx

import React, { useEffect, useState } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Paper,
  LinearProgress,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/userSlice";
import PollActionCard from "./pollsActionCard";
import api from "@/utils/apiSetup";
import Image from "next/image";

const Post = ({
  post,
  setSuccess,
  success,
  key,
  setParentPost,
  setOpenImageModal,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const user = useSelector(selectUser);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLike = (postId, userId) => {
    api.patch(`/thread/${postId}/user/${userId}`).then((res) => {
      console.log(res.data);
      setSuccess(!success);
    });
  };

  return (
    <Paper elevation={1} key={key} className="p-4 mb-4">
      <Box display="flex" alignItems="center" className="mb-4">
        <Avatar
          src={
            post.creator?.user?.photoURL ||
            post.creator?.expert?.photoURL ||
            post.creator?.partner?.photoURL
          }
          className="mr-2"
        />
        <Box flexGrow={1}>
          <Typography
            variant="body1"
            className="font-semibold text-[#734CC9] flex items-center gap-1"
          >
            {"@"}
            {post?.creator?.admin?.name ||
              post?.creator?.user?.name ||
              post?.creator?.expert?.name ||
              post?.creator?.partner?.name}
          </Typography>
          <Typography variant="body2" className="text-gray-500">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </Box>
      </Box>
      <Box>
        {post?.assets?.length > 0 && (
          <div>
            <Image
              src={post?.assets[0]?.url}
              className="h-[120px] md:h-[160px] w-[180px] md:w-[360px] object-cover"
              aspectRatio="12/9"
              width={180}
              height={120}
              alt="Paella dish"
            />
          </div>
        )}
        {!post.isPoll && (
          <div className="pt-2">
            <Typography variant="h6" component="h2" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="h6" component="h6" gutterBottom>
              {post.content}
            </Typography>
          </div>
        )}
        {post.isPoll &&
        !post.UserPollOptionSelect.find(
          (selection) => selection.unifiedUserId === user.unifiedUserId.id
        ) ? (
          <div>
            {
              <PollActionCard
                post={post}
                success={success}
                setSuccess={setSuccess}
              />
            }
            {/* {post.PollOptions.map((poll, index) => (
              <div key={index} className={""}>
                <div
                  className="px-4 py-2 rounded-md ring-[1px] ring-gray-300 hover:bg-gray-100 mb-3"
                  key={index}
                  onClick={() =>
                    handleVote(poll.id, post.id, user.unifiedUserId.id)
                  }
                >
                  {poll.option}
                </div>
              </div>
            ))} */}
          </div>
        ) : (
          <div>
            {post.votes.map((vote, index) => (
              <Box mb={2} key={index}>
                <Typography
                  variant="body1"
                  gutterBottom
                  className="flex justify-between items-center"
                >
                  {vote.text}
                  <span className="text-[12px] pr-12 text-gray-400">
                    {"Votes: "}
                    {vote.votes}
                  </span>
                </Typography>
                <Box display="flex" alignItems="center">
                  <Box width="100%" mr={1}>
                    <LinearProgress
                      variant="determinate"
                      color={
                        (vote.votes / post.UserPollOptionSelect.length) * 100 >=
                        50
                          ? "success"
                          : "error"
                      }
                      sx={{ height: 25 }}
                      value={
                        (vote.votes / post.UserPollOptionSelect.length) * 100
                      }
                    />
                  </Box>
                  <Box minWidth={35}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                    >{`${Math?.round(
                      (vote.votes / post.UserPollOptionSelect.length) * 100
                    )}%`}</Typography>
                  </Box>
                </Box>
              </Box>
            ))}
            {post.isPoll && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                {post.UserPollOptionSelect?.length} Votes | {"ends "}{" "}
                {moment(post?.pollExpiresAt).endOf("days").fromNow()}{" "}
              </Typography>
            )}
          </div>
        )}
      </Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <div className="flex gap-6 items-center">
          <Box display="flex" alignItems="center" className="gap-2">
            <ThumbUpIcon
              onClick={() => handleLike(post.id, user.unifiedUserId.id)}
              className={
                post.likes?.filter(
                  (data) => data.userId === user.unifiedUserId.id
                )[0]?.userId === user.unifiedUserId.id
                  ? "text-blue-500"
                  : "text-gray-500"
              }
            />
            <Typography variant="body2" className="ml-1">
              {post.likes?.length}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" className="gap-2">
            <CommentIcon className="text-gray-500" />
            <Typography variant="body2" className="ml-1">
              {post._count.childrenPosts}
            </Typography>
          </Box>
        </div>
        <IconButton onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem
            onClick={() => {
              setParentPost(post.id);
              setOpenImageModal(true);
            }}
          >
            Reply
          </MenuItem>
          {/* <MenuItem onClick={handleMenuClose}>Edit Message</MenuItem> */}
          {/* <MenuItem onClick={handleMenuClose}>Delete</MenuItem> */}
          <MenuItem onClick={handleMenuClose}>Copy</MenuItem>
        </Menu>
      </Box>
      <Box
        className={`max-h-[200px] overflow-y-auto py-2 flex flex-col gap-4  border-l-[1px]`}
      >
        {post?.childrenPosts?.map((child, index) => (
          <div
            key={index}
            className="shadow-sm ring-[1px] ring-gray-200 ri mx-2 px-4 py-2 rounded-md"
          >
            <Box display="flex" alignItems="center" className="mb-1">
              <Avatar
                src={
                  child.creator?.user?.photoURL ||
                  child.creator?.expert?.photoURL ||
                  child.creator?.partner?.photoURL
                }
                className="mr-2"
              />
              <Box flexGrow={1}>
                <Typography
                  variant="body1"
                  className="font-semibold text-[#734CC9] flex items-center gap-1"
                >
                  {"@"}
                  {child?.creator?.admin?.name ||
                    child?.creator?.user?.name ||
                    child?.creator?.expert?.name ||
                    child?.creator?.partner?.name}
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  {moment(child.createdAt).fromNow()}
                </Typography>
              </Box>
            </Box>
            {child?.assets?.length > 0 && (
              <div>
                <Image
                  src={child?.assets[0]?.url}
                  className="h-[120px] md:h-[160px] w-[180px] md:w-[360px] object-cover"
                  aspectRatio="12/9"
                  alt="Paella dish"
                />
              </div>
            )}
            <div className="pt-2 flex justify-between items-start">
              <Typography
                variant="h6"
                component="h6"
                className="pl-6"
                gutterBottom
              >
                {child.content}
              </Typography>
              <Box display="flex" alignItems="center" className="gap-2">
                <ThumbUpIcon
                  onClick={() => handleLike(child.id, user.unifiedUserId.id)}
                  className={
                    child.likes?.filter(
                      (data) => data.userId === user.unifiedUserId.id
                    )[0]?.userId === user.unifiedUserId.id
                      ? "text-blue-500"
                      : "text-gray-500"
                  }
                />
                <Typography variant="body2" className="ml-1">
                  {child.likes?.length}
                </Typography>
              </Box>
            </div>
          </div>
        ))}
      </Box>
    </Paper>
  );
};

export default Post;
