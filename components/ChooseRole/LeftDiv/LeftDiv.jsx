import Image from "next/image";

export function LeftDiv() {
  return (
    <section className="w-[45%] h-full">
      <div
        style={{
          backgroundImage: "url('/leftDivRole.svg')",
          backgroundSize: "fit",
        }}
        className="w-full h-full rounded-[20px] bg-black pl-[5vw] pr-[10vw] flex flex-col justify-between py-[127px]"
      >
        <div>
          <div className="text-white text-[40px]  font-extrabold">
            Choose Role
          </div>
          <div className="text-[24px] font-normal text-white">
            Select your role to access tailored<br></br> features and resources
            for your<br></br> specific needs and goals.
          </div>
        </div>
        <div>
          <Image alt="a" src="/scholarHouse.svg" width={30} height={30}/>
        </div>
      </div>
    </section>
  );
}
