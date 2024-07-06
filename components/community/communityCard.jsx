import React, { useState } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { useRouter } from "next/router";
import api from "@/utils/apiSetup";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/userSlice";
import { toast } from "react-toastify";
import Image from "next/image";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const CommunityCard = ({ imageUrl, title, members, link, key, id }) => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const [open, setOpen] = useState(false);

  const handleData = (id) => {
    if (link) {
      router.push(link);
    }
  };

  const joinCommunity = (id) => {
    try {
      api
        .post(`/community/${id}/join`, {
          adminId: user.unifiedUserId.adminId,
          userId: user.unifiedUserId.userId,
          expertId: user.unifiedUserId.expertId,
        })
        .then((res) => {
          console.log(res.data);
          toast(`Joined community!`, { type: "success" });
          setOpen(false)
          setTimeout(() => {
            router.push(`/communities/home?communityId=${id}`);
          }, [3000]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      key={key}
      className="relative block min-w-[222px] max-w-[222px] h-[350px] overflow-hidden rounded-xl shadow-md ring-[2px] cursor-pointer ring-gray-300 dark:shadow-gray-800"
      onClick={() => {
        link ? handleData() : setOpen(true);
      }}
    >
      {/* Background img */}
      <Image
        src={imageUrl}
        alt={title}
        className="object-cover w-full h-full"
        width={222}
        height={150}
      />

      {/* New Chip */}
      <span className="absolute top-3 left-4 px-2 py-1 bg-white dark:bg-gray-800 text-xs font-semibold rounded">
        <NewReleasesIcon fontSize="small" className="mr-1" /> New
      </span>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90"></div>

      {/* Content */}
      <div className="absolute bottom-0 w-full p-4 flex flex-col items-center text-white z-10">
        <div className="mb-2 font-semibold leading-[38px] text-[33px] text-center">
          {title}
        </div>
        <div className="flex items-center mt-2 text-sm">
          <PeopleAltIcon fontSize="small" className="mr-1" />
          <span>{members} Members</span>
        </div>
      </div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Join Community</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Would you like to join <b>{title}</b> community?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="error">
            No
          </Button>
          <Button onClick={() => joinCommunity(id)} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CommunityCard;
