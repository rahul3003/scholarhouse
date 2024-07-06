import CommunityInbox from "@/components/community/communityInbox";
import CommunitySidebar from "@/components/community/communitySidebar";
import SubCommunitySidebar from "@/components/community/subCommunitySidebar";
import SessionsList from "@/components/sessions/sessionCard";
import AdminLayout from "@/components/layout/AdminLayout";
import Post from "@/components/posts/posts";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  selectCommunityPosts,
  setCommunityPosts,
} from "@/store/features/postsSlice";
import {
  selectAllCommunities,
  selectCommunitySessions,
  setCommunities,
  setCommunitySessions,
} from "@/store/features/communitySlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/store/features/userSlice";
import { Avatar, AvatarGroup, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { InfoOutlined, People } from "@mui/icons-material";
// import { useRouter } from "next/router";

// Define a consistent size for all Avatars
const avatarSize = 30;

// Create a custom styled AvatarGroup for consistent sizing
const CustomAvatarGroup = styled(AvatarGroup)(({ theme }) => ({
  "& .MuiAvatar-root": {
    width: avatarSize,
    height: avatarSize,
    fontSize: theme.typography.pxToRem(12), // Adjust font size for the "+N" indicator
  },
}));

const Home = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { communityId, postId } = router.query;
  const communityData = useSelector(selectAllCommunities);
  const [selectedCommunity, setSelectedCommunity] = useState(communityId);
  const posts = useSelector(selectCommunityPosts);
  const sessions = useSelector(selectCommunitySessions);
  const [success, setSuccess] = useState(false);
  const [parentPost, setParentPost] = useState();
  const [openImageModal, setOpenImageModal] = useState(false);
  const user = useSelector(selectUser);
  // const router = useRouter();

  useEffect(() => {
    if (communityId) {
      dispatch(setCommunitySessions(communityId));
    }
  }, [communityId, success, dispatch]);

  useEffect(() => {
    if (communityId) {
      dispatch(setCommunityPosts(communityId));
    }
  }, [communityId, success, dispatch]);

  useEffect(() => {
    setSelectedCommunity(communityId);
  }, [communityId]);

  console.log(selectedCommunity);

  useEffect(() => {
    if (communityId && communityData) {
      const data = communityData.filter(
        (data) => data.id === parseInt(communityId)
      );
      setSelectedCommunity(data && data[0]);
    }
  }, [communityId, communityData]);

  const avatars = selectedCommunity?.users || [];

  return (
    <AdminLayout
      headContent={
        <Head>
          <title>ScholarHouse || Community</title>
          <meta name="description" content="Learn your choice" />
          <meta property="og:image" content="/meta-image.png" />
        </Head>
      }
    >
      <div className="flex h-[90vh] overflow-hidden">
        <CommunitySidebar />
        <SubCommunitySidebar />
        <div className="w-[80%] pb-2 flex flex-col gap-1  px-4 py-3  overflow-hidden">
          <div className="bg-[url('/backdrop.png')] px-4 py-6 flex rounded-md items-end min-h-[140px] w-[100%]">
            <div className="flex gap-2 items-center">
              <Avatar
                src={selectedCommunity?.bannerImg}
                alt={"community"}
                sx={{ width: 70, height: 70 }}
              />
              <div>
                <h2 className="text-[24px] font-semibold">
                  {selectedCommunity?.title}
                </h2>
                <p className="text-[12px] text-gray-700">Community</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-between py-2">
            <div className="md:w-[70%]">
              <div className="">
                <h1 className="text-[24px] font-semibold pb-2">
                  {selectedCommunity?.welcomeMsg}
                </h1>
                <div className="flex gap-2 items-center">
                  <CustomAvatarGroup max={5}>
                    {avatars.map((user, index) => (
                      <Avatar
                        key={index}
                        alt={user?.name || "user"}
                        src={user?.photoURL}
                        className={"ring-[.3px] ring-gray-100"}
                        sx={{ width: avatarSize, height: avatarSize }}
                      />
                    ))}
                  </CustomAvatarGroup>
                  <span>people joined.</span>
                </div>
              </div>
              <div className="flex flex-col gap-4 h-[95%] py-4 overflow-y-auto px-4 ">
                <div className="pt-4">
                  <SessionsList sessions={sessions} />
                </div>
                <div className="flex flex-col gap-3">
                  <h1 className="pt-3 text-xl text-semibold">Resources</h1>
                  <div className="">
                    {selectedCommunity?.resource?.length > 0 ? (
                      selectedCommunity?.resource?.map((res, index) => (
                        <div
                          className={
                            "w-[250px] p-3 rounded-md ring-[1px] ring-gray-200"
                          }
                          key={index}
                        >
                          <h6>{res.name}</h6>
                          <a
                            href={res.link}
                            target="_blank"
                            className="hover:text-blue-500"
                          >
                            <Typography noWrap>{res.link}</Typography>
                          </a>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-400">No Resources</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 md:w-[30%]">
              <div className="ring-[2px] ring-blue-900 p-4 rounded-md min-w-full min-h-[250px]">
                <div className="text-blue-900 text-xl flex items-center gap-2 pb-4">
                  <InfoOutlined />
                  <h2>About</h2>
                </div>
                <p>{selectedCommunity?.desc}</p>
              </div>
            </div>
          </div>
          {/* <CommunityInbox
            setOpenImageModal={setOpenImageModal}
            openImageModal={openImageModal}
            success={success}
            setSuccess={setSuccess}
            parentPost={parentPost}
            setParentPost={setParentPost}
          /> */}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Home;
