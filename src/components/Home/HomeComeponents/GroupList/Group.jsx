import React, { useEffect, useState } from "react";
import { IoMdMore } from "react-icons/io";
import profileImg from "../../../../assets/ProfilePic/Asset 5.webp";

function Group() {
  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const imageImports = [];
      for (let index = 0; index < 17; index++) {
        const img = await import(
          `../../../../assets/ProfilePic/Asset ${index + 2}.webp`
        );
        imageImports.push(img.default);
      }
      setImgs(imageImports);
    };

    loadImages();
  }, []);

  return (
    <div className="shadow-lg py-4 px-5 rounded-lg w-[447px] scrollbar-thumb-cs-purple/80 scrollbar-track-cs-purple/40 scrollbar-thumb-r font-poppins">
      <div className="flex justify-between mb-4">
        <p className="text-xl font-semibold ">Group List</p>
        <IoMdMore className="text-xl text-cs-purple" />
      </div>
      <div className="overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-thin max-h-[312px] px-2 ">
        {imgs.map((item) => {
          return (
            <>
              <div className="flex  mb-3 justify-between items-center">
                <div className="flex items-center gap-4">
                  <picture>
                    <img
                      src={item}
                      // src={profileImg}
                      alt={profileImg}
                      className="w-16"
                    />
                  </picture>
                  <div className="flex flex-col ">
                    <h3 className="text-lg font-semibold font-poppins ">
                      Friends Reunion
                    </h3>
                    <p className="text-sm text-[#4D4D4D]/75 font-medium font-poppins ">
                      Hi Guys, Wassup!
                    </p>
                  </div>
                </div>
                <div>
                  <button className="bg-cs-purple px-5 py-2 rounded-xl text-white text-lg font-semibold font-poppins ">
                    Join
                  </button>
                </div>
              </div>
              <hr  className="mb-2"/>
            </>
          );
        })}
        {/* member */}

        {/* member */}
      </div>
    </div>
  );
}

export default Group;
