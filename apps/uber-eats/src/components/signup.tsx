import { BrowserRouter, Route, Routes, Link, Outlet, useNavigate } from 'react-router-dom';

import React, { useContext, useEffect } from 'react';
import useAuth from '../hooks/use-auth';
import { UserContext, UserContextType } from '../hooks/user-context';

export default function Signup() {

  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  const { user, setUser } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    if(user){
      navigate("/")
    }
  }, [user])
  
  return (
    <main className="h-screen w-full banner">
    <div className="flex flex-col justify-center items-center pt-10 ">
        <div></div>
        <form className="bg-white w-96 mt-6 p-4 rounded-lg shadow-lg">
            <div className="flex flex-col space-y-6">
                <input type="text" placeholder="Name" name="name" className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none glass transition duration-300 border border-gray-300 focus:shadow-xl" value="" />
                <input type="email" placeholder="Email" name="email" className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none glass transition duration-300 border border-gray-300 focus:shadow-xl" value="" />
                <input
                    type="text"
                    placeholder="Profile Picture Link"
                    name="image"
                    className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none glass transition duration-300 border border-gray-300 focus:shadow-xl"
                    value=""
                />
                <input type="password" placeholder="Password" name="password" className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none glass transition duration-300 border border-gray-300 focus:shadow-xl" value="" />
            </div>
            <button className="w-full py-3 bg-primary text-white ring-red-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 hover:bg-primary-dark poppins">Sign Up</button>
            <a href="/signin"><p className="text-base text-primary text-center my-6 hover:underline">Already have an account ?</p></a>
            <div className="border-t border-gray-200 mt-6">
                <p className="text-center text-gray-400 py-4">OR</p>
                <div className="flex items-center space-x-3 justify-center border border-gray-300 rounded-lg w-full py-3 cursor-pointer hover:bg-gray-100">
                   
                    <span className="poppins">Sign Up With Google</span>
                </div>
            </div>
        </form>
    </div>
</main>

  )
}