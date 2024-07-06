import VideoConference from "@/components/100ms";
import { selectUser } from "@/store/features/userSlice";
import api from "@/utils/apiSetup";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Room() {
  const [res, setres] = useState();
  const user = useSelector(selectUser);

  const router = useRouter();
  const roomId = router.query.id;

  const expertId = router.query.expertId;

  useLayoutEffect(() => {
    const check = async () => {
      console.log('roomid---', roomId)
      const { data } = await api.post(
        `/order/verifyOrderOwership/${expertId ? expertId : user?.id}`,
        {
          roomId: roomId,
          isExpert: expertId ? true : false,
        }
      );

      if (!data.isOwner) {
        toast.error('Not owner')
        return router.push(`/dashboard`);
      } else {
        setres(data);
      }
    };

    (expertId || user) && check();
  }, [roomId, expertId]);

  return (
    <div>
      {res !== undefined && (
        <HMSRoomProvider >
        <VideoConference
          userId={parseInt(user?.id)}
          userName={user?.name}
          roomId={roomId}
          role={res?.role}
          Catchup={null}
        />
         </HMSRoomProvider>
      )}
    </div>
  );
}

export default Room;
