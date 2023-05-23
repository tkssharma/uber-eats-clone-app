import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Home from './routes/home';
import Header from './components/landing-page/navbar';
import SignIn from './routes/signin';
import SignUp from './routes/signup';
import Search from './routes/search';

import { LeftSideBar, RightSideBar } from './components/restaurant-pages'

import LandingPage from "./routes/landing";
import RestaurantPage from "./routes/restaurant";

import './styles/index.css';
import './styles/tailwind.css';
import { useState } from 'react';
import { UserContext } from './hooks/user-context';
import FetchUser from './hooks/fetch-user';

{/* Left side bar */}

function Layout() {
  return (
    <>
      <Header />
      <div className="flex flex-col bg-slate-50">
      <Outlet />
    </div>
</>

  );
}

function AppLayout(){
  return (
    <div className="flex flex-row bg-slate-50">
    {/* Left side bar */}
    <LeftSideBar />

    {/* Middle Section for children */}
    <div className=" ml-32 mr-96">
      <Outlet />
    </div>

    {/* Right side bar */}
    <RightSideBar />
</div>
  )
}

const App = () => {

  const { 
    user, 
    setUser, 
    isLoading } = FetchUser();
  return (
    <UserContext.Provider value={{user, 
      setUser, 
      isLoading}}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/search" element={<Search />} />

          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route path="/pages" element={<AppLayout />}>
          <Route index element={<RestaurantPage />} />
          <Route path="restaurants" element={<RestaurantPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
