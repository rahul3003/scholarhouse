import { Success } from "@/components/Success/Success";
import { selectUser } from "@/store/features/userSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function SuccessOnBoard() {
  const router = useRouter();
  const user = useSelector(selectUser);
  useEffect(() => {
    !user && router.push("/signUp");
  }, [router, user]);
  return <Success user={user} />;
}
