import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/Home/NavigationBar";
import { Outlet } from "react-router-dom";
import HomeRight from "../../components/Home/HomeRight/HomeRight";

function Home() {
  return (
    <>
      <HomeRight />
    </>
  );
}

export default Home;
