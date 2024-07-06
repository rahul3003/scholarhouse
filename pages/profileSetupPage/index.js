import { ProfileSetup } from "@/components/ProfileSetup/ProfileSetup";
import { selectUser } from "@/store/features/userSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ProfileSetupPage() {
  const router = useRouter();
  const user = useSelector(selectUser);
  useEffect(() => {
    !user && router.push("/signUp");
  }, [router, user]);
  return (
    <section>
      <ProfileSetup userSelect={user} />
    </section>
  );
}
