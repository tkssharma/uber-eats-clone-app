import { useDispatch, useSelector } from "react-redux";
import { data } from "../../data/data";

import React, { useEffect, useReducer, useState } from "react";
import {
  fetchTopDishes,
  topDishes,
  topRestaurants,
} from "../../redux/restaurant/restaurant.slice";

function Foods() {
  const storeDispatch = useDispatch();
  const { data: dishesData } = useSelector(topDishes);

  const handleFilterChange = (filter: string) => {
    dispatch({ type: filter });
  };

  // we can customize this filter as api supports filter type too
  const filterReducer = (state: any, { type }: any) => {
    switch (type) {
      case "all":
        return "order_by=ASC";
      case "burger":
        return "food_type=fast_food&order_by=ASC";
      case "pizza":
        return "food_type=fast_food&order_by=ASC";
      case "salad":
        return "food_type=vegan&order_by=ASC";
      case "chicken":
        return "food_type=non_veg&order_by=ASC";
      case "$":
        return "order_by=DESC";
      case "$$":
        return "order_by=ASC";
      default:
        return "";
    }
  };
  //filter by category
  const [filters, dispatch] = useReducer(filterReducer, "");

  useEffect(() => {
    storeDispatch(fetchTopDishes(filters));
  }, [filters]);

  return (
    <div className="max-w-[1640px] m-auto px-4 py-12">
      <h1 className="text-orange-600 font-bold text-4xl text-center">
        Top Rated Menu
      </h1>
      {/* filter row */}
      <div className="flex flex-col lg:flex-row justify-between">
        {/* filter type */}
        <div>
          <p className="font-bold text-gray-700">Filter Type</p>
          <div className="flex justify-between flex-wrap">
            <button
              className="m-1 border-orange-600 text-orange-600 hover:text-white hover:bg-orange-600"
              onClick={() => handleFilterChange("all")}
            >
              All
            </button>
            <button
              className="m-1 border-orange-600 text-orange-600 hover:text-white hover:bg-orange-600"
              onClick={() => handleFilterChange("burger")}
            >
              Burgers
            </button>
            <button
              className="m-1 border-orange-600 text-orange-600 hover:text-white hover:bg-orange-600"
              onClick={() => handleFilterChange("pizza")}
            >
              pizza
            </button>
            <button
              className="m-1 border-orange-600 text-orange-600 hover:text-white hover:bg-orange-600"
              onClick={() => handleFilterChange("salad")}
            >
              salad
            </button>
            <button
              className="m-1 border-orange-600 text-orange-600 hover:text-white hover:bg-orange-600"
              onClick={() => handleFilterChange("chicken")}
            >
              Chicken
            </button>
          </div>
        </div>
        {/* filter price */}
        <div>
          <p className="font-bold text-gray-700">filter price</p>
          <div className="flex justify-between max-w-[390px] w-full">
            <button
              className="m-1 border-orange-600 text-orange-600 hover:text-white hover:bg-orange-600"
              onClick={() => handleFilterChange("$")}
            >
              $
            </button>
          </div>
          <div className="flex justify-between max-w-[390px] w-full">
            <button
              className="m-1 border-orange-600 text-orange-600 hover:text-white hover:bg-orange-600"
              onClick={() => handleFilterChange("$$")}
            >
              $$$$
            </button>
          </div>
        </div>
      </div>

      {/* display foods */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 ">
        {dishesData &&
          dishesData.map((item: any) => (
            <div
              className="border shadow-lg hover:scale-105 duration-300 rounded-lg"
              key={item.id}
            >
              <img
                src={item.thumbnails}
                alt={item.name}
                className="w-full h-[200px] object-cover rounded-lg"
              />
              <div className="flex justify-between px-2 py-4">
                <p className="font-bold">{item.name}</p>
                <p>
                  <span className="bg-orange-500 text-white p-1 rounded-full">
                    {" "}
                    {item.price}
                  </span>
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Foods;
