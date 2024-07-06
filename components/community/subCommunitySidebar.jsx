import { Chat, ExpandLess, ExpandMore, Poll } from "@mui/icons-material";
import { Collapse, List, ListItem, Tooltip, Typography } from "@mui/material";
import { Folder, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SubCommunitySidebar = () => {
  const [openJB, setOpenJB] = useState(true);
  const [openCommunity, setOpenCommunity] = useState(false);
  const router = useRouter();
  const active = router.pathname?.split("/")[2];
  console.log(active);

  const handleClickCommunity = () => {
    setOpenJB(!openJB);
    setOpenCommunity(!openCommunity);
  };
  return (
    <>
      <div className="hidden md:block md:w-[200px] overflow-hidden overflow-y-auto bg-gray-100 dark:bg-gray-700 border-l-[1px]">
        <div className="my-4 px-4">
          <input
            type="text"
            placeholder="Find or start a conversation"
            className="w-full p-2 border bg-gray-200 text-gray-400 outline-none border-gray-300 rounded"
          />
        </div>
        <ListItem onClick={handleClickCommunity} className="text-[#A2A2A2]">
          {openCommunity ? <ExpandLess /> : <ExpandMore />}
          <Typography
            variant="h6"
            sx={{ fontWeight: 500 }}
            className="text-[15px] m-0 w-[98%] pr-2"
            noWrap
          >
            Activity
          </Typography>{" "}
        </ListItem>
        <Collapse in={openJB} timeout="auto" unmountOnExit className="ml-5">
          <List component="div" disablePadding className="m-0 p-0">
            {["Home", "Discussion", "Polls", "Projects"]?.map((comm, index) => (
              <Link
                key={index}
                href={
                  comm === "Polls"
                    ? `/communities/polls?communityId=${router?.query.communityId}`
                    : comm === "Home"
                    ? `/communities/home?communityId=${router?.query.communityId}`
                    : comm === "Discussion"
                    ? `/communities?communityId=${router?.query.communityId}`
                    : `/communities/projects?communityId=${router?.query.communityId}`
                }
              >
                <ListItem
                  className={`${
                    active === comm.toLowerCase() ? "bg-gray-200" : ""
                  } hover:bg-gray-200 cursor-pointer m-0 p-0`}
                  key={comm}
                >
                  <Tooltip title={comm} arrow>
                    <Typography
                      variant="button"
                      className={` ${
                        active === comm.toLowerCase()
                          ? "text-[#383a3d"
                          : "text-[#A2A2A2]"
                      } text-[14px] w-full px-2 py-1 flex items-center gap-2`}
                      noWrap
                    >
                      {comm === "Polls" ? (
                        <Poll />
                      ) : comm === "Home" ? (
                        <Home />
                      ) : comm === "Projects" ? (
                        <Folder />
                      ) : (
                        <Chat />
                      )}
                      {comm}
                    </Typography>
                  </Tooltip>
                </ListItem>
              </Link>
            ))}
          </List>
        </Collapse>
      </div>
    </>
  );
};

export default SubCommunitySidebar;
