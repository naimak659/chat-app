import React from "react";

function RegisterInput({ placeholder, legend, type }) {
  return (
    <div>
      <fieldset className="border-2 rounded-lg px-8 relative">
        <legend className="px-4 font-semibold text-xs text-cs-blue">
          {legend}
        </legend>
        <input
          className="w-[368px] px-4 py-3 border-none focus-within:border-0 focus-within:outline-none font-semibold text-xl text-cs-blue placeholder:text-cs-blue/50"
          type={type}
          placeholder={placeholder}
        />
      </fieldset>
    </div>
  );
}

export default RegisterInput;
