import React, { useEffect, useState } from "react";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { IoMdMore } from "react-icons/io";
import userImg from "../../../../assets/ProfilePic/Asset 14.webp";
import { getAuth } from "firebase/auth";
import { GetTimeNow } from "../../../../Utils/moment";
import { IoPersonAddOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";

function UserList() {
  const auth = getAuth();
  const db = getDatabase();
  const [users, setusers] = useState([]);
  const [friendReqList, setFriendReqList] = useState([]);

  const handleFriendReq = (user) => {
    // console.log(user);
    const friendReqDbRef = ref(db, "friendreq/");

    // console.log(auth.currentUser);

    set(push(friendReqDbRef), {
      sender_uid: auth.currentUser.uid,
      // sender_userKey: auth.currentUser.userKey,
      sender_email: auth.currentUser.email,
      sender_userProfilePic: auth.currentUser.userProfilePic
        ? auth.currentUser.userProfilePic
        : null,
      receiver_uid: user.uid,
      receiver_email: user.userEmail,
      receiver_userKey: user.userKey,
      receiver_userProfilePic: user.userProfilePic,
      createdAt: GetTimeNow(),
      status: "pending",
    });
  };

  /**
   * todo: handle cancle friend request
   * remove the friend request from data base with the reqKey
   * @param {*} item
   */

  const handleCancleFriendReq = (item) => {
    console.log(item.reqKey);
    const friendReqDbRef = ref(db, "friendreq/" + item.reqKey);
    remove(friendReqDbRef);
  };

  /*
  todo: 
  get all friend request from fireBase
  */
  useEffect(() => {
    const friendReqDBRef = ref(db, "friendreq/");

    onValue(friendReqDBRef, (snapshot) => {
      let userBlankArr = [];
      snapshot.forEach((item) => {
        userBlankArr.push({
          ...item.val(),
          reqKey: item.key,
          friendReqUid: item.val().receiver_uid + item.val().sender_uid,
        });
      });
      setFriendReqList(userBlankArr);
    });
  }, []);

  /**
   * todo: get all users from firebase
   */
  useEffect(() => {
    const userDbRef = ref(db, "users/");
    onValue(userDbRef, (snapshot) => {
      let userBlankArr = [];
      snapshot.forEach((item) => {
        if (item.val().uid !== auth.currentUser.uid) {
          userBlankArr.push({
            ...item.val(),
            userKey: item.key,
          });
        }
      });
      setusers(userBlankArr);
    });
    // console.log(auth.currentUser);
  }, []);
  console.log(friendReqList);

  return (
    <div className="shadow-lg py-4 px-5 rounded-lg 2xl:w-full  scrollbar-thumb-cs-purple/80 scrollbar-track-cs-purple/40 scrollbar-thumb-r font-poppins">
      <div className="flex justify-between mb-4">
        <p className="text-xl font-semibold ">User List</p>
        <IoMdMore className="text-xl text-cs-purple" />
      </div>
      <div className="overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-thin max-h-[312px] px-2 ">
        {users.map((item, i) => {
          return (
            <div key={item.uid + i}>
              <div className="flex  mb-3 justify-between items-center">
                <div className="flex items-center gap-4 rounded-full">
                  <picture>
                    <img
                      src={item.userProfilePic ? item.userProfilePic : userImg}
                      alt={""}
                      className="w-16 rounded-full"
                    />
                  </picture>
                  <div className="flex flex-col ">
                    <h3 className="text-lg font-semibold font-poppins xl:text-sm ">
                      {item.username}
                    </h3>
                    <p className="text-sm text-[#4D4D4D]/75 font-medium font-poppins xl:text-xs">
                      Hi Guys, Wassup!
                    </p>
                  </div>
                </div>
                <div>
                  {/* {friendReqList.map((req) => {
                    return req.receiver_uid === auth.currentUser.uid ? (
                      <button
                        key={req.reqKey}
                        className="bg-cs-purple 2xl:px-5 2xl:py-2 rounded-xl text-white 2xl:text-lg font-semibold font-poppins text-sm px-3 py-1 mr-2"
                      >
                        <IoPersonAddOutline />
                      </button>
                    ) : (
                      ""
                    );
                  })} */}

                  {friendReqList.some(
                    (req) =>
                      req.receiver_uid === item.uid &&
                      req.sender_uid === auth.currentUser.uid
                  ) ? (
                    <button
                      onClick={() =>
                        handleCancleFriendReq(
                          friendReqList.find(
                            (req) =>
                              req.receiver_uid === item.uid &&
                              req.sender_uid === auth.currentUser.uid
                          )
                        )
                      }
                      className="bg-cs-purple 2xl:px-5 2xl:py-2 rounded-xl text-white 2xl:text-lg font-semibold font-poppins text-sm px-3 py-1"
                    >
                      <MdOutlineCancel />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFriendReq(item)}
                      className="bg-cs-purple 2xl:px-5 2xl:py-2 rounded-xl text-white 2xl:text-lg font-semibold font-poppins text-sm px-3 py-1"
                    >
                      <IoPersonAddOutline />
                    </button>
                  )}
                </div>
              </div>
              <hr className="mb-2" key={i + 20} />
            </div>
          );
        })}
        {/* member */}

        {/* member */}
      </div>
    </div>
  );
}

export default UserList;