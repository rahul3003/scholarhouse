"@use client"
import { HeroDiv } from "@/components/CustomizeCollege/HeroDiv/HeroDiv";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/features/userSlice";


export default function CustomizeCollege() {
  const router = useRouter();
  const user = useSelector(selectUser);
  useEffect(() => {
    !user && router.push("/signUp");
  }, [router, user]);

  return (
    <section>
      <HeroDiv userSelected={user} />
    </section>
  );
}
