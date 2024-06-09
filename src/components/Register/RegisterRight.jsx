import React from "react";
import Img from "../../assets/register/register.png";

function RegisterRight() {
  return (
    <>
      <div className="w-[50%]">
        <picture>
          <img src={Img} alt={Img} className="h-screen w-full object-cover" />
        </picture>
      </div>
    </>
  );
}

export default RegisterRight;
