import React from "react";

function EditSettings({ icon, text, func, data }) {
  return (
    <>
      <div className="flex items-center gap-9" onClick={func}>
        <div className="text-xl">{icon}</div>
        <h4 className="font-poppins text-xl ">{text}</h4>
      </div>
    </>
  );
}

export default EditSettings;
