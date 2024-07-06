import { selectUser, setUser } from "@/store/features/userSlice";
import api from "@/utils/apiSetup";
import companyData from "@/utils/data";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function HeroDiv({ userSelected }) {
  const [bio, setBio] = useState("");
  const [collegeName, setCollegeName] = useState("");

  const user = useSelector(selectUser);

  const [selectedValue, setSelectedValue] = useState("");
  const [cName, setCName] = useState("");
  const [strength, setStrength] = useState("");
  const [about, setAbout] = useState("");
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const collegeData = {
      name: cName,
      pincode: strength,
      address: about,
    };
    try {
      const res = await api.patch(`/admin/${userSelected.id}`, collegeData);
      if (res.status == 200) {
        const isFromSession = router.query.fromSession;
        isFromSession ? router.back() : router.push("/successOnBoard");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="w-[100vw] h-[100vh] bg-gradient-to-r from-[#4660f1ac] to-[#4660f15e] flex justify-center items-center py-[32px] px-[32px]">
      <div className="bg-white h-full w-full rounded-[20px] flex flex-col items-center py-[40px] overflow-y-scroll">
        <div className="pb-[38px]">
          <Image src="/shblack.svg" width={30} height={30} alt="logo"/>
        </div>

        <div>
          <div className="text-[#26203B] text-[32px] font-medium text-center">
            Customize College
          </div>
          <div className="text-[#9C9AA5] text-[24px] font-[300] text-center">
            Setup your organization for members that may join later.
          </div>
        </div>

        <div className="mt-[30px]">
          <form onSubmit={handleSubmit}>
            <div className=" ">
              <label>
                College Name: <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => setCName(e.target.value)}
                type="text"
                className="w-full h-[48px] rounded-[8px] border-[1px] border-[#D6DBFC] mt-[10px] px-[12px]"
              ></input>
            </div>
            <div className="w-full mt-[12px]">
              <label>
                College Type <span className="text-red-500">*</span>
              </label>
              <div className="mt-[10px]"></div>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedValue}
                  label="Role"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Degree College </MenuItem>
                  <MenuItem value={20}>PU College </MenuItem>
                  <MenuItem value={30}>Engineering College </MenuItem>
                  <MenuItem value={30}>Organization</MenuItem>
                  <MenuItem value={30}>Scholar/Researchers/Scientist</MenuItem>
                  <MenuItem value={30}>Others</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="  mt-[12px]">
              <label>
                About your College<span className="text-red-500">*</span>
              </label>
              <textarea
                onChange={(e) => setAbout(e.target.value)}
                className="w-full h-[108px] rounded-[8px] border-[1px] border-[#D6DBFC] mt-[10px] py-[12px] px-[12px]"
              ></textarea>
            </div>
            <div className="w-full mt-[12px]">
              <label>
                Faculty Strength<span className="text-red-500">*</span>
              </label>
              <div className="mt-[10px]"></div>
              <div className=" ">
                <input
                  onChange={(e) => setStrength(e.target.value)}
                  type="number"
                  className="w-full h-[48px] rounded-[8px] border-[1px] border-[#D6DBFC] mt-[10px] px-[12px]"
                ></input>
              </div>
            </div>
            <div className="w-full flex justify-center mt-[48px]">
              <button
                type="submit"
                className="text-[16px] font-bold bg-[#465FF1] py-[15px] px-[70px] rounded-[8px] text-white"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
