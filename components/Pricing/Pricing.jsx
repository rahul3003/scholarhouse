import * as React from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CustomCollapsible from "../CustomCollapsible/CustomCollapsible";
import Image from "next/image";

export function Pricing() {
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));
  return (
    <section className="w-[100vw] h-[100vh] flex items-center justify-center gap-[7vw]">
      <div className="flex flex-col gap-y-[26px]">
        <div className="text-[64px] font-bold text-[#181059]">
          Simple Pricing<br></br>For your College
        </div>
        <div className="text-[16px] text-[#8F8BB0] font-normal">
          We have several powerful plans to showcase your business and get
          discovered<br></br>
          as a creative entrepreneurs. Everything you need.
        </div>
        <div>
          {" "}
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>Bill Monthly</Typography>
            <AntSwitch
              defaultChecked
              inputProps={{ "aria-label": "ant design" }}
            />
            <Typography>Bill Annually</Typography>
          </Stack>
        </div>
        <div
          style={{ backgroundImage: "url('/payBg.svg')" }}
          className="bg-white w-[70%] h-[200px] flex flex-col gap-y-[26px] rounded-[20px] py-[24px] px-[24px]"
        >
          <div className="flex gap-[1vw]">
            <Image src="/tick.svg" alt="a" />
            <p className="text-[16px] font-normal">
              Free 1 month trial for new user
            </p>
          </div>
          <div className="flex gap-[1vw]">
            <Image src="/tick.svg" alt="i" />
            <p className="text-[16px] font-normal">
              Free 1 month trial for new user
            </p>
          </div>
          <div className="w-full justify-end flex">
            <button className="bg-[#465FF1] text-[18px] font-bold py-[16px] px-[30px] text-white rounded-[8px]">
              Full Pricing Comparison
            </button>
          </div>
        </div>
      </div>

      <div className="w-[436px] bg-transparent">
        <CustomCollapsible header="Intro">
          <div className="flex flex-col gap-y-[35px]">
            <p className="text-[16px]">
              Pro account gives you freedom with uploading HD videos and can
              also meet all your business.
            </p>
            <div className="flex items-center justify-between">
              <div className="text-[20px] font-normal">
                ₹123/<span className="text-[#7069ab] font-[200]">Month</span>
              </div>
              <button className="bg-[#465FF1] text-[20px] font-bold rounded-[8px] py-[12px] px-[30px]">
                Try 1 month
              </button>
            </div>
          </div>
        </CustomCollapsible>
        <CustomCollapsible header="Base">
          <div className="flex flex-col gap-y-[35px]">
            <p className="text-[16px]">
              Pro account gives you freedom with uploading HD videos and can
              also meet all your business.
            </p>
            <div className="flex items-center justify-between">
              <div className="text-[20px] font-normal">
                ₹123/<span className="text-[#7069ab] font-[200]">Month</span>
              </div>
              <button className="bg-[#465FF1] text-[20px] font-bold rounded-[8px] py-[12px] px-[30px]">
                Try 1 month
              </button>
            </div>
          </div>
        </CustomCollapsible>
        <CustomCollapsible header="Pro">
          <div className="flex flex-col gap-y-[35px]">
            <p className="text-[16px]">
              Pro account gives you freedom with uploading HD videos and can
              also meet all your business.
            </p>
            <div className="flex items-center justify-between">
              <div className="text-[20px] font-normal">
                ₹123/<span className="text-[#7069ab] font-[200]">Month</span>
              </div>
              <button className="bg-[#465FF1] text-[20px] font-bold rounded-[8px] py-[12px] px-[30px]">
                Try 1 month
              </button>
            </div>
          </div>
        </CustomCollapsible>
      </div>
    </section>
  );
}
