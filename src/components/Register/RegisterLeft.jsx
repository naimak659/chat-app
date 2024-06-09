import React from "react";
import RegisterInput from "./RegisterInput";

function RegisterLeft() {
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

          <div className="flex flex-col gap-12">
            <RegisterInput
              placeholder={"Ladushing691@gmail.com"}
              legend={"Email Address"}
              type={"email"}
            />
            <RegisterInput
              placeholder={"Ladushing GTG"}
              legend={"Ful name"}
              type={"text"}
            />
            <RegisterInput
              placeholder={".........."}
              legend={"Password"}
              type={"password"}
            />
          </div>

          <div className="mt-12 flex flex-col items-center gap-8">
            <button className="text-center w-full bg-cs-purple py-5 text-white font-semibold text-xl rounded-full hover:bg-[#390FCD]">
              Sign up
            </button>
            <p className="text-cs-deepBlue font-openSans ">
              Already have an account ?{"  "}
              <span className="text-warning font-bold  text-center cursor-pointer">
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterLeft;
