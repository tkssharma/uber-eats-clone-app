import { BellIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline'
import React, { useContext, useEffect, useState } from 'react'
import dummyData from '../utils/dummyData';
import { useDispatch, useSelector } from 'react-redux';
import { CartItemsSelector, addCartItems, fetchCartItems, removeCartItems } from '../../redux/cart/cart.slice';
import useAuth from '../../hooks/use-auth';
import { UserContext, UserContextType } from '../../hooks/user-context';
import {  useNavigate } from 'react-router-dom';

export const cartData = [
  {
    food_id: 2,
    name: "Crispy Baked French Fries",
    description: "Crispy Baked French Fries",
    price: 8,
    food_image: "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quantity: 1,
  },
  {
    food_id: 3,
    name: "Chicken Burger with Honey Mustard",
    description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
    price: 25,
    food_image: "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quantity: 2,
  },
  {
    food_id: 3,
    name: "Chicken Burger with Honey Mustard",
    description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
    price: 25,
    food_image: "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    quantity: 2,
  },
];

function RightSideBar() {
  const dispatch = useDispatch()
  const { logoutUser } = useAuth();
  const { data } = useSelector(CartItemsSelector)
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext) as UserContextType;
  
  const goTo = () => {
    navigate('/eats/checkout');
  }
  useEffect(() => {
     dispatch(fetchCartItems())
  }, [])
  /*Order menu UI*/
  function OrderMenu() {
    // const { cart } = data;

    function CartCard({ ...props }) {
      const { cart_item } = props;
      return (

        <div className="shadow-2xl flex flex-row rounded-2xl bg-white mt-3">

          <div className="flex flex-row justify-between items-center mb-3 ml-3">

            {/* left side */}
            <div className="flex flex-row mt-3">

              <div className="h-16 w-16 bg-cyan-100 rounded-xl flex items-center justify-center">
                <img src={cart_item?.thumbnails} alt={cart_item?.thumbnails} className="w-12 h-12 rounded-full" />

              </div>

              <div className="flex flex-col w-44 ml-3">
                <label className="font-bold text-sm truncate">{cart_item?.name}</label>

                <div>
                  <label className="text-sm ml-1">{cart_item?.count}</label>
                  <label className=" text-orange-500 text-xs">x</label>
                  <label className="text-sm ml-1">{cart_item?.price}</label>
                </div>

              </div>

            </div>

            {/* right side */}
            <div>
              <label className=" text-orange-500 font-bold text-xs">$</label>
              <label className="font-bold text-md ml-1">{(Number(cart_item?.price) *  Number(cart_item?.count))}</label>
            </div>
          </div>

        </div>
      )
    }

    return (
      <div className="mt-20 ml-2 mr-2">

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
          {data && data.menu_items?.map((cart_item: any, index: number) => {
            return (
              <CartCard key={index} cart_item={cart_item} />
            )
          })}
        </div>

        {/* checkout button */}

        <div className="flex flex-row justify-center mt-10 mb-10">
          <button onClick={() => goTo()} className="text-white flex  mt-3
           bg-gradient-to-r bg-transparent from-orange-300 to-orange-500
           rounded-3xl items-center justify-center text-center">

            <label className="ml-20 mr-20 mt-3 mb-3">Checkout</label>

          </button>
        </div>


      </div>
    )
  }
    /**mini navbar UI*/
    function MiniNavBar() {
  
      return (
        <>
          {/* Notification icon and user profile */}
          <div className="mt-10 flex flex-row justify-end">
  
            {/* notification icon */}
            <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
              <BellIcon className="h-5 w-5 text-gray-400" />
  
              <div
                className="bg-orange-400 4-3 w-4 justify-center items-center rounded-full flex -ml-3 -mt-3">
                <label className=" text-white text-xs">4</label>
  
              </div>
            </div>
  
            {/* user profile */}
            {user && <div className="ml-6 mr-5 flex items-center">
              <div className="ml-3 flex-col flex">
                <label className="text-md font-semibold">{user?.email}</label>
                <label className="text-sm text-gray-400">{user?.name}</label>
              </div>
              <ChevronDownIcon className="h-4 w-4 ml-3" />
  
            </div>
             } 
  
          </div>
        </>
      )
    }

    function Message () {
      return (
        <div className='width-[10%]  flex flex-row justify-end'>
        <div className=' border  bg-white p-8'>
          <input
            className='font-extralight w-full  bg-gray-100 h-8 p-2'
            type='text'
            name=''
            id=''
            placeholder='“Any suggestions? We will pass it on...'
          />
          <br />
          <br />
    
          <br />
          <button className='h-10 p-2 w-full border-dashed border-2 border-gray-300 hover:bg-gray-200'>
            Apply Coupon
          </button>
          <br />
          <br />

          <div className='col font-medium mb-2'>
            <h2>Bill Details</h2>
          </div>

          <div className='col text-xs font-medium p-1'>Item Total</div>

          <div className='col  text-xs font-medium pb-2'>Delivery Fee 🛈</div>
          <hr className='border border-gray-300' />

          <div className=' text-sm font-extralight pb-3 pt-3 '>
            Govt Taxes & Restaurant Charges 🛈
          </div>
          <hr style={{ border: "1px solid black" }} />
          <div className='flex justify-between p-2'>
            <div className='  font-semibold '>TO PAY</div>
            ₹{" "}
            {(data.menu_items?.length > 0 &&
              data.menu_items?.reduce(
                (acc: any, val: any) => acc + (val.price * val.count),
                0
              )) ||
              0}
          </div>
        </div>
      </div>
      )
    }
  

  return (
    <div className="bg-white font-mono flex-col  inset-y-0 right-0 fixed overflow-auto shadow-md">

      {MiniNavBar()}
      {/* render Order Menu */}
      {OrderMenu()}

      {Message()}

    </div>
  )
}

export default RightSideBar