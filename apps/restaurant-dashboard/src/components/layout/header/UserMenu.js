"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import React, { useEffect, useRef, useState } from "react";
import OutsideClick from "../../../utils/outsideClick";

const UserMenu = ({ user }) => {
  const [userMenuStatus, setUserMenuStatus] = useState(false);
  const buttonRef = useRef(null);
  const buttonOutsideClick = OutsideClick(buttonRef);

  const userMenuhandle = () => {
    setUserMenuStatus(!userMenuStatus);
  };

  useEffect(() => {
    if (buttonOutsideClick) {
      setUserMenuStatus(false);
    }
  }, [buttonOutsideClick]);

  //console.log("userbutton", buttonOutsideClick)
  return (
    <button
      className="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg relative"
      onClick={userMenuhandle}
      ref={buttonRef}
    >
      <span className="sr-only">User Menu</span>
      <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
        <span className="font-semibold">
          {user?.email ? user.email : "john@gmail.com"}
        </span>
        <span className="text-sm text-gray-600">
          {user?.name ? user.name : "john doe"}
        </span>
      </div>
      <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
        <img
          src="https://randomuser.me/api/portraits/women/68.jpg"
          alt="user profile photo"
          className="h-full w-full object-cover"
        />
      </span>

      {userMenuStatus && (
        <div className="absolute right-0 sm:-bottom-16 bg-slate-500 px-2 py-1 space-x-2 text-yellow-50 w-full -bottom-28">
          <a className="block hover:bg-gray-50 hover:text-black">
            user Profile
          </a>
          <a className="block hover:bg-gray-50 hover:text-black">
            user setting
          </a>
        </div>
      )}

      {userMenuStatus ? (
        <ChevronDownIcon className="hidden sm:block h-6 w-6 text-gray-300" />
      ) : (
        <ChevronUpIcon className="hidden sm:block h-6 w-6 text-gray-300" />
      )}
    </button>
  );
};

export default UserMenu;
