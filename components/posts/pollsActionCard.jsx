import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { selectUser } from "@/store/features/userSlice";
import { useSelector } from "react-redux";
import api from "@/utils/apiSetup";

const StyledCard = styled(Box)`
  @apply bg-blue-100 p-4 rounded-lg shadow-md;
`;

const PollActionCard = ({ post, success, setSuccess }) => {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const user = useSelector(selectUser);

  const handleVote = (pollId, postId, userId) => {
    api
      .patch(`/thread/${postId}/user/${userId}/option/${pollId}`)
      .then((res) => {
        console.log(res.data);
        setSuccess(!success);
      });
  };

  return (
    <StyledCard className="px-4">
      <Typography variant="h6" component="h2" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="h6" component="h6" gutterBottom>
        {post.content}
      </Typography>
      <FormControl component="fieldset" className="w-full">
        <RadioGroup
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="flex flex-col gap-2 w-full"
        >
          {post.PollOptions?.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option.id}
              label={option.option}
              labelPlacement="start"
              control={<Radio className="bg-white flex justify-between" />}
              className={`px-4 ${
                selectedOption === option.id ? "bg-green-200" : "bg-gray-100"
              } rounded-md flex justify-between`}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <div className="flex justify-between items-center pb-2">
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          {post.UserPollOptionSelect?.length} Votes | {post.pollExpiresAt} left
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className="px-4"
          onClick={() => {
            handleVote(selectedOption, post.id, user.unifiedUserId.id);
          }}
          disabled={!selectedOption}
          sx={{ mt: 2 }}
        >
          Vote
        </Button>
      </div>
    </StyledCard>
  );
};

export default PollActionCard;
