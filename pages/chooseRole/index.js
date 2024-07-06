import { LeftDiv } from "@/components/ChooseRole/LeftDiv/LeftDiv";
import { RightDiv } from "@/components/ChooseRole/RightDiv/RightDiv";

export default function chooseRole() {
  return (
    <section className="w-[100vw] h-[100vh] py-[32px] px-[32px] flex">
      <LeftDiv />
      <RightDiv />
    </section>
  );
}
