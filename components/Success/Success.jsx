import Image from "next/image";
import Link from "next/link";

export function Success({ user }) {
  return (
    <section className="w-[100vw] h-[100vh] bg-gradient-to-r from-[#4660f1ac] to-[#4660f15e] flex justify-center items-center py-[32px] px-[32px]">
      <div className="bg-white h-full w-full rounded-[20px] flex flex-col items-center py-[40px] ">
        <div className="w-full flex flex-col justify-center items-center gap-y-[10vh]">
          <div>
            <Image src="/shblack.svg" alt="image" width={300} height={500}/>
          </div>
          <div className="w-full flex flex-col items-center">
            <div>
              <Image src="/success.svg" alt="image" width={100} height={100}/>{" "}
            </div>
            <div>
              <div className="text-[32px] font-medium text-black text-center">
                Account created successfully!
              </div>
              <div className="text-[24px] font-regular  text-[#9C9AA5] text-center">
                Welcome aboard!{" "}
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center mt-[48px]">
            <Link
              href={
                user.unifiedUserId.adminId != null
                  ? "/admin/overview"
                  : user.unifiedUserId.userId !== null
                  ? "/users/overview"
                  : "/faculty/overview"
              }
            >
              <button
                type="submit"
                className="text-[16px] font-bold bg-[#465FF1] py-[15px] px-[70px] rounded-[8px] text-white"
              >
                Let`&apos;`s Start!
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
