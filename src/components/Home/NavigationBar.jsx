import React from "react";
import { GrHomeRounded } from "react-icons/gr";
import { AiOutlineMessage } from "react-icons/ai";
import { ProfileImg1 } from "../../Utils/Constant";
import { FaRegBell } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineLogout } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

function NavigationBar() {
  const location = useLocation();

  return (
    <div className="bg-cs-purple  w-[186px] h-full  py-6 rounded-xl overflow-hidden">
      <div className="flex flex-col items-center gap-20 mb-10 -z-30">
        <div>
          <picture className="">
            <img src={ProfileImg1} alt={ProfileImg1} className="w-24 h-24 " />
          </picture>
        </div>
        <div className="text-white/70  flex flex-col gap-16 ">
          <NavLink to={"/"}>
            <div
              className={`relative  w-full homebar_bg  ${
                location.pathname == "/"
                  ? "homebar_bgAfter text-cs-deepBlue before:shadow-2xl before:shadow-black transition-colors duration-300 "
                  : ""
              }`}
            >
              <GrHomeRounded
                className={`text-[44px] ${
                  location.pathname == "/" ? "animate-tada" : ""
                }`}
              />
            </div>
          </NavLink>
          <NavLink to={"/messages"}>
            <div
              className={`relative homebar_bg   ${
                location.pathname == "/messages"
                  ? "homebar_bgAfter text-cs-deepBlue before:shadow-2xl before:shadow-black transition-colors duration-300"
                  : ""
              } `}
            >
              <AiOutlineMessage
                className={`text-[44px] ${
                  location.pathname == "/messages" ? "animate-tada" : ""
                } `}
              />
            </div>
          </NavLink>
          <NavLink to={"/notification"}>
            <div
              className={`relative homebar_bg   ${
                location.pathname == "/notification"
                  ? "homebar_bgAfter text-cs-deepBlue before:shadow-2xl before:shadow-black transition-colors duration-infinite"
                  : ""
              } `}
            >
              <FaRegBell className="text-[44px] animate-jiggle dur" />
            </div>
          </NavLink>
          <NavLink to={"/settings"}>
            <div
              className={`relative homebar_bg   ${
                location.pathname == "/settings"
                  ? "homebar_bgAfter text-cs-deepBlue before:shadow-2xl before:shadow-black transition-colors duration-300"
                  : ""
              } `}
            >
              <IoSettingsOutline
                className={`text-[44px] ${
                  location.pathname == "/settings" ? "animate-tada" : ""
                } `}
              />
            </div>
          </NavLink>
        </div>

        <div className="mt-24">
          <HiOutlineLogout className="text-[44px] text-white/70" />
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
