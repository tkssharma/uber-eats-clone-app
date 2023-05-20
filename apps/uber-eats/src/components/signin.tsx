import { BrowserRouter, Route, Routes, Link, Outlet } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import React, { useContext, useEffect, useState } from 'react';
import { UserContext, UserContextType } from '../hooks/user-context';
import useAuth from '../hooks/use-auth';

export default function Login() {
  const {loginUser, error} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const Google = () => {
    window.open(`http://localhost:3001/api/v1/auth-service/auth/google`,"_self");
  }
  const navigate = useNavigate();
  const { logoutUser } = useAuth();

  const { user, setUser } = useContext(UserContext) as UserContextType;

  useEffect(() => {
    if(user){
      navigate("/")
    }
  }, [user])
  
  const signIn = (e: any) => {
    e.preventDefault();
     loginUser({email, password})
  }
  
  return (
    <main className="h-screen w-full banner">
    <div className="flex flex-col justify-center items-center pt-10">
        <div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold"></strong>
            <span className="block sm:inline">User Not Found, Please check user credentials !!</span>
          </div>
          )}
        </div>
        <form className="bg-white w-96 mt-6 p-4 rounded-lg shadow-lg">
            <div className="flex flex-col space-y-6">
                <input value={email} onChange={(e: any) => setEmail(e.target.value)} type="email" placeholder="Email" name="email" className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none glass transition duration-300 border border-gray-300 focus:shadow-xl" />
                <input value={password} onChange={(e: any) => setPassword(e.target.value)}  type="password" placeholder="Password" name="password" className="w-full px-4 py-3 rounded-lg ring-red-200 focus:ring-4 focus:outline-none glass transition duration-300 border border-gray-300 focus:shadow-xl"  />
            </div>
            <button onClick={(e) => signIn(e)} className="w-full py-3 bg-primary text-white focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 hover:bg-primary-dark poppins">Sign In</button>
            <Link to="/signup"><p className="text-base text-primary text-center my-6 hover:underline">Need an account ?</p></Link>
            <div className="border-t border-gray-200 mt-6" onClick={() => Google()}>
                <p className="text-center text-gray-400 py-4">OR</p>
                <div className="flex items-center space-x-3 justify-center border border-gray-300 rounded-lg w-full py-3 cursor-pointer hover:bg-orange-600 text-white bg-orange-500"><span className="poppins">Sign In With Google</span></div>
            </div>
        </form>
    </div>
</main>
  )
}