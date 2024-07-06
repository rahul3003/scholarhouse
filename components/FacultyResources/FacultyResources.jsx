import { useEffect, useState } from "react";
import { Resources } from "./Resources/Resources";
import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Switch,
  Typography,
  styled,
} from "@mui/material";
import AWS from "aws-sdk";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import api from "@/utils/apiSetup";
import { useTheme } from "@emotion/react";
import Image from "next/image";
const ACCESS_KEY = "AKIAVLDXGQUBG6DXXSKE";
const SECRET_ACCESS_KEY = "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";
const REGION = "ap-south-1";
const BUCKET_NAME = "subspace-test-0";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const resource = [
  {
    id: 1,
    resource_name: "Design Physiology",
    ifAttach: true,
    createdDate: "Nov12, 2023",
  },
  {
    id: 2,
    resource_name: "Logo Design",
    ifAttach: true,
    createdDate: "Nov12, 2023",
  },
  {
    id: 3,
    resource_name: "Typography",
    ifAttach: true,
    createdDate: "Nov12, 2023",
  },
  {
    id: 4,
    resource_name: "Typography",
    ifAttach: true,
    createdDate: "Nov12, 2023",
  },
];
export function FacultyResources({ userSelected }) {
  console.log(userSelected);
  useEffect(() => {
    console.log(bannerImage);
  });
  const [bannerImage, setBannerImage] = useState(null);
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setBannerImage(file);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  const s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION,
  });

  const uploadToS3 = async (file) => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: `images/${file.name}`,
      Body: file,
      ContentType: file.type,
      ACL: "public-read",
    };

    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Location);
        }
      });
    });
  };

  const [sessionData, setSessionData] = useState();
  const fetchSession = async () => {
    try {
      const res = await api.get(`/session`);
      if (res) {
        const mergeDataObjects = (data) => {
          // Combine both arrays into one
          const allSessions = [...data.sessions, ...data.completedSessions];
          return allSessions;
          // Merge all objects into one
        };

        const mergedData = mergeDataObjects(res.data);
        setSessionData(mergedData);
        // setSessionData(res.);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSession();
  }, []);
  useEffect(() => {
    console.log(selectedSessionIds);
  });

  const [isManual, setIsManual] = useState(true);
  const [selectedRoleValue, setSelectedRoleValue] = useState(1);

  const handleToggle = (event) => {
    setIsManual(event.target.checked);
  };
  const [openModal, setOpenModal] = useState(false);

  const [selectedSessionIds, setSelectedSessionIds] = useState([]);
  const handleChange = (event) => {
    setSelectedSessionIds(event.target.value);
  };

  const [resLink, setResLink] = useState("");
  const [resourcename, setResourceName] = useState("");
  const handleAdd = async (e) => {
    e.preventDefault();
    let resourceUploadedUrl = null;
    if (bannerImage) {
      resourceUploadedUrl = await uploadToS3(bannerImage);
    }
    console.log(resourceUploadedUrl);

    const resourceData = {
      name: resourcename,
      link: isManual ? resLink : resourceUploadedUrl,
      session: [selectedSessionIds],
      communityArr: [],
      authorId: userSelected.unifiedUserId.id,
    };
    const token = localStorage.getItem("senior-central-access-token");
    console.log(token);
    console.log(resourceData);
    try {
      const res = await api.post(
        `/resources/-1`,

        resourceData
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="w-full px-[36px] py-[24px] flex flex-col gap-y-[46px]">
        <div className="absolute w-fit h-fit bottom-10 right-10">
          <button
            onClick={() => setOpenModal(true)}
            className="bg-[#495AFF] py-[15px] px-[15px] rounded-full hover:scale-125 transition-all duration-300 hover:shadow-xl hover:shadow-slate-400"
          >
            <Image alt="a" width={30} height={30} src="/add.svg" />
          </button>
        </div>
        <div className="text-[16px] font-bold">Resource</div>
        <div className="grid grid-cols-3 w-full gap-x-[36px] gap-y-[36px]">
          {resource.map((link) => (
            <Resources
              key={link.id}
              resource_name={link.resource_name}
              id={link.id}
              createdDate={link.createdDate}
              ifAttach={link.ifAttach}
            />
          ))}
        </div>
      </section>
      {openModal ? (
        <div className="absolute h-[100vh] w-[87%] bg-[#00000024] z-50 top-0 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white h-fit w-[42%] rounded-[8px] px-[20px] py-[16px]">
            <div className="flex justify-between ">
              <div className="text-[16px] font-bold ">Add Resources</div>
              <div className="flex gap-[30px] justify-end items-center pt-[12px]">
                <button
                  onClick={() => setOpenModal(false)}
                  className="text-[#8F9BB3] text-[14px] font-normal"
                >
                  <Image alt="a" width={30} height={30} src="/close.svg" />
                </button>
              </div>
            </div>{" "}
            <div className="pb-[12px]">
              <label className="text-[#8F9BB3] text-[12px]">
                Enter Resource Name:
              </label>
              <div className="w-full flex justify-center pt-[12px]">
                <input
                  type="text"
                  onChange={(e) => setResourceName(e.target.value)}
                  className="w-[95%] border-[1px] border-[#8F9BB3]  py-[12px] px-[12px] rounded-[4px]"
                ></input>
              </div>
            </div>
            <div>
              <label className="text-[#8F9BB3] text-[12px]">
                Choose Session:
              </label>
            </div>
            <div className=" px-[12px] py-[8px] pt-[18px]">
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Session</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedSessionIds}
                    onChange={handleChange}
                    label="Role"
                  >
                    {sessionData.map((link) => (
                      <MenuItem key={link.id} value={link.id}>
                        {link.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className="w-full flex justify-center py-[50px]">
              {" "}
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography
                  className={!isManual ? "text-[16px] font-bold" : ""}
                >
                  Add it manually
                </Typography>
                <AntSwitch
                  checked={isManual}
                  onChange={handleToggle}
                  // defaultChecked
                  inputProps={{ "aria-label": "ant design" }}
                />
                <Typography className={isManual ? "text-[16px] font-bold" : ""}>
                  Paste resource link
                </Typography>
              </Stack>
            </div>
            {!isManual ? (
              <div>
                <div className="pt-[12px] pb-[12px]">
                  <Box
                    {...getRootProps()}
                    sx={{
                      border: "2px dashed #ccc",
                      borderRadius: "10px",
                      padding: "20px",
                      textAlign: "center",
                      backgroundColor: isDragActive ? "#f0f0f0" : "#fafafa",
                      transition: "background-color 0.3s",
                    }}
                  >
                    <input {...getInputProps()} />
                    <CloudUploadIcon sx={{ fontSize: 40, color: "#888" }} />
                    <Typography variant="h6" sx={{ marginTop: 2 }}>
                      Drag & drop files or{" "}
                      <span style={{ color: "#3f51b5", cursor: "pointer" }}>
                        Browse
                      </span>
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ marginTop: 1, color: "#888" }}
                    >
                      Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI,
                      Word, PPT
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ marginTop: 3 }}
                      startIcon={<CloudUploadIcon />}
                    >
                      UPLOAD FILES
                    </Button>
                  </Box>
                  {bannerImage && (
                    <div className="w-full">
                      <p className="mt-2 mx-auto text-center">
                        {bannerImage.name}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-y-[12px]">
                <div className="border-[1px] border-[#EFF4FA] px-[12px] py-[8px]">
                  <div className="text-[12px] font-normal text-[#1C1C1C] opacity-40">
                    Paste resource link
                  </div>
                  <div>
                    <input
                      onChange={(e) => setResLink(e.target.value)}
                      placeholder="Resource link "
                      className=" placeholder-black w-full outline-0 px-[12px] py-[2px] text-[14px] text-[#495AFF] font-semibold"
                      type="text"
                    ></input>
                  </div>
                </div>
              </div>
            )}
            <div className="flex gap-[30px] justify-end items-center pt-[12px]">
              <button
                onClick={() => setOpenModal(false)}
                className="text-[#8F9BB3] text-[14px] font-normal"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="bg-[#0095FF] text-[18px] font-semibold text-white py-[7px] px-[41px] rounded-[8px]"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
