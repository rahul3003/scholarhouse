"@use client";
import React, { useEffect, useState } from "react";
import { Avatar, Badge, Divider, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Add, Explore } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import {
  setCommunities,
  selectAllCommunities,
} from "@/store/features/communitySlice";
import { selectUser } from "@/store/features/userSlice";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    padding: "0 4px",
    fontSize: "0.75rem",
    border: `2px solid ${theme.palette.background.paper}`,
  },
}));

const CommunitySidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { communityId } = router.query;
  const user = useSelector(selectUser);
  const communityData = useSelector(selectAllCommunities);
  const [selectedIndex, setSelectedIndex] = useState(parseInt(communityId));
  console.log(communityData);

  useEffect(() => {
    if (user) {
      dispatch(setCommunities());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (typeof communityId === "string" && !isNaN(parseInt(communityId))) {
      setSelectedIndex(parseInt(communityId));
    }
  }, [communityId]);
  const [yourCommunity, setYourCommunity] = useState([]);
  const [recommendedCommunity, setRecommendedCommunity] = useState([]);

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
    <div className="w-[82px] flex flex-col items-center  py-2 bg-gray-100 dark:bg-gray-950">
      <div className="h-[90%] w-full overflow-hidden  hover:overflow-y-auto px-2">
        {yourCommunity?.map((community, index) => (
          <Tooltip
            title={`${community.title}`}
            placement="right"
            arrow
            key={index}
          >
            <Link href={`/communities/home?communityId=${community.id}`}>
              <div
                className={`relative flex justify-center items-center my-2 ${
                  community.id === selectedIndex ? "opacity-100" : "opacity-70"
                }`}
              >
                {community.id === selectedIndex && (
                  <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 h-[35px] w-[4px] bg-blue-900 dark:bg-white rounded-r-md" />
                )}
                <StyledBadge
                  badgeContent={
                    0 > 999
                      ? `${Math.floor(0 / 1000)}k+`
                      : community.notifications
                  }
                  color="error"
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Avatar
                    src={community?.bannerImg}
                    alt={`Community ${index + 1}`}
                    sx={{ width: 50, height: 50 }}
                    className="cursor-pointer ring-[1px] ring-gray-600"
                  />
                </StyledBadge>
              </div>
            </Link>
          </Tooltip>
        ))}
      </div>
      <Divider />
      <Link href="/communities/explore">
        <div
          className={`relative flex justify-center items-center mt-2 ${
            router.route?.includes("/explore") ? "opacity-100" : "opacity-75"
          }`}
        >
          {router.route?.includes("/explore") && (
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 h-[35px] w-[4px] bg-blue-900 rounded-r-md" />
          )}
          <Tooltip title="Explore Community" placement="right" arrow>
            <Avatar
              sx={{ width: 50, height: 50 }}
              className="cursor-pointer bg-white text-white my-2 ring-[1px] ring-gray-500"
            >
              <Explore className="text-black " />
            </Avatar>
          </Tooltip>
        </div>
      </Link>
      <Divider />
      <Link href="/communities/create">
        <div
          className={`relative flex justify-center items-center mb-2 ${
            router.route?.includes("/create") ? "opacity-100" : "opacity-75"
          }`}
        >
          {router.route?.includes("/create") && (
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 h-[35px] w-[4px] bg-blue-900 rounded-r-md" />
          )}
          <Tooltip title="Add Community" placement="right" arrow>
            <Avatar
              sx={{ width: 50, height: 50 }}
              className="cursor-pointer bg-white text-white mb-2 ring-[1px] ring-gray-500"
            >
              <Add className="text-black " />
            </Avatar>
          </Tooltip>
        </div>
      </Link>
    </div>
  );
};

export default CommunitySidebar;
