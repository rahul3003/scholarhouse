import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { selectUser } from "@/store/features/userSlice";
import api from "@/utils/apiSetup";
import AWS from "aws-sdk";
import { useDropzone } from "react-dropzone";
import {
  setCommunities,
  selectAllCommunities,
} from "@/store/features/communitySlice";
import Image from "next/image";

const ACCESS_KEY = "AKIAVLDXGQUBG6DXXSKE";
const SECRET_ACCESS_KEY = "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";
const REGION = "ap-south-1";
const BUCKET_NAME = "subspace-test-0";

const CreateCommunityForm = () => {
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      bannerImg: undefined,
      price: 0,
      gold_price: 0,
      silver_price: 0,
      platinum_price: 0,
      discountForCourses: 0,
      resource: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: useForm().control,
    name: "resource", // Set the name to resource,
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const communityData = useSelector(selectAllCommunities);

  const [uploading, setUploading] = useState(false);
  const [parentCommunityId, setParentCommunityId] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);

  const s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION,
  });

  const handleParentCommunityChange = (e) => {
    setParentCommunityId(parseInt(e.target.value));
    setValue("parentCommunityId", e.target.value);
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setBannerImage(file);
  };

  const uploadToS3 = async (file) => {
    const params = {
      Bucket: BUCKET_NAME,
      Key: `images/community/${file.name}`,
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

  const onSubmit = async (data) => {
    if (!user) {
      toast("Login & try again", { type: "warning" });
      router.replace(`/`);
      return;
    }

    try {
      setUploading(true);
      let communityData = {
        ...data,
        parentCommunityId,
        creatorId: user.id,
      };

      let bannerImageUrl = null;
      if (bannerImage) {
        bannerImageUrl = await uploadToS3(bannerImage);
      }

      const res = await api.post(`/community`, {
        ...communityData,
        bannerImg: bannerImageUrl ? bannerImageUrl : "",
        price: 0,
        gold_price: parseInt(data.gold_price),
        silver_price: parseInt(data.silver_price),
        platinum_price: parseInt(data.platinum_price),
        discountForCourses: parseInt(data.discountForCourses),
        resource: !data.resource
          ? undefined
          : data.resource?.map((resource) => ({
              ...resource,
              authorId: user.unifiedUserId.id,
            })),
        adminId: user.unifiedUserId.adminId,
        userId: user.unifiedUserId.userId,
        expertId: user.unifiedUserId.expertId,
      });

      if (res.data.community) {
        toast("Successfully Created Community", { type: "success" });
        router.push(
          `/communities/home?communityId=${res.data.community?.id}`
        );
        reset();
        setUploading(false);
      }
    } catch (error) {
      toast(error.message, { type: "error" });
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div className="flex flex-col md:flex-row ">
      <form
        className="space-y-4 flex flex-col md:flex-row bg-[#EFF4FA] dark:bg-[#271a38] rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" md: space-y-2  pt-2 px-4">
          <div className="space-y-2">
            <div className="py-2">
              <div className="space-y-2 p-4">
                <div
                  {...getRootProps()}
                  className="w-full h-20 border-2 border-dashed border-gray-400 rounded-lg flex justify-center items-center cursor-pointer"
                >
                  <input {...getInputProps()} />
                  <p className="text-gray-600">
                    Drag `&apos;`n`&apos;` drop the banner image here 1:1 ratio,
                    or click to select a file
                  </p>
                </div>
                {bannerImage && (
                  <div>
                    <Image
                      src={URL.createObjectURL(bannerImage)}
                      alt="Banner"
                      style={{ aspectRatio: "1 / 1" }}
                      width={50}
                      height={50}
                      className="mt-2 mx-auto w-[100px] h-[100px]"
                    />
                  </div>
                )}
              </div>
            </div>
            <TextField
              {...register("title", { required: true })}
              label="Community Name"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              {...register("desc", { required: true })}
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              required
              rows={4}
            />

            <FormControl fullWidth variant="outlined">
              <InputLabel id="parent-community-label">
                Select Parent Community
              </InputLabel>
              <Select
                labelId="parent-community-label"
                label="Select Parent Community"
                {...register("parentCommunityId")}
                value={watch("parentCommunity")}
                onChange={handleParentCommunityChange}
                defaultValue={""}
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
            </FormControl>
          </div>
          <div className="space-y-2">
            <Typography variant="h6">Resources</Typography>
            {fields.map((item, index) => (
              <div key={item.id} className="flex items-center space-x-2">
                <TextField
                  {...register(`resource[${index}].name`)}
                  label="Resource Name"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  {...register(`resource[${index}].link`)}
                  label="Resource Link"
                  variant="outlined"
                  fullWidth
                />
                <IconButton onClick={() => remove(index)} color="secondary">
                  <Remove />
                </IconButton>
              </div>
            ))}
            <Button
              onClick={() => append({ name: "", link: "" })}
              color="primary"
              variant="contained"
              startIcon={<Add />}
            >
              Add Resources
            </Button>
          </div>
          <div className="flex gap-4 py-6">
            <Button
              onClick={() => {
                router.back();
              }}
              color="primary"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              disabled={uploading}
            >
              {uploading ? "Creating..." : "Create Community"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCommunityForm;
