import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Link, Outlet, useNavigate } from 'react-router-dom';

function Layout() {
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  return (
    <>
      <header className={`${scroll ? 'bg-white': 'bg-transparent'} fixed z-50 top-0 left-0 w-full transition duration-500`}>
        <nav className="flex items-center max-w-screen-xl mx-auto px-6 py-3">
          <div className="flex flex-grow" onClick={() => navigate("/")}>
            <img className="w-36 cursor-pointer" src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/f8f0721f871b3704cce92eb96bc6e504.svg" alt="logo" /></div>
          <div className="flex items-center justify-end space-x-6">
            <button onClick={() => navigate("/signin")} className="poppins">Sign In</button>
            <button onClick={() => navigate("/signup")} className="bg-primary px-6 py-3 text-white poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105">Sign Up</button>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Layout;