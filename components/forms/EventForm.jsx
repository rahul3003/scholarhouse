import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { CiLocationOn } from "react-icons/ci";
import { Image as MuiImage } from "@mui/icons-material";

const EventForm = () => {
  const { register, handleSubmit, setValue, reset } = useForm();
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("eventData"));
    if (storedData) {
      setValue("title", storedData.title);
      setValue("description", storedData.description);
      setValue("location", storedData.location);
      setValue("date", storedData.date);
      setValue("startTime", storedData.startTime);
      setValue("endTime", storedData.endTime);
      if (storedData.image) {
        setPreviewImage(storedData.image);
      }
    }

    const handleRouteChange = () => {
      localStorage.removeItem("eventData");
    };

    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events, setValue]);

  const onSubmit = (data) => {
    const formData = { ...data, image: previewImage };
    localStorage.setItem("eventData", JSON.stringify(formData));
    console.log(formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setValue("image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    reset();
    setPreviewImage("");
    localStorage.removeItem("eventData");
  };

  return (
    <div className="py-8 px-4 w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-3">
            <div className="bg-[#ECECEC] w-full h-40 rounded-lg flex mb-4 justify-center items-center">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Event"
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <MuiImage className="text-7xl text-gray-400/50" />
              )}
            </div>
            <p className="text-gray-500 text-sm">
              Please upload a 16:9 ratio image, size less than 100KB
            </p>
            <label className="w-full bg-teal-50 text-teal-500 text-left py-2 rounded cursor-pointer">
              Choose File
              <input
                type="file"
                className="z-10"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <div className="space-y-4 w-full bg-gray-100 p-5 rounded-md">
            <div className="bg-white hover:ring-[1px] hover:ring-black/20 focus:ring-black/20 rounded-md text-[14px] text-left px-4 py-1">
              <span className="text-left text-[12px] text-black/40">Title</span>
              <input
                className="w-full rounded outline-none border-none"
                placeholder="Enter your event name"
                {...register("title")}
              />
            </div>
            <div className="bg-white rounded-md text-[14px] text-left px-4 py-1">
              <span className="text-left text-[12px] text-black/40">
                Description
              </span>
              <textarea
                className="w-full rounded outline-none border-none"
                placeholder="Enter your description"
                rows="4"
                {...register("description")}
              ></textarea>
            </div>
            <div className="bg-white rounded-md text-[14px] flex gap-3 items-center py-3 text-left px-4">
              <span className="flex gap-2 items-center">
                <CiLocationOn />
                <label className="text-black/40">Location</label>
              </span>
              <input
                className="w-full rounded outline-none border-none"
                placeholder="Location/Venue"
                {...register("location")}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="bg-white rounded-md text-[14px] text-left px-4 py-1">
                <span className="text-left text-[12px] text-black/40">
                  Starts At
                </span>
                <div>
                  <input
                    className="w-full rounded outline-none border-none"
                    type="datetime-local"
                    {...register("startTime")}
                  />
                </div>
              </div>
              <div className="bg-white rounded-md text-[14px] text-left px-4 py-1">
                <span className="text-left text-[12px] text-black/40">
                  Ends At
                </span>
                <div>
                  <input
                    className="w-full rounded outline-none border-none"
                    type="datetime-local"
                    {...register("endTime")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-black hover:bg-black/90 hover:shadow-md text-white rounded"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
