import React from "react";
import RegisterRight from "../../components/Register/RegisterRight";
import { LoginImg } from "../../Utils/Constant.js";
import LoginLeft from "../../components/Login/LoginLeft.jsx";

function Login() {
  return (
    <div className="flex font-nunito h-screen">
      <LoginLeft />
      <RegisterRight Img={LoginImg} />
    </div>
  );
}

export default Login;
