"use client"

import "../globals.css";

import React, { Fragment, useState } from "react";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import Sidebar from "../../components/layout/Sidebar";
import { useSession } from "next-auth/react";


export default function RootLayout({ children }: any) {

  const [mobileNavsidebar, setMobileNavsidebar] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <html lang="en">
    <head />
    <body>

    <div className="flex bg-gray-100 min-h-screen relative">
        
        <Sidebar mobileNavsidebar={mobileNavsidebar} />
        
        <div className="flex-grow text-gray-800">
        <Header user={user} mobileNavsidebar={mobileNavsidebar} setMobileNavsidebar={setMobileNavsidebar} />
            {children}
        </div>

      <Footer />
    </div> 

    </body>
    </html>
  );
}

