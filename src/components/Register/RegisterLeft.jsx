import React, { useState } from "react";
import RegisterInput from "./RegisterInput";
import { emailValidation } from "../../Utils/validation";
import { SuccesfullToast, ErrorToast, InfoToast } from "../../Utils/toast";
import { getDatabase, push, ref, set } from "firebase/database";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import appDB from "../../FirebaseConfig/FireBaseDBConnection";

import { HashLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { GetTimeNow } from "../../Utils/moment";

function RegisterLeft() {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [eyeOpen, setEyeOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Error handling
  const [emailError, setEmailError] = useState("");
  const [fullnameError, setFullnameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // fire base sign up
  const auth = getAuth(appDB);
  const db = getDatabase();
  const navigate = useNavigate();

  // handling input's on change
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleName = (e) => {
    setFullname(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  // show password
  const showPassword = (e) => {
    e.preventDefault();
    setEyeOpen((eye) => !eye);
  };

  // handle on submit of form
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setEmailError("Email required");
    } else if (!emailValidation(email)) {
      setEmailError("Email is not valid");
    } else if (!fullname || fullname.length < 2 || fullname.length > 20) {
      setEmailError("");
      setFullnameError("Fullname should be more than 2 or under 20 letters");
    } else if (!password) {
      setFullnameError("");
      setPasswordError("Password required");
    } else if (password.length <= 8) {
      setPasswordError("password should be greater than 8 letter");
    } else {
      setPasswordError("");
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
          SuccesfullToast(`${fullname} Registration done!`);
        })
        .then(() => {
          sendEmailVerification(auth.currentUser)
            .then(() => {
              InfoToast("Check your email");
            })
            .then(() => {
              updateProfile(auth.currentUser, {
                displayName: fullname,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .then(() => {
          const usersRef = ref(db, `users/${fullname}`);
          set(usersRef, {
            uid: auth.currentUser.uid,
            username: fullname,
            userProfilePic: "",
            email: auth.currentUser.email,
            createdAt: GetTimeNow(),
          })
            .then(() => {
              console.log("Your data saved");
              SuccesfullToast("Your data saved");
              navigate("/login");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          const error = err.message || err;
          const regex = /auth\/(.*?)(?=\))/;
          const match = error.match(regex);
          const extractedError = match ? match[1] : "null";
          ErrorToast(extractedError.replace(/-/g, " "));
        })
        .finally(() => {
          setLoading(false);
          setFullname("");
          setEmail("");
          setPassword("");
        });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-[60%] h-full ">
        <div>
          <div className="pb-10">
            <h3 className="font-bold text-4xl text-cs-blue">
              Get started with easily register
            </h3>
            <p className="font-normal text-xl text-cs-gray/50 pt-3">
              Free register and you can enjoy it
            </p>
          </div>

          <form action="">
            <div className="flex flex-col gap-12">
              <RegisterInput
                inputData={email}
                placeholder={"Ladushing691@gmail.com"}
                legend={"Email Address"}
                type={"email"}
                isPassword={false}
                handleOnChange={handleEmail}
                errorMsg={emailError}
              />
              <RegisterInput
                placeholder={"Ladushing GTG"}
                inputData={fullname}
                legend={"Fullname"}
                type={"text"}
                isPassword={false}
                handleOnChange={handleName}
                errorMsg={fullnameError}
              />
              <RegisterInput
                placeholder={".........."}
                inputData={password}
                legend={"Password"}
                type={"password"}
                handleOnChange={handlePassword}
                autoComplete={"on"}
                errorMsg={passwordError}
                isPassword={true}
                showPassword={eyeOpen}
                handleShowPassword={showPassword}
              />
            </div>
            <div className="mt-12 flex flex-col items-center gap-8">
              <button
                onClick={handleOnSubmit}
                type="submit"
                className="text-center w-full bg-cs-purple py-5 text-white font-semibold text-xl rounded-full hover:bg-[#390FCD] flex items-center justify-center"
              >
                {loading ? <HashLoader color="#fff" size={36} /> : "Sign Up"}
              </button>

              <Link to="/login" className="text-cs-deepBlue font-openSans ">
                Already have an account ?{"  "}
                <span className="text-warning font-bold  text-center cursor-pointer">
                  Sign In
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterLeft;
