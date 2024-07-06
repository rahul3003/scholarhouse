import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormHelperText,
  IconButton,
  Card,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import S3 from "aws-sdk/clients/s3";
import { CloudUploadIcon } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import api from "@/utils/apiSetup";
import { useRouter } from "next/router";

const s3 = new S3({
  accessKeyId: "AKIAVLDXGQUBG6DXXSKE",
  secretAccessKey: "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",
  region: "ap-south-1",
});

const CreateProject = ({ open, handleClose }) => {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [fileErrors, setFileErrors] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    console.log("onsubmit", data); // Log to verify if onSubmit is triggered

    if (selectedFiles.length > 4) {
      setFileErrors("You can upload up to 4 files.");
      return;
    }

    if (selectedFiles.some((file) => file.size > 1 * 1024 * 1024)) {
      setFileErrors("Each file must be less than 1MB.");
      return;
    }

    try {
      setLoading(true);
      // Handle S3 upload
      const fileUploadPromises = selectedFiles.map((file) => {
        const params = {
          Bucket: "subspace-test-0",
          Key: `projects/${Date.now()}_${file.name}`,
          Body: file,
          ACL: "public-read",
        };
        return s3.upload(params).promise();
      });

      const uploadedFiles = await Promise.all(fileUploadPromises);
      const attachedFiles = uploadedFiles.map((file) => file.Location);

      // Submit the project data with attached file URLs
      const projectData = { ...data, attachedFiles, creatorId: 2 };
      // Make sure to adjust the endpoint URL according to your backend route
      const response = await api
        .post("/projects", projectData)
        .then((res) => {
          toast.success("Project created");
          reset();
          setSelectedFiles([]);
          handleClose(); // Close the modal after successful submission
          router.push("/communities/projects");
          setLoading(false);
        })
        .catch((err) => {
          toast.error("Project error");
          setLoading(false);
        });
      console.log("Project created:", response.data);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    if (files.length > 4) {
      setFileErrors("You can upload up to 4 files.");
      return;
    }
    files.some((file) => {
      if (file.size > 1 * 1024 * 1024) {
        setFileErrors("Each file must be less than 1MB.");
        toast.error(`${file.name} is more than 1MB`);
      } else {
        setSelectedFiles([...selectedFiles, file]);
      }
    });
    setFileErrors(""); // Reset file errors when new files are selected
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
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Create Project
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form id="create-project-form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Project name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name of the project"
                variant="outlined"
                fullWidth
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
                margin="normal"
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            defaultValue=""
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                error={!!errors.description}
                helperText={
                  errors.description ? errors.description.message : ""
                }
                margin="normal"
              />
            )}
          />

          <Controller
            name="focusArea"
            control={control}
            defaultValue=""
            rules={{ required: "Focus Area is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Focus Area"
                variant="outlined"
                fullWidth
                error={!!errors.focusArea}
                helperText={errors.focusArea ? errors.focusArea.message : ""}
                margin="normal"
              />
            )}
          />

          <Controller
            name="lastSubmitDate"
            control={control}
            defaultValue={getCurrentDateTime()} // Set default value as current date-time
            rules={{ required: "Last Submit Date is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Submit Date"
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                error={!!errors.lastSubmitDate}
                helperText={
                  errors.lastSubmitDate ? errors.lastSubmitDate.message : ""
                }
                margin="normal"
                inputProps={{ min: getCurrentDateTime() }} // Ensure min is current date-time
              />
            )}
          />

          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            htmlFor="upload-file"
            className="mt-2"
          >
            Upload Files
            <input
              id="upload-file"
              type="file"
              accept="image/jpeg, image/png, application/pdf"
              multiple
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </Button>
          <FormHelperText error={!!fileErrors}>
            {fileErrors
              ? fileErrors
              : "Max size:1MB for each file, max 4 files can upload"}
          </FormHelperText>
          {selectedFiles.length > 0 && (
            <Box mt={2}>
              <Typography variant="subtitle1">Selected Files:</Typography>
              <div className="flex flex-wrap gap-2">
                {selectedFiles.map((file, index) => (
                  <Card
                    key={index}
                    className="min-w-[100px] max-w-[150px] p-2 text-center shadow-none ring-[1px]"
                  >
                    <Typography
                      className="text-[14px] font-semi-bold text-blue-700"
                      noWrap
                    >
                      {file.name}
                    </Typography>
                    <Typography className="py-2 text-[10px] text-gray-400">
                      {file.type?.split("/")[1]}
                    </Typography>
                  </Card>
                ))}
              </div>
            </Box>
          )}
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              form="create-project-form"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Project"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProject;
