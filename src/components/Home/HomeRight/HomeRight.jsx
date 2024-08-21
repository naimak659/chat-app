import React from "react";
import Search from "../HomeComeponents/Search";
import Group from "../HomeComeponents/GroupList/Group";
import UserList from "../HomeComeponents/UserList/index.jsx";
import FriendReq from "../HomeComeponents/FriendReq/FriendReq.jsx";

function HomeRight() {
  return (
    <div className="grid grid-cols-3 gap-6 w-full">
      <div className="flex flex-col gap-2">
        <Search />
        {/* <Group /> */}
        <UserList />
        <FriendReq />
      </div>
      {/* <div className="flex flex-col gap-2">
        <Group />
        <Group />
      </div> */}
    </div>
  );
}

export default HomeRight;
