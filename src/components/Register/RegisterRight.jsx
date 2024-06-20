import React from "react";


function RegisterRight({Img}) {
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
