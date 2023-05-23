import { LogoutIcon } from "@heroicons/react/outline";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  ChatAlt2Icon,
  HeartIcon,
  ClipboardListIcon,
  CogIcon,
  CashIcon,
} from "@heroicons/react/outline";
const icon_style = "h-6 w-6 text-gray-500 hover:text-white";

export const LeftBarRoutes = [
  {
    id: 1,
    name: "Home",
    route: "/",
    icon: <HomeIcon className={icon_style} />,
  },
  {
    id: 2,
    name: "Chat",
    route: "/chat",
    icon: <ChatAlt2Icon className={icon_style} />,
  },
  {
    id: 3,
    name: "Wallet",
    route: "/wallet",
    icon: <CashIcon className={icon_style} />,
  },
  {
    id: 4,
    name: "Orders",
    route: "/orders",
    icon: <ClipboardListIcon className={icon_style} />,
  },
  {
    id: 5,
    name: "Favorite",
    route: "/favorite",
    icon: <HeartIcon className={icon_style} />,
  },
  {
    id: 6,
    name: "Settings",
    route: "/settings",
    icon: <CogIcon className={icon_style} />,
  },
];
export default function LeftSideBar() {
  const navigation = useNavigate();

  return (
    <>
      <div className="p-5 border-l-2 w-28 h-screen bg-white fixed shadow-md">
        <div className="space-y-4">
          {LeftBarRoutes.map((item, index) => {
            return (
              <div
                key={index}
                className="w-16 h-16 hover:bg-gradient-to-r bg-transparent from-orange-500 to-orange-500 hover:shadow-2xl flex justify-center items-center rounded-full"
                onClick={() => navigation(item?.route)}
              >
                {/* icon button */}
                {item?.icon}
              </div>
            );
          })}
        </div>

        <div
          className=" w-16 h-16 hover:bg-gradient-to-r bg-transparent from-orange-500 to-orange-500 
                 flex justify-center items-center rounded-full absolute bottom-2"
        >
          <LogoutIcon className="h-6 w-6 text-gray-500 hover:text-white" />
        </div>
      </div>
    </>
  );
}
