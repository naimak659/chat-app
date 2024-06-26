import React from "react";
import RegisterRight from "../../components/Register/RegisterRight";
import RegisterLeft from "../../components/Register/RegisterLeft";

import Img from "../../assets/register/register.png";

function Register() {
  return (
    <>
      <div className="flex font-nunito h-screen">
        <RegisterLeft />
        <RegisterRight Img={Img} />
      </div>
    </>
  );
}

export default Register;
