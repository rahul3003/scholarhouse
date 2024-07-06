import CommunityInbox from "@/components/community/communityInbox";
import CommunitySidebar from "@/components/community/communitySidebar";
import SubCommunitySidebar from "@/components/community/subCommunitySidebar";
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
  setCommunities,
} from "@/store/features/communitySlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/store/features/userSlice";
import { Avatar, AvatarGroup, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { People } from "@mui/icons-material";
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

const CommunityPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { communityId, postId } = router.query;
  const communityData = useSelector(selectAllCommunities);
  const [selectedCommunity, setSelectedCommunity] = useState(communityId);
  const posts = useSelector(selectCommunityPosts);
  const [success, setSuccess] = useState(false);
  const [parentPost, setParentPost] = useState();
  const [openImageModal, setOpenImageModal] = useState(false);
  const user = useSelector(selectUser);
  // const router = useRouter();

  useEffect(() => {
    dispatch(setCommunities());
  },[dispatch]);

  useEffect(() => {
    if (communityId) {
      dispatch(setCommunityPosts(communityId));
    }
  }, [communityId, success, dispatch]);

  useEffect(() => {
    setSelectedCommunity(communityId);
  }, [communityId]);

  useEffect(() => {
    if (postId && postRefs.current[postId]) {
      postRefs.current[postId].scrollIntoView({ behavior: "smooth" });
    }
  }, [postId, posts]);

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
        <div className="w-[80%] pb-2 flex flex-col gap-1  ">
          <div className="min-h-[40px] px-10 py-4 flex items-center justify-between   w-full border-b-[1px] text-center border-gray-300 text-[18px]">
            <CustomAvatarGroup max={5}>
              {avatars.map((user,index) => (
                <Avatar
                  key={index}
                  alt={user?.name || "user"}
                  src={user?.photoURL || "/static/images/avatar/1.jpg"}
                  sx={{ width: avatarSize, height: avatarSize }}
                />
              ))}
            </CustomAvatarGroup>

            <div>{selectedCommunity?.title}</div>
            <Button>
              <People />
            </Button>
          </div>
          <div className="flex flex-col gap-4 h-[95%] py-4 overflow-y-auto px-4 ">
            {posts?.map((post, key) => (
              <Post
                post={post}
                key={key}
                success={success}
                setSuccess={setSuccess}
                setParentPost={setParentPost}
                setOpenImageModal={setOpenImageModal}
              />
            ))}
          </div>
          <CommunityInbox
            setOpenImageModal={setOpenImageModal}
            openImageModal={openImageModal}
            success={success}
            setSuccess={setSuccess}
            parentPost={parentPost}
            setParentPost={setParentPost}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default CommunityPage;
