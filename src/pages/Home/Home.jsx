import React from "react";
import NavigationBar from "../../components/Home/NavigationBar";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div className="px-8 py-9 h-screen flex gap-4 ">
      <NavigationBar />
      <Outlet />
    </div>
  );
}

export default Home;
