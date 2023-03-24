"use client"

import "../globals.css";

import React, { Fragment, useState } from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";

export default function RootLayout({ children }) {

  const [mobileNavsidebar, setMobileNavsidebar] = useState(false);

  return (
    <html lang="en">
    <head />
    <body>

    <div className="flex bg-gray-100 min-h-screen relative">
        
        <Sidebar mobileNavsidebar={mobileNavsidebar} />
        
        <div className="flex-grow text-gray-800">
        <Header mobileNavsidebar={mobileNavsidebar} setMobileNavsidebar={setMobileNavsidebar} />
            {children}
        </div>

      <Footer />
    </div> 

    </body>
    </html>
  );
}

