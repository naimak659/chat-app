import React from "react";
import RegisterRight from "../../components/Register/RegisterRight";
import RegisterLeft from "../../components/Register/RegisterLeft";

function Register() {
  return (
    <>
      <div className="flex font-nunito h-screen">
        <RegisterLeft />
        <RegisterRight />
      </div>
    </>
  );
}

export default Register;
