import React, { useState } from "react";

import { HashLoader } from "react-spinners";
import { emailValidation } from "../../Utils/validation";

function LoginLeft() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [err, serErr] = useState({
    emailError: "",
    passwordError: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  // todo: handle the input chage and set the state
  const handleOnChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.id]: e.target.value,
    });
    console.log(userInfo);
  };

  // todo: prevent the defult behevior of form.
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setErr({
        ...userInfo,
        [e.target.id]: e.target.value,
      });
      setEmailError("Email required");
    } else if (!emailValidation(email)) {
      setEmailError("Email is not valid");
    } else if (!password) {
      setEmailError("");
      setPasswordError("Password required");
    } else {
      setPasswordError("");
      // setLoading(true);
    }
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center w-[60%] h-full  font-openSans">
        <div>
          <div className="pb-10">
            <h3 className="w-[371.79px] h-[45.01px] text-cs-blue text-[33.34px] font-bold font-openSans">
              Login to your account!
            </h3>
          </div>

          <form action="">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="font-medium text-sm text-cs-blue/55"
                >
                  Email Address
                </label>
                <input
                  className="py-3 focus-within:outline-none border-b-[1px] border-cs-gray/20 w-[368px] px-1 font-semibold text-xl text-cs-blue placeholder:text-cs-blue/50"
                  type="email"
                  id="email"
                  placeholder="YourAddress@email.com"
                  onChange={handleOnChange}
                />
                <p className="text-warning font-medium text-sm mt-1 font-openSans">
                  {emailError}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="font-medium text-sm text-cs-blue/55"
                >
                  Password
                </label>
                <input
                  className="py-3 focus-within:outline-none border-b-[1px] border-cs-gray/20 w-[368px] px-1 font-semibold text-xl text-cs-blue placeholder:text-cs-blue/50"
                  type="password"
                  id="password"
                  onChange={handleOnChange}
                  placeholder="YourAddress@email.com"
                />
                <p className="text-warning font-medium text-sm mt-1 font-openSans">
                  {passwordError}
                </p>
              </div>
            </div>
            <div className="mt-12 flex flex-col items-center gap-8">
              <button
                onClick={handleOnSubmit}
                type="submit"
                className="text-center w-full bg-cs-purple py-5 text-white font-semibold text-xl rounded-full hover:bg-[#390FCD] flex items-center justify-center"
              >
                {loading ? <HashLoader color="#fff" size={36} /> : "Sign Up"}
              </button>

              <p className="text-cs-deepBlue font-openSans ">
                Already have an account ?{"  "}
                <span className="text-warning font-bold  text-center cursor-pointer">
                  Sign In
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginLeft;
