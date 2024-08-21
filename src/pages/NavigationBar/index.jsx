import React, { useEffect, useState } from "react";
import NavigationBar from "../../components/Home/NavigationBar";
import { Outlet, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import appDB from "../../FirebaseConfig/FireBaseDBConnection";
import NotVarified from "../../components/Home/HomeComeponents/NotVarified";

function NavigationSideBar() {
  const auth = getAuth(appDB);
  const [isverified, setIsVarified] = useState({
    email: "",
    name: "",
    emailVerified: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      }
      setIsVarified({
        ...isverified,
        email: user.reloadUserInfo.email,
        name: user.reloadUserInfo.displayName,
        emailVerified: user.reloadUserInfo.emailVerified,
      });
    });
  }, []);

  console.log(isverified);

  return (
    <>
      <div className="px-8 py-9 h-screen flex gap-4 ">
        {isverified.emailVerified ? (
          <>
            <NavigationBar />
            <Outlet />
          </>
        ) : (
          <NotVarified info={isverified} />
        )}
      </div>
    </>
  );
}

export default NavigationSideBar;
