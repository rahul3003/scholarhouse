import { LeftDivSignUp } from "@/components/SignUp/LeftDivSignUp/LeftDivSignUp";
import { RightDivSignUp } from "@/components/SignUp/RightDivSignUp/RightDivSignUp";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SignUp() {
  const router = useRouter();

  useEffect(() => {
    router.push("/signup");
  }, []);

  return (
    <section className="w-[100vw] h-[100vh] py-[32px] px-[32px] flex">
      <LeftDivSignUp />
      <RightDivSignUp />
    </section>
  );
}
