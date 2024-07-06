import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Achievements } from "../AboutScholarAchievements/Achivements/Achievements";
import { GoogleScholar } from "../AboutScholarAchievements/GoogleScholar/GoogleScholar";
import { Patents } from "../AboutScholarAchievements/Patents/Patents";
import { ResearchPaper } from "../AboutScholarAchievements/ResearchPapers/ResearchPapers";
import Socials from "../AboutScholarAchievements/Socials/Socials";
import { Resources } from "../FacultyResources/Resources/Resources";
// import { toast } from "react-toastify";
import api from "@/utils/apiSetup";
import Image from "next/image";
export function MyProfileDiv({ userSelected }) {
  console.log(userSelected);
  const [data, setData] = React.useState("");
  const [value, setValue] = React.useState("1");
  const resource = [
    {
      id: 1,
      resource_name: "Design Physiology",
      ifAttach: true,
      createdDate: "Nov12, 2023",
    },
    {
      id: 2,
      resource_name: "Logo Design",
      ifAttach: true,
      createdDate: "Nov12, 2023",
    },
    {
      id: 3,
      resource_name: "Typography",
      ifAttach: true,
      createdDate: "Nov12, 2023",
    },
    {
      id: 4,
      resource_name: "Typography",
      ifAttach: true,
      createdDate: "Nov12, 2023",
    },
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    console.log(data);
  });
  const fetchData = async (user) => {
    console.log(user);
    const roleSelect =
      user.unifiedUserId.adminId !== null
        ? "admin"
        : user.unifiedUserId.userId !== null
        ? "user"
        : user.unifiedUserId.expertId !== null
        ? "expert"
        : "partner";
    try {
      const res =
        roleSelect == "user"
          ? await api.get(`/user/${user.id}`)
          : await api.get(`/expert/${user.id}`);
      console.log(res);

      if (res) {
        roleSelect == "user"
          ? setData(res.data.user)
          : setData(res.data.expert);
      }

      // toast.success("Data fetched successfully", { duration: 2000 });

      const data = res.data;
      console.log(data);
    } catch (err) {
      console.error("Fetch Error:", err);
      // toast.error("Something went wrong! Please try again.");
    }
  };
  React.useEffect(() => {
    fetchData(userSelected);
  }, [userSelected]);

  return (
    <section className="w-full min-h-[100vh]">
      <div className="w-full px-[52px]">
        <div className="w-full h-[557px] rounded-[8px] border-[1px] border-[#465FF1] border-opacity-40">
          <div
            style={{ backgroundImage: "url('/profBg.svg')" }}
            className="h-[50%]"
          ></div>

          <div
            style={{
              // backgroundImage: data.photoURL,
              backgroundSize: "contain",
              backgroundColor: "gray",
            }}
            className=" absolute top-[240px] rounded-full w-[24vh] h-[24vh] border-[4px] z-50 border-white"
          >
            <Image
              alt="a"
              className="rounded-full w-full h-full"
              src={data.photoURL}
            />
          </div>
          <div className="h-[50%] flex py-[28px] px-[35px] justify-between">
            <div className="h-full flex flex-col justify-end">
              <div className="font-medium text-[28px]">{data.name}</div>
              <div className="text-[18px] font-normal">{data.address}</div>
              <div className="text-[20px] font-normal">{data.desc}</div>
            </div>
            <div>
              <button className="rounded-[8px] w-fit px-[36px] text-[12px] font-normal text-white bg-black  py-[8px]">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Profile" value="1" />
                <Tab label="Community" value="2" />
                <Tab label="Session" value="3" />
                <Tab label="Resource" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="flex flex-col w-full gap-y-[22px]">
                <GoogleScholar />
                <Achievements />
                <Patents />
                <ResearchPaper />
                <Socials />
              </div>
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
            <TabPanel value="4">
              <div className="grid grid-cols-3 w-full gap-x-[36px] gap-y-[36px]">
                {resource.map((link) => (
                  <Resources
                    key={link.id}
                    resource_name={link.resource_name}
                    id={link.id}
                    createdDate={link.createdDate}
                    ifAttach={link.ifAttach}
                  />
                ))}
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    </section>
  );
}
