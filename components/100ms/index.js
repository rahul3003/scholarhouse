import React, { useEffect, useState } from "react";
import Controls from "@/components/100ms/Controls";
import {
  useHMSActions,
  useHMSNotifications,
  useHMSStore,
  selectHMSMessages,
  selectIsSomeoneScreenSharing,
  selectLocalPeer,
  selectPeers,
  HMSNotificationTypes,
} from "@100mslive/react-sdk";
import { useRouter } from "next/router";
import axios from "axios";
import SidebarWrapper from "../../components/sideBarWrapper";
import Messages from "@/components/100ms/Messages";
import VideoSpaces from "@/components/100ms/VideoSpaces";
import ScreenShare from "@/components/100ms/ScreenShare";
import {
  HiOutlineArrowSmLeft,
  HiOutlineArrowSmRight,
} from "react-icons/hi";
import api from "@/utils/apiSetup";

function VideoConference({ userId, userName, roomId, type = "av", role, Catchup }) {
  const localPeer = useHMSStore(selectLocalPeer);
  const peers = useHMSStore(selectPeers);
  const hmsActions = useHMSActions();
  const notification = useHMSNotifications();
  const allMessages = useHMSStore(selectHMSMessages);
  const isSomeoneScreenSharing = useHMSStore(selectIsSomeoneScreenSharing);

  const [inputValues, setInputValues] = useState("");
  const [visible, setVisible] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [sideMenu, setSideMenu] = useState("chat");
  const [pinned, setPinned] = useState({
    status: false,
    peer: null,
  });
  const [isAudio, setIsAudio] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await api.post(
          `https://prod-in2.100ms.live/hmsapi/aluminaries.app.100ms.live/api/token`,
          {
            user_id: userId.toString(),
            role: role,
            room_id: roomId,
          }
        );
        const token = res.data.token;
        hmsActions.join({
          userName: userName,
          authToken: token,
          settings: {
            isAudioMuted: true,
          },
        });
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, [userId, userName, roomId, role, hmsActions, router]);

  useEffect(() => {
    if (visible === true) {
      setItemsPerPage(4);
    } else {
      if (peers.length > 1) {
        setCurrentPage(0);
        setItemsPerPage(6);
      } else {
        setCurrentPage(0);
      }
    }
  }, [visible, peers]);

  const pages = Math.ceil(peers?.length / itemsPerPage);

  useEffect(() => {
    if (!notification) return;

    switch (notification.type) {
      // Handle different notification types
    }
  }, [notification]);

  useEffect(() => {
    // Load state from localStorage on component mount
    const savedState = localStorage.getItem('videoConferenceState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setVisible(parsedState.visible);
        setCurrentPage(parsedState.currentPage);
        setItemsPerPage(parsedState.itemsPerPage);
        setSideMenu(parsedState.sideMenu);
        setIsAudio(parsedState.isAudio);
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save state to localStorage whenever state variables change
    localStorage.setItem('videoConferenceState', JSON.stringify({
      visible,
      currentPage,
      itemsPerPage,
      sideMenu,
      isAudio,
    }));
  }, [visible, currentPage, itemsPerPage, sideMenu, isAudio]);

  const updateGridTemplate = () => {
    let template = "";
    let participants = peers?.length;
    if (participants === 1) {
      template = "1fr";
    } else if (participants === 2) {
      template = "1fr 1fr";
    } else {
      template = "repeat(auto-fit, minmax(300px, 1fr))";
    }

    return template;
  };

  const handleInputChange = (e) => {
    setInputValues(e.target.value);
  };

  const sendMessage = () => {
    hmsActions.sendBroadcastMessage(inputValues);
    setInputValues("");
  };

  const setVisibility = (dat) => {
    setVisible(dat);
  };

  const handlePrevClick = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="max-h-screen justify-center">
      <main className="grid md:grid-cols-9 w-full h-full">
        <SidebarWrapper
          className="block md:hidden"
          open={visible}
          setOpen={setVisible}
          show={false}
        >
          <Messages
            sideMenu={sideMenu}
            setSideMenu={setSideMenu}
            allMessages={allMessages}
          />
        </SidebarWrapper>
        <div
          className={`relative h-[100vh] ${
            visible ? "md:col-span-7" : "md:col-span-full"
          }`}
        >
          <div className="h-full overflow-auto flex bg-slate-600 commScroll">
            {isSomeoneScreenSharing ? (
              <div
                className={`flex flex-wrap gap-x-10 p-5 justify-center commScroll items-center mx-auto h-full ${
                  visible ? "w-[75vw]" : "w-[80vw]"
                } rounded-2xl`}
              >
                {peers &&
                  peers.map((peer) => (
                    <ScreenShare key={peer.id} isLocal={false} peer={peer} />
                  ))}
              </div>
            ) : (
              !pinned?.status && (
                <div className="w-full relative">
                  <div
                    className={`flex flex-wrap gap-x-10 p-5 justify-center mx-auto overflow-auto`}
                    style={{ gridTemplateColumns: updateGridTemplate() }}
                  >
                    {peers &&
                      peers
                        .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
                        .map((peer) => (
                          <div key={peer.id} className="relative">
                            <VideoSpaces
                              isLocal={false}
                              peer={peer}
                              setPinned={setPinned}
                              pinned={pinned}
                            />
                          </div>
                        ))}
                  </div>
                </div>
              )
            )}
          </div>

          <div className="absolute flex flex-col w-full mx-auto justify-center bottom-0">
            {!pinned?.status && !isSomeoneScreenSharing && pages > 1 && (
              <div className="flex justify-around w-full mb-2">
                <div
                  className={`bg-gray-300 rounded-full my-auto text-gray-800 font-bold text-3xl ${
                    currentPage > 0 ? "cursor-pointer" : "cursor-not-allowed"
                  }`}
                  onClick={handlePrevClick}
                  disabled={currentPage > 0 ? false : true}
                >
                  <HiOutlineArrowSmLeft />
                </div>
                <div className="flex mt-4 my-auto">
                  {Array.from({ length: pages }).map((_, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={`w-3 h-3 mr-2 cursor-pointer rounded-full ${
                        index === currentPage ? "bg-white" : "bg-gray-500"
                      }`}
                    />
                  ))}
                </div>
                <button
                  className={`bg-gray-300 text-gray-800 font-bold rounded-full text-3xl ${
                    currentPage + 1 === pages ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  onClick={handleNextClick}
                  disabled={currentPage + 1 === pages ? true : false}
                >
                  <HiOutlineArrowSmRight />
                </button>
              </div>
            )}

            <div className="bg-slate-900 w-[90%] mx-auto md:rounded-lg min-h-2/5 p-2 my-3">
              <Controls
                type={type}
                switches={setVisibility}
                visible={visible}
                setVisible={setVisible}
                isAudio={isAudio}
                Catchup={Catchup}
                userId={userId}
              />
            </div>
          </div>
        </div>

        <div
          className={`md:col-span-2 max-h-screen bg-slate-700 duration-300 transition-all ease-in-out
                    ${visible ? "hidden md:block" : "hidden"}
                `}
        >
          <Messages
            sideMenu={sideMenu}
            setSideMenu={setSideMenu}
            allMessages={allMessages}
          />
        </div>
      </main>
    </div>
  );
}

export default VideoConference;

