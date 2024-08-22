import React, { useEffect, useState } from "react";
import { IoMdMore } from "react-icons/io";
import userImg from "../../../../assets/ProfilePic/Asset 5.webp";
import { getAuth } from "firebase/auth";
import {
  getDatabase,
  onValue,
  query,
  ref,
  orderByChild,
  equalTo,
  get,
  set,
  push,
  remove,
} from "firebase/database";
import { MdOutlineCancel } from "react-icons/md";
import { IoPersonAddOutline } from "react-icons/io5";
import moment from "moment";
import { GetTimeNow } from "../../../../Utils/moment.js";
import { ErrorToast, SuccesfullToast } from "../../../../Utils/toast.js";
import { FireDb } from "../../../../FirebaseConfig/FireBaseDBConnection.js";
import { addDoc, collection } from "firebase/firestore";
function FriendReq() {
  const auth = getAuth();
  const db = getDatabase();
  const [friendReqList, setFriendReqList] = useState([]);

  useEffect(() => {
    const friendReqQuery = query(
      ref(db, "friendreq/"),
      orderByChild("receiver_uid"),
      equalTo(auth.currentUser.uid)
    );
    onValue(friendReqQuery, (snapShot) => {
      let friendReqList = [];
      snapShot.forEach((item) => {
        const fetchUserQuery = query(
          ref(db, "users/"),
          orderByChild("uid"),
          equalTo(item.val().sender_uid)
        );
        get(fetchUserQuery).then((snapShot) => {
          snapShot.forEach((user) => {
            friendReqList.push({
              ...user.val(),
              reqKey: item.key,
              sentItAt: item.val().createdAt,
              receiver_uid: item.val().receiver_uid,
              sender_uid: item.val().sender_uid,
            });
          });
        });
      });
      setFriendReqList(friendReqList);
    });
  }, []);

  const handleAddFriendDB = (data) => {
    const uid1 = data.sender_uid;
    const uid2 = data.receiver_uid;
    // const friendshipKey = uid1 < uid2 ? `${uid1}_${uid2}` : `${uid2}_${uid1}`;
    const friendDbRef1 = ref(db, `friend/${uid1}_${uid2}`);
    const friendDbRef2 = ref(db, `friend/${uid2}_${uid1}`);

    set(friendDbRef1, { uid1, uid2, createdAt: GetTimeNow() })
      .then(() =>
        set(friendDbRef2, { uid1: uid2, uid2: uid1, createdAt: GetTimeNow() })
      )
      .then(() => {
        remove(ref(db, `friendreq/${data.reqKey}`));
        SuccesfullToast(`${data.name} is added to your friend list`);
      })
      .catch((err) => {
        console.log(err);
        ErrorToast("something is wrong");
      });
  };

  function handleCancleFriendReq(data) {
    remove(ref(db, `friendreq/${data.reqKey}`))
      .then(() => {
        SuccesfullToast("request cancled");
      })
      .catch((err) => {
        console.log(err);
        ErrorToast("something is wrong");
      });
  }

  return (
    <div className="shadow-lg py-4 px-5 rounded-lg 2xl:w-full  scrollbar-thumb-cs-purple/80 scrollbar-track-cs-purple/40 scrollbar-thumb-r font-poppins max-h-[87%]">
      <div className="flex justify-between mb-4">
        <p className="text-xl font-semibold relative">
          <span>Friend Request</span>
          <span className="absolute -top-1 -right-[16px] flex h-4 w-4">
            <span className="animate-ping animate-infinite animate-duration-1000 animate-ease-in-out absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500 text-xs text-white justify-center items-center ">
              {friendReqList.length}
            </span>
          </span>
        </p>
        <button
          className="text-white z-50 bg-cs-purple p-1"
          onClick={() => {
            fireStoneCheck();
          }}
        >
          fireStore
        </button>
        <IoMdMore className="text-xl text-cs-purple" />
      </div>
      <div className="overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-thin max-h-[312px] px-2 ">
        {friendReqList.map((item, i) => {
          return (
            <div key={i}>
              <div className="flex  mb-3 justify-between items-center">
                <div className="flex items-center gap-4 rounded-full">
                  <picture>
                    <img
                      src={item.userProfilePic ? item.userProfilePic : userImg}
                      alt={
                        item?.userProfilePic ? item?.userProfilePic : userImg
                      }
                      className="w-16 rounded-full"
                    />
                  </picture>
                  <div className="flex flex-col w-full">
                    <h3 className="text-lg font-semibold font-poppins xl:text-sm truncate w-[80%]">
                      {item?.username}
                    </h3>
                    <p className="text-sm text-[#4D4D4D]/75 font-medium font-poppins xl:text-xs w-full">
                      {moment(item?.sentItAt).fromNow()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-cs-purple 2xl:px-5 2xl:py-2 rounded-xl text-white 2xl:text-lg font-semibold font-poppins text-sm px-3 py-1"
                    onClick={() => {
                      handleAddFriendDB(item);
                    }}
                  >
                    <IoPersonAddOutline />
                  </button>
                  <button
                    onClick={() => {
                      handleCancleFriendReq(item);
                    }}
                    className="bg-cs-purple 2xl:px-5 2xl:py-2 rounded-xl text-white 2xl:text-lg font-semibold font-poppins text-sm px-3 py-1"
                  >
                    <MdOutlineCancel />
                  </button>
                </div>
              </div>
              <hr className="mb-2" key={i + 20} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FriendReq;
