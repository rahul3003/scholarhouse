import Image from "next/image";

export function ResearchPaper({ data = 1 }) {
  return (
    <section className="w-full">
      <div>
        <div className="h-fit  w-full border-[#465FF1] border-[1px] rounded-[8px]    border-opacity-40">
          <div className="w-full  flex justify-between px-[24px] py-[14px] items-center">
            <div className="text-[#4C535F] text-[16px] font-medium">
              Add Research Papers
            </div>
            <div>
              <button className="flex px-[12px] py-[4px] rounded-[8px] items-center justify-center gap-[10px] border-[#B5BFF9] border-[2px]">
                <Image alt="a" src="/plus.svg" width={30} height={30} />
                <div className="text-[#3B32B3] text-[16px] font-bold">Add</div>
              </button>
            </div>
          </div>

          {data ? (
            <>
              <div className="h-[1px] w-full bg-[#EAECF0]"></div>
              <div className="flex justify-between w-full px-[16px] pt-[16px] pb-[40px] ">
                <div className="flex w-[40%] gap-[24px]">
                  <div className="w-[40%]">
                    <Image alt="a" src="/ph.svg" width={30} height={30} />
                  </div>
                  <div>
                    <div className="text-[20px] font-semibold ">
                      Greek Graphic Design and Illustration Awards
                    </div>
                    <div className="text-[15px] text-[#495AFF] font-semibold ">
                      2023
                    </div>
                    <div className="text-[15px] font-regular ">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed dapibus eros eu vehicula interdum. Cras nec ultricies
                      massa. Curabitur rutrum, diam id consequat consequat
                    </div>
                  </div>
                </div>
                <div className="flex gap-[24px] justify-end w-[10%]">
                  <Image
                    alt="a"
                    className="w-[30px]"
                    src="/editStuff.svg"
                    width={30}
                    height={30}
                  />
                  <Image
                    alt="a"
                    className="w-[30px]"
                    src="/remove.svg"
                    width={30}
                    height={30}
                  />
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
}
