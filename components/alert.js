import React, { useState } from "react";
const Alert = ({ verify }) => {
  return (
    <div
      role="alert"
      className={"w-full absolute left-0 top-0 bg-transparent "}
    >
      <div className="mx-auto flex justify-center sm:justify-end pt-16 sm:pt-6 pb-6 sm:pb-16 relative h-64 overflow-x-hidden">
        <div
          role="alert"
          className="sm:mr-6 mt-16 sm:mt-6 mb-6 sm:mb-0 xl:w-5/12 mx-auto absolute left-0 sm:left-auto right-0 sm:top-0 sm:w-1/2 w-10/12 bg-slate-900 sm:bg-white shadow-lg rounded flex pr-4 py-4 transition duration-150 ease-in-out"
          id="notification"
        >
          <div className="pl-5">
            <p className="text-sm text-white sm:text-gray-600 font-semibold">
              {verify === true
                ? "Already Loged In"
                : "Sigin With your google account"}
            </p>
            <p className="text-xs text-white sm:text-gray-600 font-normal">
              {verify === true
                ? "Wait we are redirecting to your dashboard"
                : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Alert;