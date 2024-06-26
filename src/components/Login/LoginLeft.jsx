import React, { useState } from "react";

import { HashLoader } from "react-spinners";
import { emailValidation } from "../../Utils/validation";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ErrorToast, SuccesfullToast } from "../../Utils/toast";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link } from "react-router-dom";

function LoginLeft() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [eyeOpen, setEyeOpen] = useState(false);
  // error handling using object state
  const [err, setErr] = useState({
    emailError: "",
    passwordError: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  // todo: handle the input chage and set the state
  const handleOnChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.id]: e.target.value,
    });
  };

  const showPassword = (e) => {
    e.preventDefault();
    setEyeOpen((eye) => !eye);
  };

  // todo: prevent the defult behevior of form.
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Email required");
    } else if (emailValidation(email)) {
      setEmailError("Email is not valid");
    } else if (!password) {
      setEmailError("");
      setPasswordError("Password required");
    } else {
      setPasswordError("");
      setLoading(true);
      signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then((userCredential) => {
          const user = userCredential.user;
          SuccesfullToast("logged in");
          console.log(user);
        })
        .catch((err) => {
          const errorCode = err.code;
          const errorMessage = err.message;
          ErrorToast(errorCode);
          console.log(errorCode);
          console.log(errorMessage);
          ErrorToast(errorMessage);
        })
        .finally(() => {
          setLoading(false);
          setEmailError("");
          setPasswordError("");
        });
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
            <div class="flex mb-5">
              <button class="px-4 py-2 border flex gap-2 border-slate-200  rounded-lg text-slate-700  hover:border-slate-400 hover:text-slate-900  hover:shadow transition duration-150">
                <img
                  class="w-6 h-6"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                />
                <span>Login with Google</span>
              </button>
            </div>
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
                <div className="relative">
                  <input
                    className="py-3 focus-within:outline-none border-b-[1px] border-cs-gray/20 w-[368px] px-1 font-semibold text-xl text-cs-blue placeholder:text-cs-blue/50"
                    type={eyeOpen ? "text" : "password"}
                    id="password"
                    onChange={handleOnChange}
                    placeholder="YourAddress@email.com"
                  />
                  <button
                    className="text-2xl text-cs-gray/50 absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={(e) => showPassword(e)}
                  >
                    {eyeOpen ? <LuEyeOff /> : <LuEye />}
                  </button>
                </div>

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

              <Link
                to="/registration"
                className="text-cs-deepBlue font-openSans "
              >
                Don’t have an account ?{"  "}
                <span className="text-warning font-bold  text-center cursor-pointer">
                  Sign up
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginLeft;
