import Image from "next/image";
import { useState } from "react";

// import { Button } from "@/components/ui/button";
export function Resources({ resource_name, ifAttach, createdDate, id }) {
  return (
    <section>
      <div className="border-[1px] border-[#465FF1] border-opacity-40 py-[20px] px-[20px] rounded-[8px] flex flex-col gap-y-[24px]">
        <div className="text-[19px] font-medium">{resource_name}</div>
        <div className="flex items-center justify-between">
          {/* <Button variant="secondary">Secondary</Button> */}
          <div className="flex items-center">
            <div>
              <button>
                <Image alt="a" width={30} height={30} src="/attachment.svg" />
              </button>
            </div>
            <div className="text-[12px] font-light text-[#7C7C7C]">
              Created on {createdDate}
            </div>
          </div>
          <div className="flex gap-[12px] items-center">
            <div>
              <button>
                <Image
                  alt="a"
                  width={30}
                  height={30}
                  src="/editResources.svg"
                />
              </button>
            </div>
            <div>
              <button>
                <Image
                  alt="a"
                  width={30}
                  height={30}
                  src="/deleteResources.svg"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
