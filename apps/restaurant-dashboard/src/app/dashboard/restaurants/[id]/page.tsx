"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {Restaurant} from "@eats/types";
import { useEffect, useState } from "react";

export default function Index({ params }: any) {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();
  const {id} = params;
  // console.log(params);

  const [restaurant, setRestaurant] = useState<Restaurant>({});
  const [menuItem, setMenuItem] = useState<any>([])

  const fetchRestaurants = async () =>  {
    const res = await fetch(`/api/restaurant/${id}`);
    const data = await res.json();
    setRestaurant(data);
    const items = [];

    const dishData = data.dishes;
    for(const i in dishData) {
       items.push({
        key: i,
        value: dishData[i]
       })
    }
    setMenuItem(items);
    /*
      [
        {
          key: 'lunch',
          value: []
        },
        {
        key: 'dinner',
        value: []
      ]
    */

  }

  useEffect(() => {
    fetchRestaurants();
  }, [])


  // list of restaurants
  return (
    <div className="flex flex-col">
      <div>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {restaurant.name}
              </h2>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                {restaurant.description}
              </h5>
      </div>

      {menuItem && menuItem.map((data: any ) => {
        return (
          <div className="flex flex-col">
            <h2 className="mb-2 m-4 p-4 text-2xl font-bold tracking-tight text-gray-900">{data.key}</h2>
            <div className="flex flex-row">
              {data.value && data.value.map((data: any ) => {
                return (
                  <div className="max-w-sm m-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <img
                      className="rounded-t-lg"
                      src="/docs/images/blog/image-1.jpg"
                      alt=""
                    />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {data.name}
                      </h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {data.description}
                    </p>
                    <div onClick={() => openRestaurant(data)}
                      className="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Read more
                      <svg
                        className="w-3.5 h-3.5 ml-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                )
              })}
            </div>
          </div>
        )
          }
        )
      }
    </div>
  );
}
