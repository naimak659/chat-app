import React from "react";
import notFoundImg from "../../assets/404-or-NotVarified/404-computer.svg";
import { BiLeftArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
function NotFound404() {
  return (
    <>
      <div className="bg-white ">
        <div className="container flex justify-center items-center min-h-screen px-36 gap-32 py-12 mx-auto">
          <div>
            <p className="text-sm font-medium text-warning ">404 Error</p>
            <h1 className="mt-3 font-semibold text-cs-gray/85 text-3xl">
              We can’t find that page
            </h1>
            <p className="mt-4 text-cs-gray/55">
              Sorry, we couldn't find the page you're looking for.
            </p>

            <div className="flex items-center justify-start mt-6 gap-x-3">
              <button className="w-1/2 px-5 text-center py-2 text-sm text-white transition-colors duration-200 bg-cs-purple rounded-lg  active:bg-cs-purple/80 shadow-xl">
                <Link
                  to={"/"}
                  className="flex items-center justify-center gap-2"
                >
                  <span className="animate-scale">
                    <BiLeftArrow />
                  </span>
                  <span>Go Home</span>
                </Link>
              </button>
            </div>
          </div>
          <div>
            <picture>
              <img src={notFoundImg} alt="" />
            </picture>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound404;
