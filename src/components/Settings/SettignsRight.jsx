import React, { useState } from "react";
import { FaKey } from "react-icons/fa";
import { PiCircleHalfFill } from "react-icons/pi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import EditSettings from "./SettignsComponents/EditSettings";
import { DB } from "../../FirebaseConfig/FireBaseDBConnection";
import { getAuth, updatePassword } from "firebase/auth";
import { ErrorToast, InfoToast, SuccesfullToast } from "../../Utils/toast";

function SettignsRight() {
  const auth = getAuth();
  const [isVisiable, setIsVisiable] = useState({ password: false });
  const [isEdit, setIsEdit] = useState({ password: false });
  const [user, setUser] = useState({ password: "" });

  const handlePassword = () => {
    if (!isEdit.password) {
      InfoToast("you can change your password");
      return;
    }
    updatePassword(auth.currentUser, user.password)
      .then(() => {
        SuccesfullToast("Password Updated");
        setIsEdit({ ...isEdit, password: false });
        setIsVisiable({ ...isVisiable, password: false });
        setUser({ ...user, password: "" });
      })
      .catch((err) => {
        console.log(err);
        ErrorToast(`${err.code}`);
      });
  };

  return (
    <>
      <div className="">
        <div className="py-7 px-7 shadow-md rounded-xl h-full">
          <h4>Account settings</h4>
          <div className="px-14 flex flex-col gap-4 mt-9">
            <div>
              <EditSettings
                icon={<FaKey />}
                text={"Change Password ."}
                func={() => {
                  setIsVisiable({
                    ...isVisiable,
                    password: !isVisiable.password,
                  });
                }}
              />
              <div
                className={`flex gap-3 items-center ${
                  isVisiable.password ? "block" : "hidden"
                }`}
              >
                <input
                  className={`ml-14 px-2 py-1 active:ring-1 active:ring-cs-purple/90 my-3 rounded-md border-2 border-cs-purple w-[50%]
                  `}
                  type="text"
                  placeholder={"Change Your Password"}
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                    setIsEdit({ ...isEdit, password: true });
                  }}
                />
                <button
                  className="bg-cs-purple text-white px-4 py-1 h-fit rounded-lg"
                  onClick={handlePassword}
                >
                  update
                </button>
              </div>
            </div>
            <EditSettings
              icon={<PiCircleHalfFill />}
              text={"Edit Profile Status Info."}
            />
            <EditSettings
              icon={<RiDeleteBin5Fill />}
              text={"Edit Profile Photo."}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SettignsRight;
