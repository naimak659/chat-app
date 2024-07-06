import React from "react";
import NavigationBar from "../../components/Home/NavigationBar";
import HomeRight from "../../components/Home/HomeRight/HomeRight";

function Home() {
  return (
    <div className="px-8 py-9 h-screen flex gap-4">
      <NavigationBar />
      <HomeRight />
    </div>
  );
}

export default Home;
