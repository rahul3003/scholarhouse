import { useEffect, useRef, useState } from "react";
import { Achievements } from "../AboutScholarAchievements/Achivements/Achievements";
import { GoogleScholar } from "../AboutScholarAchievements/GoogleScholar/GoogleScholar";
import { Patents } from "../AboutScholarAchievements/Patents/Patents";
import { ResearchPaper } from "../AboutScholarAchievements/ResearchPapers/ResearchPapers";
import Socials from "../AboutScholarAchievements/Socials/Socials";
import Profile from "../ProfCrop/Profile";
import api from "@/utils/apiSetup";
import { setUser } from "@/store/features/userSlice";
import companyData from "@/utils/data";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import AWS from "aws-sdk";
import Image from "next/image";
import { Avatar } from "@mui/material";
const ACCESS_KEY = "AKIAVLDXGQUBG6DXXSKE";
const SECRET_ACCESS_KEY = "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";
const REGION = "ap-south-1";
const BUCKET_NAME = "subspace-test-0";

export function ProfileSetup({ userSelect }) {
  console.log(userSelect);
  const [profName, setProfName] = useState("");
  const [des, setDes] = useState("");
  const [bio, setBio] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const [image, setImage] = useState();
  useEffect(() => {
    console.log(image);
  });
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    // console.log(file);
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setImage(reader.result);
    //   };

    //   reader.readAsDataURL(file);
    // }
  };

  const s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION,
  });
  const avatarUrl = useRef(
    "https://avatarfiles.alphacoders.com/161/161002.jpg"
  );
  const uploadToS3 = (file) => {
    console.log(file);
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
  const UpdateProf = async (e) => {
    if (e) e.preventDefault();
    let resourceUploadedUrl = null;
    console.log(image);
    if (image) {
      resourceUploadedUrl = await uploadToS3(image);
    }
    console.log(resourceUploadedUrl);
    const userType =
      userSelect.unifiedUserId.adminId !== null
        ? "admin"
        : userSelect.unifiedUserId.userId !== null
        ? "user"
        : userSelect.unifiedUserId.expertId !== null
        ? "expert"
        : "partner";

    const profDetails =
      userType == "user"
        ? {
            name: profName,
            address: des,
            desc: bio,
            photoURL: resourceUploadedUrl,
          }
        : userType == "expert"
        ? {
            name: profName,
            address: des,
            desc: bio,
            photoURL: resourceUploadedUrl,
          }
        : "";
    const token = localStorage.getItem("senior-central-access-token");
    try {
      const res =
        userType == "admin"
          ? await api.patch(`/admin/${userSelect.id}`, profDetails)
          : userType == "user"
          ? await api.patch(`/user/${userSelect.id}`, profDetails)
          : userType == "expert"
          ? await api.patch(`/expert/${userSelect.id}`, profDetails)
          : await api.patch(`/user/${userSelect.id}`, profDetails);
      // dispatch(setUser(res.data.user));
      // localStorage.setItem(companyData.accessToken, res.data.accessToken);
      const isFromSession = router.query.fromSession;
      isFromSession ? router.back() : router.push("/successOnBoard");
    } catch (err) {
      // toast.error("Invalid Username or Password");
    }
  };

  return (
    <section className="w-[100vw] h-[100vh] bg-gradient-to-r from-[#4660f1ac] to-[#4660f15e] flex justify-center items-center py-[32px] px-[32px]">
      <div className="bg-white h-full w-full rounded-[20px] flex flex-col items-center py-[40px] overflow-y-auto gap-y-[82px]">
        <div>
          <Image src="/shblack.svg" alt="imag" width={100} height={100} />
        </div>
        <div className="w-full px-[8vw]">
          <div>
            <h1 className="text-center text-[32px] font-medium">
              Setup Profile
            </h1>
          </div>

          <div className="w-full h-[2px] bg-[#E0E4EC]"></div>
          <form
            onSubmit={UpdateProf}
            className="gap-y-[30px] pt-[48px] flex flex-col"
          >
            <div className="flex">
              <div className="w-[20%]">
                {/* <Profile avatarUrl={avatarUrl} /> */}
                <div className="image-uploader">
                  {1 && (
                    <Avatar
                      src={
                        image
                          ? URL.createObjectURL(image)
                          : ""
                      }
                      alt="Uploaded"
                      className="circular-image "
                      sx={{ width: 100, height: 100 }}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    id="file-input"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <label htmlFor="file-input" className=" choose-image-button ">
                    Choose img
                  </label>
                </div>
              </div>
              <div className="flex flex-col justify-between w-full">
                <div className="flex flex-col gap-y-[6px]">
                  <div className="text-[16px] font-medium">Full Name</div>
                  <input
                    type="text"
                    onChange={(e) => setProfName(e.target.value)}
                    className="w-full border-[1px] border-[#465FF1] rounded-[8px] py-[10px] px-[10px] border-opacity-40"
                    placeholder="Please Enter your Full Name"
                  ></input>
                </div>
                <div className="flex flex-col gap-y-[6px] mt-[12px]">
                  <div className="text-[16px] font-medium">Designation:</div>
                  <input
                    type="text"
                    onChange={(e) => setDes(e.target.value)}
                    className="w-full border-[1px] border-[#465FF1] rounded-[8px] py-[10px] px-[10px] border-opacity-40"
                    placeholder="Please Enter your Full Name"
                  ></input>
                </div>
              </div>
            </div>
            <div>
              <div className="text-[16px] font-medium pb-[12px]">Bio</div>
              <div>
                <textarea
                  className="h-[158px] w-full border-[1px] border-opacity-40 border-[#465FF1] rounded-[8px] py-[10px] px-[10px] focus:border-[1px]"
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Write your Bio here e.g your hobbies, interests ETC"
                ></textarea>
              </div>
            </div>
            <div className="flex flex-col w-full gap-y-[22px]">
              <GoogleScholar />
              <Achievements />
              <Patents />
              <ResearchPaper />
              <Socials />
            </div>
            <div className="w-full flex justify-end mt-[48px]">
              <button
                type="submit"
                className="text-[16px] font-bold bg-[#465FF1] py-[15px] px-[70px] rounded-[8px] text-white"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
