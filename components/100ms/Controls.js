import React, { useState, useCallback } from "react";
import {
  useHMSActions,
  useHMSStore,
  selectPeers,
  selectLocalPeer,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  selectPermissions,
  selectIsLocalScreenShared,
  selectPeerMetadata,
} from "@100mslive/react-sdk";

import { BiVideoOff, BiVideo } from "react-icons/bi";
import { AiOutlineAudio, AiOutlineAudioMuted } from "react-icons/ai";
import { IoExitOutline } from "react-icons/io5";
// import { FiMessageSquare } from "react-icons/fi"
import { MdOutlineScreenShare, MdOutlineStopScreenShare } from "react-icons/md";
// import {TbHandOff, TbHandStop} from "react-icons/tb"
// import {HiOutlineHandRaised} from "react-icons/hi"
import { BiMessageRoundedDots, BiMessageRoundedX } from "react-icons/bi";
import { HiHand, HiOutlineHand } from "react-icons/hi";
import { BsFillRecord2Fill } from "react-icons/bs";
import axios from "axios";
import { useRouter } from "next/router";
import { setMeetDetails, selectMeetDetails } from "@/store/features/userSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectCatchUp, setCommunityCatchup, setLeaveCatchup } from "@/store/features/communitySlice";

function Controls({ switches, visible, setVisible, isAudio ,Catchup,userId}) {
  const hmsActions = useHMSActions();
  const dispatch = useDispatch();
  const router = useRouter();
  const localPeer = useHMSStore(selectLocalPeer);
  const stage = localPeer?.roleName === "stage";
  const peers = useHMSStore(selectPeers);
  const isLocalAudioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const isLocalVideoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const isLocalScreenShared = useHMSStore(selectIsLocalScreenShared);

  const [handRaised, setHandRaised] = useState(false);

  const [toggler, setToggler] = useState(false);

  const catchup = useSelector(selectCatchUp)
  // console.log(localPeer)
  // const localPeerId = useHMSStore(localPeer?.id);
  const metaData = useHMSStore(selectPeerMetadata(localPeer?.id));

  // console.log(metaData)
  const toggleRaiseHand = useCallback(async () => {
    setHandRaised(!handRaised);
    const newMetadata = { ...metaData, isHandRaised: !metaData.isHandRaised };
    await hmsActions.changeMetadata(newMetadata);
  }, [hmsActions, metaData]);

  const SwitchAudio = async () => {
    //toggle audio enabled
    await hmsActions.setLocalAudioEnabled(!isLocalAudioEnabled);
  };
  const ScreenShare = async () => {
    //toggle screenshare enabled
    await hmsActions.setScreenShareEnabled(!isLocalScreenShared);
  };
  const SwitchVideo = async () => {
    //toggle video enableds
    await hmsActions.setLocalVideoEnabled(!isLocalVideoEnabled);
  };

  const ExitRoom = () => {
    hmsActions.leave();
    dispatch(setMeetDetails({}));
    toast.success("Meeting left");
    router.back();
    //exit a room
  };

  const permissions = useHMSStore(selectPermissions);

  console.log(permissions);

  const endRoom = async () => {
    //end the meeting
    try {
      const lock = false; // A value of true disallow rejoins
      const reason = "Meeting is over";
      await hmsActions.endRoom(lock, reason);
      router.push("/");
    } catch (error) {
      // Permission denied or not connected to room
      console.error(error);
    }
  };

  const ExitCatchup = ()=>{
    hmsActions.leave();
    console.log(catchup);
    dispatch(setCommunityCatchup({}));
    console.log(catchup.owner);
    console.log(userId);
    dispatch(setLeaveCatchup({roomId:Catchup.roomId,comId : Catchup.comId,userId:userId}))
    
    toast.success("Meeting left");
    router.back();
  }
  console.log("localpeer is ", localPeer);

  return (
    <div className="h-full w-full flex flex-wrap justify-center items-center mx-auto float-right text-white font-semibold">
      <div className="flex flex-row gap-2 md:gap-10 flex-wrap">
        {/* {(localPeer?.roleName !== "listener") && (<button
          className={`uppercase px-5 py-2 rounded-lg ${isLocalVideoEnabled ? "bg-slate-600" : "bg-slate-400"}`}
          onClick={StartRecording}
        >
          <BsFillRecord2Fill />
        </button>)} */}

        {!isAudio && (
          <button
            className={`uppercase px-5 py-2 rounded-lg ${
              isLocalVideoEnabled ? "bg-slate-600" : "bg-slate-400"
            }`}
            onClick={SwitchVideo}
          >
            {isLocalVideoEnabled ? <BiVideo /> : <BiVideoOff />}
          </button>
        )}

        {localPeer?.roleName !== "listener" && (
          <button
            className={`uppercase px-5 py-2 rounded-lg ${
              isLocalAudioEnabled ? "bg-slate-600" : "bg-slate-400"
            }`}
            onClick={SwitchAudio}
          >
            {isLocalAudioEnabled ? <AiOutlineAudio /> : <AiOutlineAudioMuted />}
          </button>
        )}

        {!isAudio && localPeer?.roleName !== "guest" && (
          <button
            className={`uppercase px-5 py-2 rounded-lg ${
              isLocalScreenShared ? "bg-slate-600" : "bg-slate-400"
            }`}
            onClick={ScreenShare}
          >
            {isLocalScreenShared ? (
              <MdOutlineStopScreenShare />
            ) : (
              <MdOutlineScreenShare />
            )}
          </button>
        )}

        <button
          onClick={toggleRaiseHand}
          className={`uppercase px-5 py-2 rounded-lg ${
            handRaised ? "bg-slate-600" : "bg-slate-400"
          }`}
        >
          {metaData.isHandRaised ? <HiHand /> : <HiOutlineHand />}
        </button>

        <button
          onClick={() => setVisible(!visible)}
          className={`uppercase px-5 py-2 rounded-lg ${
            visible ? "bg-slate-600" : "bg-slate-400"
          }`}
        >
          {visible ? <BiMessageRoundedX /> : <BiMessageRoundedDots />}
        </button>

        {stage ? (
          <>
            {/* <button
            className=" uppercase px-5 py-2 hover:bg-blue-600"
            onClick={ScreenShare}
          >
            Screen Share
          </button> */}
            {permissions.endRoom ? (
              <button
                className=" uppercase px-5 py-2 bg-red-400"
                onClick={endRoom}
              >
                <IoExitOutline />
              </button>
            ) : null}
          </>
        ) : (
          <>
            <button
              className=" uppercase px-5 py-2 bg-red-400 rounded-xl text-2xl"
              onClick={Catchup!=null?ExitCatchup:ExitRoom}
            >
              <IoExitOutline />
            </button>
          </>
        )}
        {/* <button
          className={`uppercase px-5 py-2 rounded-lg ${toggle ? "bg-slate-600" : "bg-slate-400"}`}
          onClick={() => {
            setToggle(!toggle)
          }}
        >
          {toggle ? <MdWindow /> : <FiMessageSquare />}
        </button> */}
      </div>
    </div>
  );
}

export default Controls;
