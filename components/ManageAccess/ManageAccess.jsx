import React, { useEffect, useState } from "react";
import AdminLayout from "@/components/layout/AdminLayout";
import Head from "next/head";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { BsSearch } from "react-icons/bs";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/router";
import api from "@/utils/apiSetup";
import * as XLSX from "xlsx";
import Papa from "papaparse";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function ManageAccess() {
  const [image, setImage] = useState(null);
  const router = useRouter();
  const [age, setAge] = useState("");
  const [open, setOpen] = useState(false);
  const [bulkFile, setBulkfile] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadDone, setUploadDone] = useState(true);
  const [jsonData, setJsonData] = useState(null);
  const [data, setData] = useState([]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size < 100 * 1024) {
      setImage(URL.createObjectURL(file));
    } else {
      alert("File size should be less than 100KB");
    }
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setUploadProgress(0);
    setUploadDone(false);
    setJsonData(null);
  };

  const handleDownloadClick = () => {
    const sampleData = [
      ["Name", "Age", "Email"],
      ["John Doe", 28, "john.doe@example.com"],
      ["Jane Smith", 34, "jane.smith@example.com"],
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      sampleData.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sample.csv");
    document.body.appendChild(link);
    link.click();
  };

  const convertFileToJson = (file) => {
    console.log(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;

      if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
        // Handle XLSX file
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        setJsonData(json);
        console.log("Converted JSON Data:", json);
      } else if (file.name.endsWith(".csv")) {
        // Handle CSV file
        Papa.parse(data, {
          header: true,
          complete: (result) => {
            setJsonData(result.data);
            console.log("Converted JSON Data:", result.data);
          },
        });
      }
    };

    if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
      reader.readAsBinaryString(file);
    } else if (file.name.endsWith(".csv")) {
      reader.readAsText(file);
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".xlsx,.xls";
    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        convertFileToJson(file);
        setBulkfile(file);
        console.log("File uploaded:", file.name);
      }
    };
    fileInput.click();
  };

  const simulateFileUpload = () => {
    setUploadProgress(0);
    setUploadDone(false);
    const totalSteps = 100;
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      setUploadProgress(currentStep);
      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setUploadDone(true);
      }
    }, 50); // Adjust the interval duration as needed
  };

  const handleFinalUpload = async () => {
    const payload = {
      users: jsonData,
    };
    try {
      const res = await api.post("/admin/create/user", payload);
      console.log(res);
      if (res) {
        console.log("Data uploaded successfully");
      }
    } catch (err) {
      console.error("Upload Error:", err);
    }
  };
  const fetchData = async () => {
    try {
      const res = await api.get(`/user`);
      console.log(res.data.user);

      if (res) {
        setData(res.data.users);
      }

      // toast.success("Data fetched successfully", { duration: 2000 });

      const data = res.data;
      console.log(data);
    } catch (err) {
      console.error("Fetch Error:", err);
      // toast.error("Something went wrong! Please try again.");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // const data = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     age: 28,
  //     occupation: "Software Engineer",
  //     status: "Faculty",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     age: 34,
  //     occupation: "Data Scientist",
  //     status: "Faculty",
  //   },
  //   {
  //     id: 3,
  //     name: "Sam Johnson",
  //     age: 22,
  //     occupation: "Product Manager",
  //     status: "Admin",
  //   },
  //   {
  //     id: 4,
  //     name: "Alice Brown",
  //     age: 29,
  //     occupation: "UX Designer",
  //     status: "Admin",
  //   },
  // ];

  return (
    <AdminLayout
      headContent={
        <Head>
          <title>ScholarHouse || Admin Overview</title>
          <meta name="description" content="access your overview" />
          <meta property="og:image" content="/meta-image.png" />
        </Head>
      }
    >
      <div className="flex flex-col md:flex-row gap-3 py-2 pr-[6vw]">
        <div className="p-[2vw] w-full">
          <div>User Management</div>
          <div className="flex gap-[3vw] items-center w-full">
            <div className="w-full">
              <div className="flex justify-center w-full">
                <div className="flex justify-between items-center w-full pt-[20px] z-10">
                  <form className="flex gap-3 items-center w-full rounded-xl p-3 bg-transparent border border-gray-300 text-black">
                    <button type="submit">
                      <BsSearch />
                    </button>
                    <div>
                      <input
                        className="bg-transparent border-none text-black focus:outline-none w-full"
                        type="text"
                        placeholder="Search "
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div>
              <FormControl variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Sort By
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={age}
                  onChange={handleChange}
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <button
                onClick={handleOpen}
                className="text-white bg-blue-600 px-3 py-2 rounded-md whitespace-nowrap"
              >
                Upload In Bulk
              </button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Bulk Upload
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-y-2 mb-[5px]">
                        <h1 className="text-[13px]">
                          Download sample excel template to add your items
                        </h1>
                        <p className="text-[13px] text-[#66686E]">
                          You can add 500 items per sheet
                        </p>
                      </div>
                      <button
                        className="border-b-[1px] border-dashed border-blue-700 text-blue-400 text-[14px] rounded-md"
                        onClick={handleDownloadClick}
                      >
                        Download
                      </button>
                    </div>
                    <div className="w-[440px] border-b-[1px] border-dashed bg-[#BABBC0]"></div>
                    <div className="flex justify-between items-center mt-[5px]">
                      <div className="flex flex-col gap-y-2">
                        <h1 className="text-[13px]">
                          Once items are added, choose that sample excel sheet
                        </h1>
                        <p className="text-[13px] text-[#66686E]">
                          Add images from the desktop app once the items are
                          uploaded.
                        </p>
                      </div>
                      <button
                        className="bg-[#465FF1] bg-opacity-40 text-black text-[15px] px-[5px] py-1 rounded-md"
                        onClick={handleUploadClick}
                      >
                        Choose
                      </button>
                    </div>
                    <div className="mt-4">
                      {uploadProgress > 0 && (
                        <div>Upload Progress: {uploadProgress}%</div>
                      )}
                      {bulkFile && (
                        <button
                          className="bg-[#465FF1] bg-opacity-40 text-black text-[15px] px-[5px] py-1 rounded-md"
                          onClick={handleFinalUpload}
                        >
                          Upload
                        </button>
                      )}
                    </div>
                    {bulkFile.name && <div>Selected File: {bulkFile.name}</div>}
                  </Typography>
                </Box>
              </Modal>
            </div>
          </div>
          <div className="w-full bg-white p-2">List Users</div>
          <div className="overflow-x-auto rounded-lg shadow-md w-full">
            <table className="min-w-full divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th></th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Create
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.map((row) => (
                  <tr key={row.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.age}
                    </td>
                    <td className="whitespace-nowrap text-sm text-gray-500 flex items-center gap-2 border-none pt-[10px]">
                      {/* <button className="whitespace-nowrap text-sm text-gray-500">
                        <Edit />
                      </button>
                      <button>
                        <Trash2 />
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
