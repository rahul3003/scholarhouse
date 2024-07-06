import { Pricing } from "@/components/Pricing/Pricing";

export default function pricing() {
  return (
    <section
      style={{
        backgroundImage: "url('/payMainBg.svg')",
        backgroundSize: "fit",
      }}
      className="w-[100vw] h-[100vh] bg-[#F6F5FA]"
    >
      <Pricing />
    </section>
  );
}
