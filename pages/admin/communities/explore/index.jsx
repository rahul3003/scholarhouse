"@use server";
import CommunityCard from "@/components/community/communityCard";
import CommunitySidebar from "@/components/community/communitySidebar";
import AdminLayout from "@/components/layout/AdminLayout";
import {
  selectAllCommunities,
  setCommunities,
} from "@/store/features/communitySlice";
import { selectUser } from "@/store/features/userSlice";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Explore = () => {
  const [yourCommunity, setYourCommunity] = useState([]);
  const [recommendedCommunity, setRecommendedCommunity] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch()
  const communityData = useSelector(selectAllCommunities);


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
            if (u.id === parseInt(user.id)) {
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
          <title>ScholarHouse || Community explore</title>
          <meta name="description" content="Learn your choice" />
          <meta property="og:image" content="/meta-image.png" />
        </Head>
      }
    >
      <div className="flex h-[90vh] ">
        <CommunitySidebar />
        <div className="flex flex-col overflow-y-auto w-full  py-3 px-3">
          <div className="flex-flex-col gap-2 text-[16px] font-semibold">
            <div className="pb-6">Your Communities</div>
            <div className="flex gap-2 overflow-x-auto">
              {yourCommunity?.map((data, key) => (
                <CommunityCard
                  title={data.title}
                  key={key}
                  imageUrl={data.bannerImg}
                  members={data.users?.length}
                  link={`/communities?communityId?${data.id}`}
                />
              ))}
            </div>
          </div>
          <div className="flex-flex-col gap-2 my-2 text-[16px] font-semibold">
            <div className="pb-6">Recommended Communities</div>
            <div className="flex gap-2 overflow-x-auto">
              {recommendedCommunity?.map((data, key) => (
                <CommunityCard
                  title={data.title}
                  key={key}
                  imageUrl={data.bannerImg}
                  members={data.users?.length}
                  id={data.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Explore;
