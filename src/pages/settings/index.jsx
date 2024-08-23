import React from "react";
import SettingsLeft from "../../components/Settings/SettingsLeft";
import SettingsRight from "../../components/Settings/SettignsRight";
import Search from "../../components/Home/HomeComeponents/Search";

function Settings() {
  return (
    <div className="w-full ">
      <Search />
      <div className="w-full h-[90%] grid grid-cols-2 grid-rows-1 gap-9 mt-6">
        <SettingsLeft />
        <SettingsRight />
      </div>
    </div>
  );
}

export default Settings;
