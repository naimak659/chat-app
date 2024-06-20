import React, { useState } from "react";
import RegisterInput from "./RegisterInput";
import { emailValidation } from "../../Utils/validation";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import appDB from "../../FirebaseConfig/FireBaseDBConnection";
import { toast, Bounce } from "react-toastify";
import { HashLoader } from "react-spinners";

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
          toast(`${fullname} Registration Done`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
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

export default RegisterLeft;
