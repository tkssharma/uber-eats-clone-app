import { BrowserRouter, Route, Routes, Link, Outlet } from 'react-router-dom';
import Banner from './banner';
import MenuItem from './menu-items';

function Home() {
  return (
    <>
       <Banner />
       <MenuItem />
    </>
  )
}

export default Home;