export function LeftDivSignUp() {
  return (
    <section className="w-[36%] h-full">
      <div
        style={{
          backgroundImage: "url('/leftDivRole.svg')",
          backgroundSize: "fit",
        }}
        className="w-full h-full rounded-[20px] bg-black items-center flex flex-col justify-between py-[60px]"
      >
        <div>
          <div className="text-white text-[36px]  font-extrabold w-full flex justify-center">
            Welcome to Scholar House
          </div>
          <div className="text-white text-[18px] font-medium flex justify-center text-center">
            A Knowledge Sharing Platform <br></br>
            that facilitates collaborative learning & research <br></br>
            content creation and sharing.
          </div>
        </div>
        <div>
          <div className="text-white text-[36px]  font-extrabold w-full flex justify-center">
            Seamless Collaboration
          </div>
          <div className="text-white text-[24px] font-normal flex justify-center text-center">
            Effortlessly work together<br></br> collaborate in real-time.
          </div>
        </div>
      </div>
    </section>
  );
}
