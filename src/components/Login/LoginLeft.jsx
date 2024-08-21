import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { emailValidation } from "../../Utils/validation";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { ErrorToast, SuccesfullToast } from "../../Utils/toast";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  equalTo,
  get,
  getDatabase,
  orderByChild,
  push,
  query,
  ref,
  set,
} from "firebase/database";
import { GetTimeNow } from "../../Utils/moment";
import appDB from "../../FirebaseConfig/FireBaseDBConnection";

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
  const [isUserExist, setIsUserExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(appDB);
  const db = getDatabase();

  // todo: handle the input chage and set the state
  const handleOnChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.id]: e.target.value,
    });
  };
  const provider = new GoogleAuthProvider();

  const showPassword = (e) => {
    e.preventDefault();
    setEyeOpen((eye) => !eye);
  };

  // todo: prevent the defult behevior of form.
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!userInfo.email) {
      setErr({
        ...err,
        emailError: "Email required",
      });
    } else if (emailValidation(userInfo.email)) {
      setErr({
        ...err,
        emailError: "Email is not valid",
      });
    } else if (!userInfo.password) {
      setErr({
        ...err,
        passwordError: "Password required",
      });
    } else {
      setErr({
        emailError: "",
        passwordError: "",
      });
      setLoading(true);
      signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then((userCredential) => {
          const user = userCredential.user;
          SuccesfullToast("logged in");
        })
        .then(() => {
          navigate("/");
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
          setErr({
            emailError: "",
            passwordError: "",
          });
        });
    }
  };

  const handleGoogleLogin = () => {
    // e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          SuccesfullToast("Logged in with Google");
          return user;
        })
        .then(async (user) => {
          console.log(user.reloadUserInfo);

          const { email } = user?.reloadUserInfo;

          console.log(email);

          const existeduser = query(
            ref(db, "users/"),
            orderByChild("email"),
            equalTo(email)
          );

          const snapShot = await get(existeduser);

          if (snapShot.exists()) {
            setIsUserExist(Object.values(snapShot?.val())[0]?.email == email);
            return;
          }

          if (!isUserExist) {
            console.log(isUserExist);

            const { photoUrl, localId, email, displayName } =
              user.reloadUserInfo;

            const usersRef = ref(db, "users");
            set(push(usersRef), {
              uid: localId,
              username: displayName,
              userProfilePic: photoUrl,
              email: email,
              createdAt: GetTimeNow(),
            });
          }
        })
        .then((user) => {
          navigate("/");
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error;
          ErrorToast(errorCode);
          console.log(error.message);
        });
    } catch (error) {
      console.log(error);
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

          <div className="flex mb-5" onClick={() => handleGoogleLogin()}>
            <button className="px-4 py-2 border flex items-center gap-2 border-slate-200  rounded-lg text-slate-700  hover:border-slate-400 hover:text-slate-900  hover:shadow transition duration-150">
              <span>
                <FcGoogle />
              </span>
              <span>Login with Google</span>
            </button>
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
                  autoComplete="username"
                />
                <p className="text-warning font-medium text-sm mt-1 font-openSans">
                  {err.emailError}
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
                    placeholder="...."
                    autoComplete="current-password"
                  />
                  <button
                    className="text-2xl text-cs-gray/50 absolute right-3 top-1/2 -translate-y-1/2"
                    onClick={(e) => showPassword(e)}
                  >
                    {eyeOpen ? <LuEyeOff /> : <LuEye />}
                  </button>
                </div>

                <p className="text-warning font-medium text-sm mt-1 font-openSans">
                  {err.passwordError}
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
