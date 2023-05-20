import {
  ChevronRightIcon,
  PlusIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { images } from "../../assets";
import { Rating } from "./index";
import { dummyData } from "../utils";

function Home() {
  const [data, setData] = useState({
    selectedCategory: null,
    menuCategory: [],
    food: [],
    foodHolder: [],
  });

  useEffect(() => {
    setData({
      ...data,
      selectedCategory: dummyData?.menuData[0],
      menuCategory: dummyData?.menuData,
      foodHolder: dummyData?.foodData,
      food: dummyData?.foodData,
    });
  }, []);

  /**top section UI */
  function TopSection() {
    return (
      <div>
        <div className="justify-between flex-row flex mr-10">
          <p className="text-2xl font-bold">Today Menu &#128523;</p>

          <div
            className="bg-white h-10 items-center justify-center 
          flex shadow-2xl align-baseline rounded-l-3xl rounded-r-3xl"
          >
            <input
              onChange={filterFood}
              className=" appearance-none w-full ml-5 mr-8 bg-transparent h-full
       text-gray-700 leading outline-none"
              id="username"
              type="text"
              placeholder="Search food by name"
            />

            <SearchIcon className="h-8 w-8 text-gray-500 px-1 mr-5" />
          </div>
        </div>

        <div className="bg-orange-600 rounded-2xl mt-5 ml-0 mr-10 shadow-xl">
          <div className="flex flex-row justify-between mt-3">
            <img
              src={images?.delivery_bike_icon}
              alt={images?.delivery_bike_icon}
              className="w-48 h-44 rounded-l-2xl"
            />

            <div className="items-center justify-center flex flex-col">
              <p className="text-md font-bold">Hello Jeremy</p>

              <p className="text-center mt-2">
                <label className="text-gray-500">Get free delivery evey</label>
                <label className="text-orange-400 font-bold"> $20</label>
                <label className="text-gray-500"> purchase</label>
              </p>

              <button
                className="text-white h-10 flex  mt-3
               bg-gradient-to-r bg-transparent from-orange-500 to-orange-500 
               rounded-3xl items-center justify-center text-center"
              >
                <label className="ml-10 mr-10">Learn More</label>
              </button>
            </div>

            <img
              src={images?.banner_image_spags}
              alt={images?.banner_image_spags}
              className="w-36 h-44 rounded-r-2xl"
            />
          </div>
        </div>
      </div>
    );
  }

  /**menu category UI */
  function MenuCategory() {
    const { menuCategory, foodHolder } = data;

    /**Menu Card UI*/
    const MenuCard = ({ ...props }) => {
      const { menu } = props;
      return (
        <button
          onClick={() =>
            setData({
              ...data,
              selectedCategory: menu,
              food: foodHolder?.filter((e) => e?.menu_id === menu?.id),
            })
          }
          className={
            checkSelectedCategory(menu)
              ? "bg-gradient-to-r bg-transparent from-orange-500 toto-orange-500adow-2xl rounded-2xl ml-3   items-center justify-center mt-5 w-32"
              : "bg-white shadow-2xl rounded-2xl ml-5 items-center justify-center mt-5 w-32"
          }
        >
          <div className="mt-5 mb-5 mr-10 ml-10 items-center justify-center content-center flex flex-col">
            <div className="bg-white h-12 w-12 justify-center items-center rounded-full mt-0 flex">
              <img
                src={menu?.menu_image}
                alt={menu?.menu_image}
                className="w-6 h-6"
              />
            </div>

            <div
              className={
                checkSelectedCategory(menu)
                  ? "mt-5 font-bold text-sm text-white"
                  : "mt-5 font-bold text-sm"
              }
            >
              {menu?.name}
            </div>

            <div
              className={
                checkSelectedCategory(menu)
                  ? "bg-white h-6 w-6 justify-center items-center rounded-full mt-5 flex"
                  : " bg-gradient-to-r bg-transparent from-orange-500 to-orange-500 h-6 w-6 justify-center items-center rounded-full mt-5 flex"
              }
            >
              <ChevronRightIcon
                className={
                  checkSelectedCategory(menu)
                    ? "h-3 w-3 text-orange-400"
                    : "h-3 w-3 text-white"
                }
              />
            </div>
          </div>
        </button>
      );
    };

    return (
      <div className="mt-8">
        <div className="justify-between flex-row flex mr-10">
          <p className="text-xl font-bold">Menu Category</p>

          <button
            onClick={() =>
              setData({
                ...data,
                food: foodHolder,
              })
            }
            className="h-10 items-center justify-center flex align-baseline"
          >
            <p className="text-sm text-orange-400">View All</p>

            <div className="bg-orange-400 h-6 w-6 justify-center items-center rounded-md ml-3 flex">
              <ChevronRightIcon className="h-3 w-3 text-white" />
            </div>
          </button>
        </div>

        {/* list menus horizontally */}
        <div className="flex flex-row">
          {menuCategory?.map((menu, index) => {
            return <MenuCard key={index} menu={menu} />;
          })}
        </div>
      </div>
    );
  }

  /**food UI */
  function Food() {
    const { food } = data;

    /**Food Card UI*/
    const FoodCard = ({ ...props }) => {
      const { food_item } = props;

      return (
        <div className="w-56 ml-5 items-center justify-center mt-3">
          <div className="mt-0 mb-5 mr-10 ml-10 items-center justify-center content-center flex flex-col relative">
            <div className="object-cover">
              <img
                src={food_item?.food_image}
                alt={food_item?.name}
                className="w-28 h-28 rounded-full"
              />
            </div>

            <div className="bg-white shadow-2xl rounded-lg w-56 items-start justify-start flex flex-col mt-5">
              <div className="mt-5 mr-5 ml-5 items-start justify-start flex w-48">
                <div className="font-bold text-md truncate">
                  {food_item?.name}
                </div>
              </div>

              {/* rating bar */}

              <div className="ml-4 mt-1">
                <Rating />
              </div>

              <div className="mt-0 mb-5 mr-5 ml-5 flex justify-between items-center flex-row w-48">
                <div>
                  <label className=" text-orange-400 font-bold text-xs">
                    $
                  </label>
                  <label className="font-bold text-md">
                    {food_item?.price.toFixed(2)}
                  </label>
                </div>

                {/* add icon */}
                <button
                  onClick={() => {
                    console.log(food_item);
                  }}
                  className=" h-8 w-8 justify-center items-center rounded-full flex 
                  bg-gradient-to-r bg-transparent from-orange-500 to-orange-500 
                  shadow-2xl"
                >
                  <PlusIcon className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="mt-5">
        {/* list food vertically */}
        <div className="flex flex-row flex-wrap">
          {food?.map((food_item, index) => {
            return <FoodCard key={index} food_item={food_item} />;
          })}
        </div>
      </div>
    );
  }

  /**check if category is selected */
  function checkSelectedCategory(menu) {
    const { selectedCategory } = data;

    if (
      typeof selectedCategory !== "undefined" &&
      selectedCategory !== null &&
      selectedCategory?.id === menu?.id
    ) {
      return true;
    } else {
      return false;
    }
  }

  /**filter food items */
  function filterFood(event) {
    const text = event.target.value;

    const newData = data?.foodHolder?.filter(function (item) {
      const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setData({ ...data, food: newData, search: text });
  }

  return (
    <div className="relative font-mono mt-5">
      {/* top section with search bar */}
      {TopSection()}

      {/* render menu categories */}
      {MenuCategory()}

      {/* render food */}
      {Food()}
    </div>
  );
}

export default Home;
