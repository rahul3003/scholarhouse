// src/components/SurveyModal.jsx

import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Box,
  IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const SurveyModal = ({ open, handleClose }) => {
  const [createSurvey, setCreateSurvey] = useState(true);
  const [questions, setQuestions] = useState([""]);

  const handleSwitchChange = () => {
    setCreateSurvey(!createSurvey);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, ""]);
  };

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index] = event.target.value;
    setQuestions(newQuestions);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Create a Survey</DialogTitle>
      <DialogContent className="mt-3">
        <TextField
          label="Name of the survey"
          variant="outlined"
          fullWidth
          className="mb-4"
        />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          className="mb-4"
        >
          <span className={`text-[#181059] text-[16px]`}>Create Survey</span>
          <FormControlLabel
            control={
              <Switch
                checked={createSurvey}
                onChange={handleSwitchChange}
                color="secondary"
              />
            }
            labelPlacement="start"
          />
          <span className={`text-[#181059] pl-4 text-[16px]`}>Paste survey link</span>
        </Box>
        {!createSurvey ? (
          questions.map((question, index) => (
            <TextField
              key={index}
              label={`Question ${index + 1}`}
              value={question}
              onChange={(e) => handleQuestionChange(index, e)}
              variant="outlined"
              fullWidth
              className="mb-4"
            />
          ))
        ) : (
          <TextField
            label="Paste external survey link"
            variant="outlined"
            fullWidth
            className="mb-4"
          />
        )}
        {!createSurvey && (
          <Button
            startIcon={<AddCircleIcon />}
            onClick={handleAddQuestion}
            className="mb-4"
          >
            Add question
          </Button>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleClose} variant="contained" color="primary">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SurveyModal;
