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
  push,
  query,
  ref,
  remove,
  set,
} from "firebase/database";
import moment from "moment";
import { CiSquareMore } from "react-icons/ci";
import { ErrorToast, SuccesfullToast } from "../../../../Utils/toast";
import { GetTimeNow } from "../../../../Utils/moment";

function Friend() {
  const auth = getAuth();
  const db = getDatabase();
  const [friendList, setFriendList] = useState([]);
  const [activePopupIndex, setActivePopupIndex] = useState(null);

  const handleUnfriend = (data) => {
    const uid1 = data.uid1;
    const uid2 = data.uid2;

    remove(ref(db, `friend/${uid1}_${uid2}`))
      .then(() => {
        remove(ref(db, `friend/${uid2}_${uid1}`));
      })
      .then(() => {
        SuccesfullToast("unfriend successfully 🧐!");
      })
      .catch((err) => {
        console.log(err);
        ErrorToast("something is wrong");
      });
  };

  const handleBlock = (data) => {
    const uid1 = data.uid1;
    const uid2 = data.uid2;
    const blockDbRef1 = ref(db, `block/${uid1}_${uid2}`);
    const blockDbRef2 = ref(db, `block/${uid2}_${uid1}`);

    set(blockDbRef1, { uid1, uid2, createdAt: GetTimeNow() })
      .then(() => {
        set(blockDbRef2, { uid1: uid2, uid2: uid1, createdAt: GetTimeNow() });
      })
      .then(() => {
        remove(ref(db, `friend/${uid1}_${uid2}`))
          .then(() => {
            remove(ref(db, `friend/${uid2}_${uid1}`));
          })
          .then(() => {
            SuccesfullToast("blocked successfully 🧐!");
          })
          .catch((err) => {
            console.log(err);
            ErrorToast("something is wrong");
          });
      })
      .catch((err) => {
        console.log(err);
        ErrorToast("something is wrong when block user 🤷‍♂️");
      });
  };

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
              ...friendList,
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
                {friendList.length}
              </span>
            </span>
          </p>
          <IoMdMore className="text-xl text-cs-purple" />
        </div>
        <div className="overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-thin max-h-[312px] px-2 py-2">
          {friendList.map((item, i) => {
            return (
              <div key={i}>
                <div className="flex mb-3 justify-between items-center">
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
                  <div className="relative ">
                    <button
                      className="text-cs-purple cursor-pointer font-bold 2xl:text-3xl font-poppins text-sm "
                      onClick={() =>
                        setActivePopupIndex(activePopupIndex === i ? null : i)
                      }
                    >
                      <CiSquareMore />
                    </button>
                    <div
                      className={`bg-white shadow-xl rounded-xl absolute duration-300 ${
                        activePopupIndex === i
                          ? "-top-5 right-8 scale-100"
                          : "scale-0  -top-6 -right-9"
                      }`}
                    >
                      <div
                        className=" hover:bg-cs-purple hover:text-white w-full px-3 py-2 rounded-tl-xl rounded-tr-xl duration-200"
                        onClick={() => handleUnfriend(item)}
                      >
                        Unfriend
                      </div>
                      <hr />
                      <div
                        className=" hover:bg-cs-purple hover:text-white w-full px-3 py-2 rounded-bl-xl rounded-br-xl duration-200"
                        onClick={() => handleBlock(item)}
                      >
                        Block
                      </div>
                    </div>
                  </div>
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
