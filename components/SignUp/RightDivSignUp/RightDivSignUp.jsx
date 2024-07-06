import { setUser } from "@/store/features/userSlice";
import api from "@/utils/apiSetup";
import companyData from "@/utils/data";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export function RightDivSignUp() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [strength, setStrength] = useState("");
  const [PhNo, setPhNo] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedRoleValue, setSelectedRoleValue] = useState(1);
  const [signIn, setSignIn] = useState("signUp");
  const [loading,setLoading] = useState(false);

  const handleRegister = async (e) => {
    setLoading(true)
    e.preventDefault();
    const roleSelected =
      selectedRoleValue == 1 || selectedRoleValue == 4
        ? "admin"
        : selectedRoleValue == 3 ||
          selectedRoleValue == 5 ||
          selectedRoleValue == 6
        ? "user"
        : selectedRoleValue == 2
        ? "expert"
        : "user";
    console.log(roleSelected);
    const signUpData =
      roleSelected == "admin"
        ? {
            email: email,
            password: password,
            isSuperAdmin: true,
            userType: roleSelected,
            address: "",
            pincode: "",

            phone: PhNo,
            name: "",
          }
        : roleSelected == "expert"
        ? {
            email: email,
            password: password,
            userType: roleSelected,
            address: "",
            pincode: "",

            phone: PhNo,
            name: "",
          }
        : {
            email: email,
            password: password,
            userType: roleSelected,
            address: "",
            pincode: "",
            photoURL: "",
            desc: "",
            phone: PhNo,
            name: "",
          };

    try {
      const res = await api.post(`/auth/signup`, signUpData);

      if (res.data.status === 421) {
        // toast.error(res.data.message);
        return;
      } else if (res.data.status === 422) {
        // toast.error(res.data.message);
        return;
      }
      console.log(array);

      // if(resDetails.data.success)
      // toast.success("Successfully Registered", { duration: 2000 });
      handleLogin();
    } catch (err) {
      // cd toast.error("Something went wrong! Please try again!");
      console.error("Registration Error:", err);
      // toast.error("Something went wrong! Please try again.");
    }
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    const roleSelected =
      selectedRoleValue == 1 || selectedRoleValue == 4
        ? "admin"
        : selectedRoleValue == 3 ||
          selectedRoleValue == 5 ||
          selectedRoleValue == 6
        ? "user"
        : selectedRoleValue == 2
        ? "expert"
        : "user";

    const loginDetails = {
      userType: roleSelected,
      email: email,
      password: password,
    };
    let routeTo =
      roleSelected === "admin"
        ? "/customizeCollege"
        : roleSelected === "expert"
        ? "/profileSetupPage"
        : "/profileSetupPage";
    console.log(roleSelected);

    try {
      const res = await api.post(`/auth/signin`, loginDetails);
      console.log(res);
      dispatch(setUser(res.data.user));
      if (res.data.user.name !== "") {
        routeTo =
          roleSelected === "admin"
            ? "/admin/Home"
            : roleSelected === "expert"
            ? "/faculty/overview"
            : "/users/overview";
      }
      localStorage.setItem(
        companyData.accessToken,
        roleSelected == "user" ? res.data.accessToken : res.data.jwt
      );
      const isFromSession = router.query.fromSession;
      isFromSession ? router.back() : router.push(routeTo);
    } catch (err) {
      // toast.error("Invalid Username or Password");
      setLoading(false)
    }
  };

  const handleClickCreateAccount = () => {
    const signUpData = {
      email: email,
      password: password,
      role:
        selectedRoleValue == 1 || selectedRoleValue == 4
          ? "admin"
          : selectedRoleValue == 3 ||
            selectedRoleValue == 5 ||
            selectedRoleValue == 6
          ? "users"
          : selectedRoleValue == 2
          ? "expert"
          : "users",
    };
    console.log(signUpData);
  };
  const [criteria, setCriteria] = useState({
    length: false,
    numberOrSymbol: false,
    upperAndLower: false,
  });

  const handleChangeRole = (event) => {
    setSelectedRoleValue(event.target.value);
  };

  const evaluateStrength = (password) => {
    const length = password.length >= 8;
    const numberOrSymbol =
      /[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password);
    const upperAndLower = /[A-Z]/.test(password) && /[a-z]/.test(password);

    setCriteria({
      length,
      numberOrSymbol,
      upperAndLower,
    });

    let strength = "Weak";
    const passedCriteria = [length, numberOrSymbol, upperAndLower].filter(
      Boolean
    ).length;

    if (passedCriteria === 3) {
      strength = "Strong";
    } else if (passedCriteria === 2) {
      strength = "Moderate";
    }

    setStrength(strength);
  };

  const handleChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    evaluateStrength(newPassword);
  };
  const handleChangePhNo = (e) => {
    const newPh = e.target.value;
    setPhNo(newPh);
  };

  const handleChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  useEffect(() => {
    console.log(password);
    console.log(email);
    console.log(selectedRoleValue);
  });

  return (
    <section className="w-[64%] flex justify-center items-center">
      <div className="flex flex-col gap-y-[30px]">
        <div>
          <Image src="/shblack.svg" alt="iamge" width={180} height={100} />
        </div>
        <div>
          <div className="h-[] w-full rounded-[8px] justify-between items-center bg-[#ECF0FF] flex py-[4px] px-[4px]">
            <div
              onClick={() => setSignIn("signUp")}
              className={
                signIn == "signUp"
                  ? "transition-all duration-300 cursor-pointer rounded-[8px] bg-[#465FF1] text-[16px] font-medium text-white px-[60px] py-[8px]"
                  : " cursor-pointer rounded-[8px] transition-all duration-300 text-[16px] font-medium text-[#9C9AA5] px-[60px] py-[8px]"
              }
            >
              Sign Up
            </div>
            <div
              onClick={() => setSignIn("signIn")}
              className={
                signIn == "signIn"
                  ? "transition-all duration-300 cursor-pointer rounded-[8px] bg-[#465FF1] text-[16px] font-medium text-white px-[60px] py-[8px]"
                  : " transition-all duration-300 cursor-pointer rounded-[8px]  text-[16px] font-medium text-[#9C9AA5] px-[60px] py-[8px]"
              }
            >
              Sign In
            </div>
          </div>
          <div>
            <div className="w-[357px] flex flex-col gap-y-[10px] pt-[12px]">
              <label className="text-[16px] font-medium text-black">
                Choose Role{" "}
                <span className="text-[16px] font-medium text-[#E45270]">
                  *
                </span>
              </label>
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedRoleValue}
                    label="Role"
                    onChange={handleChangeRole}
                  >
                    <MenuItem value={1}>College </MenuItem>
                    <MenuItem value={2}>Faculty </MenuItem>
                    <MenuItem value={3}>College Student</MenuItem>
                    <MenuItem value={4}>Organization</MenuItem>
                    <MenuItem value={5}>Scholar/Researchers/Scientist</MenuItem>
                    <MenuItem value={6}>Others</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            {signIn !== "signIn" ? (
              <form onSubmit={handleRegister}>
                <div className="flex flex-col gap-y-[30px] pt-[30px]">
                  <div>
                    <div className="text-[#26203B] text-[16px] font-bold pb-[8px]">
                      Email Id
                    </div>
                    <div>
                      <input
                        required
                        onChange={handleChangeEmail}
                        type="email"
                        className="w-full py-[10px] px-[16px] border-[1px] border-[#465FF1] border-opacity-40 hover:shadow-md transition-all duration-300 rounded-[8px]"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="pb-[8px] flex justify-between items-center">
                      <div className="text-[#26203B] text-[16px] font-bold ">
                        {" "}
                        Phone Number:
                      </div>
                    </div>
                    <div>
                      <input
                        required
                        onChange={handleChangePhNo}
                        type="number"
                        className="w-full py-[10px] px-[16px] border-[1px] border-[#465FF1] border-opacity-40 hover:shadow-md transition-all duration-300 rounded-[8px]"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="pb-[8px] flex justify-between items-center">
                      <div className="text-[#26203B] text-[16px] font-bold ">
                        {" "}
                        Password
                      </div>
                    </div>
                    <div>
                      <input
                        required
                        onChange={handleChange}
                        type="password"
                        className="w-full py-[10px] px-[16px] border-[1px] border-[#465FF1] border-opacity-40 hover:shadow-md transition-all duration-300 rounded-[8px]"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-[#465FF1] text-white text-[16px] font-bold py-[14px] flex justify-center rounded-[8px]"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
                <div className="mt-[8px] text-[12px] font-normal">
                  <div
                    className={`flex items-center ${
                      criteria.length ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <span className="mr-2">
                      {criteria.length ? "✔️" : "❌"}
                    </span>
                    At least 8 characters
                  </div>
                  <div
                    className={`flex items-center ${
                      criteria.numberOrSymbol
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <span className="mr-2">
                      {criteria.numberOrSymbol ? "✔️" : "❌"}
                    </span>
                    Contains a number or symbol
                  </div>
                  <div
                    className={`flex items-center ${
                      criteria.upperAndLower ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <span className="mr-2">
                      {criteria.upperAndLower ? "✔️" : "❌"}
                    </span>
                    Uppercase and lowercase combination
                  </div>
                </div>
                <div
                  className={`text-[12px] font-normal mt-[0px] pl-[24px] ${
                    strength === "Weak"
                      ? "text-red-600"
                      : strength === "Moderate"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {`Password strength: ${strength}`}
                </div>
              </form>
            ) : (
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-y-[30px] pt-[30px]">
                  <div>
                    <div className="text-[#26203B] text-[16px] font-bold pb-[8px]">
                      Email Id
                    </div>
                    <div>
                      <input
                        required
                        id="SignIn"
                        name="SignIn"
                        onChange={handleChangeEmail}
                        type="email"
                        className="w-full py-[10px] px-[16px] border-[1px] border-[#465FF1] border-opacity-40 hover:shadow-md transition-all duration-300 rounded-[8px]"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <div className="pb-[8px] flex justify-between items-center">
                      <div className="text-[#26203B] text-[16px] font-bold ">
                        {" "}
                        Password
                      </div>
                      <div className="text-[#9C9AA5] underline text-[12px] font-normal">
                        {" "}
                        Forgot Password?
                      </div>
                    </div>
                    <div>
                      <input
                        required
                        onChange={handleChange}
                        type="password"
                        className="w-full py-[10px] px-[16px] border-[1px] border-[#465FF1] border-opacity-40 hover:shadow-md transition-all duration-300 rounded-[8px]"
                      ></input>
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#465FF1] text-white text-[16px] font-bold py-[14px] flex justify-center rounded-[8px]"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
