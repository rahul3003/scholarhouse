import Image from "next/image";

export default function Socials() {
  return (
    <section className="w-full">
      <div className="flex flex-col gap-y-[22px]">
        <div>
          <h1 className="text-[22px] font-semibold">Social Profile</h1>
        </div>
        <div className="flex flex-col gap-y-[18px]">
          <div>
            <div className="text-[12px] font-normal">Personal Website</div>
            <div className="border-[1px] border-[#E9EAF0] flex w-full px-[16px] py-[10px] gap-[12px]">
              <div className="flex items-center">
                <Image alt="a" src="/Globe.svg" width={30} height={30} />
              </div>
              <div className="h-[4vh] bg-[#E9EAF0] w-[1px]"></div>
              <div className="flex items-center w-full">
                <input
                  placeholder="Personal website or portfolio url..."
                  type="text"
                  className="w-full focus:outline-0"
                ></input>
              </div>
            </div>
          </div>
          <div className="w-full flex gap-[18px]">
            <div className="w-full">
              <div className="text-[12px] font-normal">Facebook</div>
              <div className="border-[1px] border-[#E9EAF0] flex w-full px-[16px] py-[10px] gap-[12px]">
                <div className="flex items-center">
                  <Image alt="a" src="/fb.svg" width={30} height={30} />
                </div>
                <div className="h-[4vh] bg-[#E9EAF0] w-[1px]"></div>
                <div className="flex items-center w-full">
                  <input
                    placeholder="Facebook URL"
                    type="text"
                    className="w-full focus:outline-0"
                  ></input>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="text-[12px] font-normal">Instagram</div>
              <div className="border-[1px] border-[#E9EAF0] flex w-full px-[16px] py-[10px] gap-[12px]">
                <div className="flex items-center">
                  <Image alt="a" src="/insta.svg" width={30} height={30} />
                </div>
                <div className="h-[4vh] bg-[#E9EAF0] w-[1px]"></div>
                <div className="flex items-center w-full">
                  <input
                    placeholder="Instagram URL"
                    type="text"
                    className="w-full focus:outline-0"
                  ></input>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="text-[12px] font-normal">LinkedIn</div>
              <div className="border-[1px] border-[#E9EAF0] flex w-full px-[16px] py-[10px] gap-[12px]">
                <div className="flex items-center">
                  <Image alt="a" src="/linkedin.svg" width={30} height={30} />
                </div>
                <div className="h-[4vh] bg-[#E9EAF0] w-[1px]"></div>
                <div className="flex items-center w-full">
                  <input
                    placeholder="LinkedIn URL"
                    type="text"
                    className="w-full focus:outline-0"
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex gap-[18px]">
            <div className="w-full">
              <div className="text-[12px] font-normal">Twitter</div>
              <div className="border-[1px] border-[#E9EAF0] flex w-full px-[16px] py-[10px] gap-[12px]">
                <div className="flex items-center">
                  <Image alt="a" src="/twitter.svg" width={30} height={30} />
                </div>
                <div className="h-[4vh] bg-[#E9EAF0] w-[1px]"></div>
                <div className="flex items-center w-full">
                  <input
                    placeholder="Twitter URL"
                    type="text"
                    className="w-full focus:outline-0"
                  ></input>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="text-[12px] font-normal">Google Scholar</div>
              <div className="border-[1px] border-[#E9EAF0] flex w-full px-[16px] py-[10px] gap-[12px]">
                <div className="flex items-center">
                  <Image
                    alt="a"
                    src="/googleScholar.svg"
                    width={30}
                    height={30}
                  />
                </div>
                <div className="h-[4vh] bg-[#E9EAF0] w-[1px]"></div>
                <div className="flex items-center w-full">
                  <input
                    placeholder="Google Scholar URL"
                    type="text"
                    className="w-full focus:outline-0"
                  ></input>
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="text-[12px] font-normal">YouTube</div>
              <div className="border-[1px] border-[#E9EAF0] flex w-full px-[16px] py-[10px] gap-[12px]">
                <div className="flex items-center">
                  <Image alt="a" src="/yt.svg" width={30} height={30} />
                </div>
                <div className="h-[4vh] bg-[#E9EAF0] w-[1px]"></div>
                <div className="flex items-center w-full">
                  <input
                    placeholder="YouTube URL"
                    type="text"
                    className="w-full focus:outline-0"
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
