import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Trash } from "lucide-react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import api from "@/utils/apiSetup";
import { selectAllCommunities } from "@/store/features/communitySlice";
import { selectUser } from "@/store/features/userSlice";
import { toast } from "react-toastify";

const PollsModal = ({
  openPollModal,
  setOpenPollModal,
  setSuccess,
  success,
}) => {
  const { control, handleSubmit, getValues, watch, reset, register } = useForm({
    defaultValues: {
      creatorId: 1,
      communityId: "",
      title: null,
      isApproved: true,
      tags: undefined,
    },
  });
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [expiryDate, setExpiryDate] = useState(new Date());
  const communityData = useSelector(selectAllCommunities);
  const [parentPost, setParentPost] = useState(null);
  const user = useSelector(selectUser);

  const handleAddPollOption = () => {
    setPollOptions([...pollOptions, ""]);
  };

  const handleRemovePollOption = (index) => {
    const updatedOptions = pollOptions.filter((_, i) => i !== index);
    setPollOptions(updatedOptions);
  };

  const handleSendMessage = async (type, content) => {
    if (type === "poll") {
      api
        .post(`/thread`, {
          creatorId: user.unifiedUserId.id,
          content: content.question,
          isPoll: true,
          communityId: content.communityId,
          pollExpiresAt: new Date(content.expiryDate),
          parentPostId: parentPost ? parentPost : undefined,
          optionsData: content.options?.map((data) => {
            return { option: data };
          }),
        })
        .then((res) => {
          reset();
          setParentPost(null);
          setOpenPollModal(false);
          setSuccess(!success);
          toast(`Created Poll!`, { type: "success" });
        });
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <Dialog open={openPollModal} onClose={() => setOpenPollModal(false)}>
      <DialogTitle>Create a Poll</DialogTitle>
      <form
        onSubmit={handleSubmit((data) => {
          handleSendMessage("poll", {
            question: data.pollQuestion,
            options: pollOptions,
            expiryDate: data.expiresAt,
            communityId: data.communityId,
          });
        })}
      >
        <DialogContent>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="parent-community-label">
              Select Community
            </InputLabel>
            <Controller
              name="communityId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="parent-community-label"
                  label="Select Community"
                  onChange={(e) => field.onChange(e.target.value)}
                  value={field.value || ""}
                >
                  <MenuItem value="">Select Community</MenuItem>
                  {communityData?.map((item, index) => (
                    <MenuItem value={item.id} key={index}>
                      <div className="flex gap-2 items-center">
                        <Avatar alt="communityImage" src={item.bannerImg} />
                        <Typography variant="body1" noWrap>
                          {item.title}
                        </Typography>
                      </div>
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
          <Controller
            name="pollQuestion"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                fullWidth
                variant="outlined"
                label="Poll Question"
                {...field}
                margin="normal"
              />
            )}
          />
          {pollOptions.map((option, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              className="gap-2"
            >
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                label={`Option ${index + 1}`}
                value={option}
                onChange={(e) => {
                  const newOptions = [...pollOptions];
                  newOptions[index] = e.target.value;
                  setPollOptions(newOptions);
                }}
                margin="normal"
              />
              <IconButton
                onClick={() => handleRemovePollOption(index)}
                disabled={pollOptions.length <= 2}
                color="error"
              >
                <Trash />
              </IconButton>
            </Box>
          ))}
          <Button
            onClick={handleAddPollOption}
            disabled={pollOptions.length >= 6}
          >
            Add Option
          </Button>
          <TextField
            label="ExpiresAt"
            {...register("expiresAt")}
            type="datetime-local"
            className="mt-2"
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            required
            inputProps={{ min: getCurrentDateTime() }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenPollModal(false)}>Cancel</Button>
          <Button
            type="submit"
            disabled={pollOptions.some((option) => !option.trim())}
          >
            Create Poll
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default PollsModal;
