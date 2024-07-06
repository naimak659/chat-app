import React from "react";
import { GrHomeRounded } from "react-icons/gr";
import { AiOutlineMessage } from "react-icons/ai";
import { ProfileImg1 } from "../../Utils/Constant";
import { FaRegBell } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";

function NavigationBar() {
  return (
    <div className="bg-cs-purple  w-[186px] h-full  py-6 rounded-xl">
      <div className="flex flex-col items-center gap-20 mb-10 -z-30">
        <div>
          <picture>
            <img src={ProfileImg1} alt={ProfileImg1} className="w-24 h-24" />
          </picture>
        </div>
        <div className="text-white/70  flex flex-col gap-24 ">
          <div className="relative text-cs-deepBlue homebar_bg before:shadow-2xl before:shadow-black">
            <GrHomeRounded className="text-[44px] z-10" />
          </div>
          <div>
            <AiOutlineMessage className="text-[44px]" />
          </div>
          <div>
            <FaRegBell className="text-[44px]" />
          </div>
          <div>
            <IoSettingsOutline className="text-[44px]" />
          </div>
        </div>

        <div>
          <HiOutlineLogout className="text-[44px]" />
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
