/* eslint-disable @next/next/no-img-element */
import { signOut } from "next-auth/react";
import Link from "next/link";
import Router from "next/router";
import { FiLogOut } from "react-icons/fi";

const Header = ({ setLogout, profile }) => {
  return (
    <div className="bg-black text-white p-4 w-full flex items-center justify-between">
      <p
        onClick={() =>
          Router.push({
            pathname: "/home",
            query: { auth: window.localStorage.getItem("mylinkup") },
          })
        }
        className="text-base cursor-pointer"
      >
        MylinkUp
      </p>
      <div className="flex items-center gap-3">
        <img
          src={profile}
          alt="profile"
          className="h-10 w-10 bg-white rounded-full"
        />
        <span
          className="text-2xl cursor-pointer"
          onClick={() => {
            localStorage.removeItem("mylinkup_token");
            setLogout(true);
            setTimeout(() => {
              setLogout(false);
              signOut();
            }, 2000);
          }}
        >
          <FiLogOut />
        </span>
      </div>
    </div>
  );
};

export default Header;
