import Profile from "@/components/ProfCrop/Profile";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export function ProfileCollege() {
  const [logo, setLogo] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    setLogo({
      url: URL.createObjectURL(file),
      name: file.name,
      file: file,
    });
  };
  //   const handleProceed = async (event) => {
  //     console.log(logo);
  //     event.preventDefault();
  //     const formData = new FormData();
  //     formData.append("name", restaurantName);
  //     formData.append("restaurant_user_id", 2);
  //     formData.append("logo", logo.file); // Ensure 'logo.file' is a File object
  //     formData.append("cover_photo", frontCover.file);
  //     try {
  //       const response = await fetch(
  //         "http://127.0.0.1:8000/restaurant/add_restaurant",
  //         {
  //           method: "POST",
  //           // headers: { "Content-type": "application/json" },
  //           body: formData,
  //         }
  //       );
  //       const result = await response.json();
  //       if (response.ok) {
  //         console.log(response);
  //         setMessage("data added successfully");
  //         setTimeout(() => {
  //           router.push("/V1/CardSelectionPage"); // Redirect to homepage
  //         }, 1000);
  //       } else {
  //         setMessage("Saving Failed " + result.detail);
  //         setLoading(false);
  //       }
  //     } catch {}
  //   };
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const styles = {
    button: {
      //   display: "inline-block",
      //   padding: "10px 20px",
      backgroundColor: "white",
      color: "black",
      border: "1px solid black",
      borderRadius: "8px",
      fontWeight: "medium",
      fontSize: "16px",
      cursor: "pointer",
      textAlign: "center",
    },
  };
  return (
    <section className="w-[100vw] h-[100vh] bg-gradient-to-r from-[#4660f1ac] to-[#4660f15e] flex justify-center items-center py-[32px] px-[32px]">
      <div className="bg-white h-full w-full rounded-[20px] flex flex-col items-center py-[40px] overflow-y-scroll">
        <div className="pb-[38px]">
          <Image src="/shblack.svg" width={30} height={30} alt="img"/>
        </div>
        <div className="pb-[12px]">2/2</div>
        <div>
          <div className="text-[#26203B] text-[32px] font-medium text-center">
            Customize College
          </div>
          <div className="text-[#9C9AA5] text-[24px] font-[300] text-center">
            Setup your organization for members that may join later.
          </div>
        </div>

        <div className="mt-[30px]">
          <form>
            <div className=" ">
              <Profile />

              {/* <div style={{ padding: "20px" }}>
                <input
                  type="file"
                  accept=".jpeg,.jpg,.svg"
                  id="file-upload"
                  style={{ display: "none" }}
                  onChange={handleLogoUpload}
                />
                <label
                  className="text-[16px] font-medium flex items-center gap-[5px] w-fit py-[14px] px-[36px]"
                  htmlFor="file-upload"
                  style={styles.button}
                >
                  <Image src="/Upload.svg"></img>
                  <div>Upload Logo</div>
                </label>
              </div> */}

              <label>
                College Name: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full h-[48px] rounded-[8px] border-[1px] border-[#D6DBFC] mt-[10px]"
              ></input>
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
