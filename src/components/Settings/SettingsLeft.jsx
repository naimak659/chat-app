import React, { useEffect, useState } from "react";
import defaultImg from "../../assets/ProfilePic/Asset 2.webp";
import EditSettings from "./SettignsComponents/EditSettings";
import { FaPen } from "react-icons/fa";
import { BiSolidImageAdd, BiSolidMessageRoundedDots } from "react-icons/bi";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { getAuth, updateProfile } from "firebase/auth";
import {
  equalTo,
  getDatabase,
  onValue,
  orderByChild,
  query,
  ref,
  update,
} from "firebase/database";
import { InfoToast, SuccesfullToast } from "../../Utils/toast";
import { UploadButton } from "react-uploader";
import { Uploader } from "uploader"; // Installed by "react-uploader".

function SettingsLeft() {
  const auth = getAuth();
  const db = getDatabase();
  const [isVisiable, setIsVisiable] = useState({
    name: false,
    status: false,
    photo: false,
  });
  const [data, setData] = useState({ name: "", status: "", photo: "" });
  const [isEdit, setIsEdit] = useState({ name: false, status: false });
  const [user, setUser] = useState({ name: "", status: "" });
  const uploader = Uploader({
    apiKey: "free", // Get production API keys from Bytescale
  });
  const options = {
    multi: true,
    editor: {
      images: {
        allowResizeOnMove: true,
        preview: true,
        crop: true,
        cropRatio: 4 / 3,
        cropShape: "circ",
      },
    },
  };

  const handleProfileNameEdit = () => {
    if (!isEdit.name) {
      InfoToast("you can edit your profile name");
      return;
    }

    const profileQuery = ref(db, "users/" + auth.currentUser.uid);
    update(profileQuery, {
      username: user.name,
    })
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: user.name,
        }).then(() => {
          SuccesfullToast("profile name updated successfully");
          setUser({ ...user, name: "" });
          setIsEdit({ ...isEdit, name: false });
          setIsVisiable({ ...isVisiable, name: false });
        });
      })
      .catch((err) => {
        console.log(err);
        ErrorToast(`${err.code}`);
      });
  };

  const handleProfileStatusEdit = () => {
    if (!isEdit.status) {
      InfoToast("you can edit your profile status");
      return;
    }

    const profileQuery = ref(db, "users/" + auth.currentUser.uid);
    update(profileQuery, {
      status: user.status,
    })
      .then(() => {
        SuccesfullToast("profile status updated successfully");
        setUser({ ...user, status: "" });
        setIsEdit({ ...isEdit, status: false });
        setIsVisiable({ ...isVisiable, status: false });
      })
      .catch((err) => {
        console.log(err);
        ErrorToast(`${err.code}`);
      });
  };

  const handleImgUpload = (files) => {
    const profileRef = ref(db, "users/" + auth.currentUser.uid);

    updateProfile(auth.currentUser, {
      photoURL: files[0].fileUrl,
    })
      .then(() => {
        update(profileRef, {
          userProfilePic: files[0].fileUrl,
        })
          .then(() => {
            SuccesfullToast("Profile Update done", "top-left");
          })
          .catch((err) => {
            ErrorToast(`${err.code}`);
          });
      })
      .catch((err) => {
        ErrorToast(`${err.code}`);
      });
  };

  useEffect(() => {
    const profileRef = ref(db, "users/" + auth.currentUser.uid);

    onValue(profileRef, (snapshot) => {
      setData({ ...snapshot.val() });
    });
  }, []);

  return (
    <div className="">
      <div className="py-7 px-7 shadow-md rounded-xl h-full">
        <h4>Profile settings</h4>
        <div className="flex flex-col mt-12 px-4">
          <div className="flex items-center gap-4">
            <picture>
              <img
                className="w-24 h-24 rounded-full"
                src={
                  auth.currentUser.photoURL
                    ? auth.currentUser.photoURL
                    : defaultImg
                }
                alt={defaultImg}
              />
            </picture>
            <div>
              <h3 className="font-semibold text-2xl font-poppins">
                {auth.currentUser.displayName}
              </h3>
              <p className="text-xl font-poppins">{data.status}</p>
            </div>
          </div>
        </div>
        <hr className="my-4 bg-black h-[1.9px] mt-6 mb-11" />
        <div
          className="px-14 flex 
       flex-col gap-4"
        >
          <div>
            <EditSettings
              icon={<FaPen />}
              text={"Edit Profile Name."}
              func={() =>
                setIsVisiable({ ...isVisiable, name: !isVisiable.name })
              }
            />
            <div
              className={`flex gap-3 items-center ${
                isVisiable.name ? "block" : "hidden"
              }`}
            >
              <input
                className={`ml-14 px-2 py-1 active:ring-1 active:ring-cs-purple/90 my-3 rounded-md border-2 border-cs-purple w-[50%]
                  `}
                type="text"
                placeholder={auth.currentUser.displayName}
                onChange={(e) => {
                  setUser({ ...user, name: e.target.value });
                  setIsEdit({ ...isEdit, name: true });
                }}
              />
              <button
                className="bg-cs-purple text-white px-4 py-1 h-fit rounded-lg"
                onClick={handleProfileNameEdit}
              >
                update
              </button>
            </div>
          </div>
          <div>
            <EditSettings
              icon={<BiSolidMessageRoundedDots />}
              text={"Edit Profile Status Info."}
              func={() =>
                setIsVisiable({ ...isVisiable, status: !isVisiable.status })
              }
            />
            <div
              className={`flex gap-3 items-center ${
                isVisiable.status ? "block" : "hidden"
              }`}
            >
              <input
                className={`ml-14 px-2 py-1 active:ring-1 active:ring-cs-purple/90 my-3 rounded-md border-2 border-cs-purple w-[50%]
                  `}
                type="text"
                placeholder={"Update your status info"}
                onChange={(e) => {
                  setUser({ ...user, status: e.target.value });
                  setIsEdit({ ...isEdit, status: true });
                }}
              />
              <button
                className="bg-cs-purple text-white px-4 py-1 h-fit rounded-lg"
                onClick={handleProfileStatusEdit}
              >
                update
              </button>
            </div>
          </div>
          <div>
            <UploadButton
              uploader={uploader}
              options={options}
              onComplete={(files) => handleImgUpload(files)}
            >
              {({ onClick }) => (
                <button onClick={onClick}>
                  <EditSettings
                    icon={<BiSolidImageAdd />}
                    text={"Edit Profile Photo."}
                  />
                </button>
              )}
            </UploadButton>
          </div>
          <EditSettings icon={<FaRegCircleQuestion />} text={"Help."} />
        </div>
      </div>
    </div>
  );
}

export default SettingsLeft;
