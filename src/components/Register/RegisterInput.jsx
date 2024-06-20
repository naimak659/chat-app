import React from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

function RegisterInput({
  placeholder,
  legend,
  type,
  inputData,
  handleOnChange,
  autoComplete,
  errorMsg,
  isPassword,
  showPassword,
  handleShowPassword,
}) {
  return (
    <div>
      <fieldset
        className="border-2 rounded-lg px-8 relative flex items-center justify-between"
        name={type}
      >
        <legend className="px-4 font-semibold text-xs text-cs-blue">
          {legend}
        </legend>
        <input
          className="w-[368px] px-4 py-3 border-none focus-within:border-0 focus-within:outline-none font-semibold text-xl text-cs-blue placeholder:text-cs-blue/50"
          value={inputData}
          onChange={(e) => {
            handleOnChange(e);
          }}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          name={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        {isPassword && (
          <button
            className="text-2xl text-cs-gray/50"
            onClick={(e) => handleShowPassword(e)}
          >
            {showPassword ? <LuEyeOff /> : <LuEye />}
          </button>
        )}
      </fieldset>
      <p className="text-warning font-medium text-sm mt-1 font-openSans">
        {errorMsg}
      </p>
    </div>
  );
}

export default RegisterInput;
