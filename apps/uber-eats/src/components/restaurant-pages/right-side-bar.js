import {
  BellIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import dummyData from "../utils/dummyData";

function RightSideBar() {
  const [data, setData] = useState({
    user: null,
    cart: [],
  });

  useEffect(() => {
    setData({
      ...data,
      user: dummyData?.userProfile,
      cart: dummyData?.cartData,
    });
  }, []);

  /**mini navbar UI*/
  function MiniNavBar() {
    const { user } = data;

    return (
      <>
        {/* Notification icon and user profile */}
        <div className="mt-10 flex flex-row justify-end">
          {/* notification icon */}
          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
            <BellIcon className="h-5 w-5 text-gray-400" />

            <div className="bg-orange-400 4-3 w-4 justify-center items-center rounded-full flex -ml-3 -mt-3">
              <label className=" text-white text-xs">4</label>
            </div>
          </div>

          {/* user profile */}
          <div className="ml-6 mr-5 flex items-center">
            <div className="h-12 w-12 bg-cyan-200 rounded-full flex items-center justify-center">
              <img
                src={user?.avatar}
                alt={user?.avatar}
                className="w-8 h-8 rounded-full"
              />
            </div>

            <div className="ml-3 flex-col flex">
              <label className="text-md font-semibold">
                {user?.first_name}
              </label>
              <label className="text-sm text-gray-400">{user?.user_type}</label>
            </div>

            <ChevronDownIcon className="h-4 w-4 ml-3" />
          </div>
        </div>
      </>
    );
  }

  /**card UI */
  function Cards() {
    const { user } = data;

    const card = user?.cards[0];
    return (
      <>
        <div className="mr-5 ml-5 mt-10 relative">
          {/* card one rotate */}
          <div
            className="w-80 h-48 bg-gradient-to-r from-orange-500 to-orange-500 
          rounded-3xl flex flex-col justify-between rotate-12 object-cover shadow-2xl"
          />

          {/* card two active card */}
          <div
            className="w-80 h-48 bg-gradient-to-r bg-transparent from-orange-500 to-orange-500 
          rounded-3xl flex flex-col justify-between top-0 object-cover absolute shadow-2xl"
          >
            {/* top card section */}
            <div className="ml-5 mr-5 flex flex-row justify-between">
              <label className="mt-3 text-white text-sm">Debit Card</label>

              <label className="mt-3 font-bold text-white">{card?.type}</label>
            </div>

            {/*bottom card section */}

            <div className="ml-5 mr-5 mb-3 flex flex-row justify-between">
              <div>
                <div className="flex flex-col">
                  <label className="text-white text-lg">
                    $ {card?.balance.toFixed(2)}
                  </label>
                  <label className="text-white text-xs mt-2">
                    {card?.holder_name}
                  </label>
                </div>
              </div>

              <div>
                <div className="flex flex-col">
                  <label className="text-white text-sm">
                    Expiry {card?.expiry_date}
                  </label>
                  <label className="text-white text-xs mt-3">
                    {card?.card_number}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  /*Order menu UI*/
  function OrderMenu() {
    const { cart } = data;

    function CartCard({ ...props }) {
      const { cart_item } = props;
      return (
        <div className="shadow-2xl flex flex-row rounded-2xl bg-white mt-3">
          <div className="flex flex-row justify-between items-center mb-3 ml-3">
            {/* left side */}
            <div className="flex flex-row mt-3">
              <div className="h-16 w-16 bg-cyan-100 rounded-xl flex items-center justify-center">
                <img
                  src={cart_item?.food_image}
                  alt={cart_item?.food_image}
                  className="w-12 h-12 rounded-full"
                />
              </div>

              <div className="flex flex-col w-44 ml-3">
                <label className="font-bold text-sm truncate">
                  {cart_item?.name}
                </label>

                <div>
                  <label className=" text-orange-500 text-xs">x</label>
                  <label className="text-sm ml-1">{cart_item?.quantity}</label>
                </div>
              </div>
            </div>

            {/* right side */}
            <div>
              <label className=" text-orange-500 font-bold text-xs">$</label>
              <label className="font-bold text-md ml-1">
                {(cart_item?.price * cart_item?.quantity).toFixed(2)}
              </label>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="mt-20 ml-3 mr-3">
        <div className="justify-between flex-row flex">
          <p className="text-lg font-bold">Order Menu</p>

          <button className="h-10 items-center justify-center flex align-baseline">
            <p className="text-xs text-orange-400">View All</p>

            <div className="bg-orange-400 h-4 w-4 justify-center items-center rounded-md ml-3 flex">
              <ChevronRightIcon className="h-2 w-2 text-white" />
            </div>
          </button>
        </div>

        {/* list cart items */}
        <div className="mt-2">
          {cart?.map((cart_item, index) => {
            return <CartCard key={index} cart_item={cart_item} />;
          })}
        </div>

        {/* checkout button */}

        <div className="flex flex-row justify-center mt-10 mb-10">
          <button
            className="text-white flex  mt-3
           bg-gradient-to-r bg-transparent from-orange-500 to-orange-500
           rounded-3xl items-center justify-center text-center"
          >
            <label className="ml-20 mr-20 mt-3 mb-3">Checkout</label>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white font-mono flex-col  inset-y-0 right-0 fixed overflow-auto shadow-md">
      {/* render mini nav bar */}
      {MiniNavBar()}

      {/* render cards */}
      {Cards()}

      {/* render Order Menu */}
      {OrderMenu()}
    </div>
  );
}

export default RightSideBar;
