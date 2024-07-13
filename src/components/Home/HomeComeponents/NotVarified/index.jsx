import React from "react";
import verified from "../../../../assets/404-or-NotVarified/Verified-rafiki.svg";
import { Link } from "react-router-dom";

function NotVarified({ info }) {
  return (
    <>
      <section className="mx-auto">
        <div className="container min-h-screen px-6 py-12 mx-auto flex items-center gap-12">
          <div className="wf-ull lg:w-1/2">
            <p className="text-sm font-medium text-cs-purple ">Not Verified</p>
            <h1 className="mt-3 text-2xl font-semibold text-cs-gray">
              {info.name.toUpperCase()}
            </h1>
            <p className="mt-4 text-gray-500 ">
              Sorry, you are not verified.Here click to go your mail inbox:
            </p>

            <div className="mt-6">
              <button className="px-5 py-2 text-sm  text-white transition-colors duration-200 bg-cs-purple rounded-lg hover:bg-blue-600">
                <Link
                  to="https://mail.google.com/mail/u/0/#inbox/"
                  target="_blank"
                >
                  Go To Mail for verification
                </Link>
              </button>
            </div>
          </div>

          <div className="relative w-full mt-12">
            <img
              className="w-96 mx-auto"
              loading="lazy"
              src={verified}
              alt={verified}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default NotVarified;
