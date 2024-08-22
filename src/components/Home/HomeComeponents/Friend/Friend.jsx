import React, { useEffect, useState } from "react";
import { IoMdMore } from "react-icons/io";
import userImg from "../../../../assets/ProfilePic/Asset 14.webp";
import { getAuth } from "firebase/auth";
import {
  equalTo,
  get,
  getDatabase,
  onValue,
  orderByChild,
  query,
  ref,
} from "firebase/database";
import moment from "moment";

function Friend() {
  const auth = getAuth();
  const db = getDatabase();
  const [friendList, setFriendList] = useState([]);

  useEffect(() => {
    const friendQuery = query(
      ref(db, "friend/"),
      orderByChild("uid1"),
      equalTo(auth.currentUser.uid)
    );

    onValue(friendQuery, (snapShot) => {
      let friendBlankList = [];
      snapShot.forEach((item) => {
        const fetchUserQuery = query(
          ref(db, "users/"),
          orderByChild("uid"),
          equalTo(item.val().uid2)
        );
        get(fetchUserQuery).then((snapShot) => {
          snapShot.forEach((user) => {
            friendBlankList.push({
              ...user.val(),
              friendRefKey: item.key,
              uid1: item.val().uid1,
              uid2: item.val().uid2,
              createdAt: item.val().createdAt,
            });
          });
        });
      });
      setFriendList(friendBlankList);
    });
  }, []);

  return (
    <>
      <div className="shadow-lg py-4 px-5 rounded-lg 2xl:w-full  scrollbar-thumb-cs-purple/80 scrollbar-track-cs-purple/40 scrollbar-thumb-r font-poppins">
        <div className="flex justify-between mb-4">
          <p className="text-xl font-semibold relative">
            <span>Friend</span>
            <span className="absolute -top-1 -right-[16px] flex h-4 w-4">
              <span className="animate-ping animate-infinite animate-duration-1000 animate-ease-in-out absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500 text-xs text-white justify-center items-center ">
                {/* {users.length} */}1
              </span>
            </span>
          </p>
          <IoMdMore className="text-xl text-cs-purple" />
        </div>
        <div className="overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-thin max-h-[312px] px-2 ">
          {friendList.map((item, i) => {
            return (
              <div key={i}>
                <div className="flex  mb-3 justify-between items-center">
                  <div className="flex items-center gap-4 rounded-full">
                    <picture>
                      <img
                        src={
                          item.userProfilePic ? item.userProfilePic : userImg
                        }
                        alt={
                          item.userProfilePic ? item.userProfilePic : userImg
                        }
                        className="w-16 rounded-full"
                      />
                    </picture>
                    <div className="flex flex-col ">
                      <h3 className="text-lg font-semibold font-poppins xl:text-sm ">
                        {item.username}
                      </h3>
                      <p className="text-sm text-[#4D4D4D]/75 font-medium font-poppins xl:text-xs">
                        {moment(item.createdAt).fromNow()}
                      </p>
                    </div>
                  </div>
                  <div></div>
                </div>
                <hr className="mb-2" key={i + 20} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Friend;
