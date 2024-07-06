import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export function RightDiv() {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <section className="w-[55%] h-full flex flex-col justify-between items-center">
      <div></div>
      <div className="w-[357px] flex flex-col gap-y-[20px]">
        <label className="text-[16px] font-medium text-black">
          Choose Role{" "}
          <span className="text-[16px] font-medium text-[#E45270]">*</span>
        </label>
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedValue}
              label="Role"
              onChange={handleChange}
            >
              <MenuItem value={10}>College </MenuItem>
              <MenuItem value={20}>Faculty </MenuItem>
              <MenuItem value={30}>College </MenuItem>
              <MenuItem value={30}>Organization</MenuItem>
              <MenuItem value={30}>Scholar/Researchers/Scientist</MenuItem>
              <MenuItem value={30}>Others</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <button className="bg-[#465FF1] text-[16px] font-bold text-white rounded-[8px] w-full py-[14px]">
            Create Account
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center flex-col">
        <div className="text-[#9C9AA5] text-[10px] font-[600]">
          By signing up to create an account I accept Company`&apos;`s
        </div>
        <div className="hover:underline text-[#26203B] text-[10px] font-[600] cursor-pointer">
          Terms of use and privacy Policy
        </div>
      </div>
    </section>
  );
}
