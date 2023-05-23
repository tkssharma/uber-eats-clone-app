import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose, AiFillTag } from 'react-icons/ai';
import { BsFillCartFill, BsFillSaveFill, BsPerson } from 'react-icons/bs';
import { TbTruckDelivery } from 'react-icons/tb';
import { FaSignOutAlt, FaUserFriends, FaWallet } from 'react-icons/fa';
import { MdFavorite, MdHelp, MdLogin } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { UserContext, UserContextType } from '../../hooks/user-context';
import useAuth from '../../hooks/use-auth';

function Navbar() {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  const { user, setUser } = useContext(UserContext) as UserContextType;

  const handleNavigate = (path: string) => {
    setNav(false);
    navigate(path);
  };

  const ref = useRef(null) as any;

  const handleLogout = () => {
    setNav(false);
    logoutUser();
    navigate('/signin');
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setNav(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div
      className="max-w-[1640px] mx-auto flex justify-between 
                 items-center p-2"
    >
      <div className="flex items-center ">
        <img
          onClick={() => navigate('/')}
          className="w-36 ml-10 cursor-pointer"
          src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/f8f0721f871b3704cce92eb96bc6e504.svg"
          alt="logo"
        />

        <div
          className=" hidden lg:flex items-center bg-gray-200 
              rounded-full p-2 text-[12px] "
        >
          <p className="bg-black rounded-full  text-white  p-1">Delivery</p>
          <p className="p-1">Pickup</p>
        </div>
      </div>
      {/* search  */}
      <div
        className="bg-gray-200 hidden md:block rounded-full flex items-center p-1
           w-[200px] sm:w-[400px] lg:w-[500px] "
      >
        <input
          className="bg-transparent p-2  w-full
              focus:outline-none"
          type="text"
          placeholder="Search foods"
        />
      </div>
      {/* cart button */}
      <div className="flex flex-row justify-end">
        {user && (
          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
              className="h-5 w-5 text-gray-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              ></path>
            </svg>

            <div className="bg-orange-400 4-3 w-4 justify-center items-center rounded-full flex -ml-3 -mt-3">
              <label className=" text-white text-xs">4</label>
            </div>
          </div>
        )}
        {user && (
          <div className="ml-6 mr-5 flex items-center">
            <div className="h-12 w-12 bg-cyan-200 rounded-full flex items-center justify-center">
              <img
                className="w-8 h-8 rounded-full"
                src="https://tkssharma.com/static/profile-8bdec926a8230839ae8e804a52d43627.png"
              />
            </div>
            <div className="ml-3 flex-col flex">
              <label className="text-md font-semibold">{user?.name?.substring(0,6)}</label>
              <label className="text-sm text-gray-400">{user?.email?.substring(0,6)}</label>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
              className="h-4 w-4 ml-3"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        )}
      </div>

      {/* mobile view */}
      {/* overlay */}
      {nav ? (
        <div
          className=" fixed bg-black/80 w-full h-screen z-10 
               top-10 left-0"
        />
      ) : (
        ''
      )}
    </div>
  );
}

export default Navbar;
