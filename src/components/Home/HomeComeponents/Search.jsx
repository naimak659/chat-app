import React from "react";
import { IoIosSearch, IoMdMore } from "react-icons/io";

function Search() {
  return (
    <div className="shadow-md rounded-lg ">
      <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 ">
          <IoIosSearch />
        </div>
        <input
          type="text"
          id=""
          class="block w-full p-4 ps-10 text-sm text-gray-900 border  rounded-lg focus-within:outline-none  "
          placeholder="Search"
        />
        <button class="text-xl absolute end-2.5 bottom-2.5 focus:outline-none font-medium rounded-lg  px-4 py-2 ">
          <IoMdMore />
        </button>
      </div>
    </div>
  );
}

export default Search;
