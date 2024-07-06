import Head from "next/head";
import AdminLayout from "../layout/AdminLayout";
import Image from "next/image";
import { Divider, Typography } from "@mui/material";
import CommunityCard from "../community/communityCard";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllCommunities,
  setCommunities,
} from "@/store/features/communitySlice";
import { useEffect, useState } from "react";
import { selectUser } from "@/store/features/userSlice";
import { setAllCommunities } from "@/store/features/resourceSlice";
import { setAllSessions } from "@/store/features/session";
import SessionsList from "@/components/sessions/sessionCard";
import { selectAllSessions } from "@/store/features/sessionSlice";

export function Dashboard() {
  const dispatch = useDispatch();

  // const recommendedCommunities = useSelector(selectAllCommunities)

  const [yourCommunity, setYourCommunity] = useState([]);
  const [recommendedCommunity, setRecommendedCommunity] = useState([]);
  const user = useSelector(selectUser);
  const communityData = useSelector(selectAllCommunities);
  const allSessions = useSelector(selectAllSessions);

  console.log("community data----", yourCommunity);

  useEffect(()=>{
    dispatch(setCommunities());
  },[])

  useEffect(() => {
    dispatch(setAllSessions());
  }, []);

  useEffect(() => {
    if (communityData) {
      let userCommunities = [];
      let recommendedCommunities = [];

      communityData.forEach((data) => {
        if (data.users?.length === 0) {
          recommendedCommunities.push(data);
        } else {
          let isUserCommunity = false;
          data.users.forEach((u) => {
            if (u.email === user.email) {
              userCommunities.push(data);
              isUserCommunity = true;
            }
          });

          if (!isUserCommunity) {
            recommendedCommunities.push(data);
          }
        }
      });

      setYourCommunity(userCommunities);
      setRecommendedCommunity(recommendedCommunities);
    }
  }, [communityData, user]);
  return (
    <AdminLayout
      headContent={
        <Head>
          <title>ScholarHouse || Admin Overview</title>
          <meta name="description" content="access your overview" />
          <meta property="og:image" content="/meta-image.png" />
        </Head>
      }
    >
      {/* <div className=" ">
        <div className="flex justify-center">
          <div className="w-[1165px] ">
            {/* <Image src="/bg.svg" alt="a" className="w-full h-full" /> */}
      {/* <div style={{ backgroundImage: "url('/bg.svg')" }}>
              <h1 className=" text-white text-[32px] font-bold h-[240px] w-[75.84vw] px-[82px] pt-[39px] ">
                Welcome to Your College Dashboard! <br></br>
                Navigate effortlessly through analytics,
                <p className="text-white font-thin text-[18px] pt-[10px]">
                  manage faculty access, and monitor student engagement—all in
                  one place.<br></br> Let`&apos;`s elevate your academic excellence
                  together!
                </p>
              </h1>
            </div> */}
      {/* </div> */}
      {/* </div> */}
      {/* <div className="flex gap-[40px] justify-center mt-[21px]">
          <div className="w-[17vw] h-[12vh] bg-[#E3F5FF] rounded-md flex justify-center items-center">
            <button className="flex items-center gap-[10px] font-bold">
              <Image src="/AddBlack.svg" alt="a" className="" />
              <p>Add Users</p>
            </button>
          </div>
          <div className="w-[17vw] h-[12vh] bg-[#E5ECF6] rounded-lg flex justify-center items-center">
            <button className="flex items-center gap-[10px] font-bold">
              <Image src="/explore.svg" alt="a" className="" />
              <p>Explore Community</p>
            </button>
          </div>
          <div className="w-[17vw] h-[12vh] bg-[#E3F5FF] rounded-lg flex justify-center items-center">
            <button className="flex items-center gap-[10px] font-bold">
              <Image src="/task.svg" alt="a" className="" />
              <p>Create Survey</p>
            </button>
          </div>

          <div className="w-[17vw] h-[12vh] bg-[#E5ECF6] rounded-lg flex justify-center items-center">
            <button className="flex items-center gap-[10px] font-bold">
              <Image src="/session.svg" alt="a" className="" />
              <p>Explore Sessions</p>
            </button>
          </div>
        </div> */}
      {/* <div className="flex justify-between px-[60px] py-[10px] items-center">
          <div className="flex gap-3  ">
            <p className="text-[15px] font-bold">Recommended community`&aposs </p>
            <button className="hover:underline text-[15px] font-thin ">
              see all
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <button>
              <Image src="/previousbutton.svg" alt="a" />
            </button>
            <button>
              <Image src="/nextbutton.svg" alt="a" />
            </button>
          </div>
        </div> */}
      {/* <div className="flex gap-[10px] px-[60px]">
          <Image src="/Link.svg" alt="a" />
          <Image src="/Link.svg" alt="a" />
          <Image src="/Link.svg" alt="a" />
          <Image src="/Link.svg" alt="a" />
          <Image src="/Link.svg" alt="a" />
        </div> */}
      {/* </div> */}
      <div>
        {/* <Typography sx={{marginTop:'20px', marginLeft:'20px', fontSize:24, fontWeight:700}}>
          Recommended Comunities
        </Typography> */}
        <div className="flex flex-col overflow-y-auto w-full  py-3 px-3">
          <div className="flex-flex-col gap-2 text-[16px] font-semibold mb-6">
            <div className="pb-6 text-xl text-semibold py-3" style={{ fontSize: 24, fontWeight: 700 }}>
              Your Communities
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {yourCommunity.length !== 0 ? (
                yourCommunity?.map((data, key) => (
                  <CommunityCard
                    title={data.title}
                    key={key}
                    imageUrl={data.bannerImg}
                    members={data.users?.length}
                    link={`/communities?communityId?${data.id}`}
                  />
                ))
              ) : (
                <div
                  style={{
                    marginBottom: "20px",
                    fontSize: 20,
                    fontWeight: 500,
                  }}
                >
                  No Communities to display
                </div>
              )}
            </div>
          </div>
          <Divider />
          <div className="flex-flex-col gap-2 my-2 text-[16px] font-semibold">
            <div
              className="pb-6 text-xl text-semibold py-3"
              style={{ fontSize: 24, fontWeight: 700, marginTop: "10px" }}
            >
              Recommended Communities
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {recommendedCommunity.length !== 0 ? (
                recommendedCommunity?.map((data, key) => (
                  <CommunityCard
                    title={data.title}
                    key={key}
                    imageUrl={data.bannerImg}
                    members={data.users?.length}
                    id={data.id}
                  />
                ))
              ) : (
                <div
                  style={{
                    marginBottom: "20px",
                    fontSize: 20,
                    fontWeight: 500,
                  }}
                >
                  No Communities to display
                </div>
              )}
            </div>
          </div>
          <Divider />
          <Typography sx={{ fontSize: 24, fontWeight: 700, marginTop: "20px" }}>
            Sessions
          </Typography>
          <div className="flex overflow-hidden hover:overflow-x-auto  my-6 gap-6">
            <SessionsList check={"dashboard"} sessions={allSessions} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
