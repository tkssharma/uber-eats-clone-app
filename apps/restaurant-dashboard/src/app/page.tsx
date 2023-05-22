"use client"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useEffect } from "react";
import Header from '../auth/Header';
import Link from "next/link";
export default function Home() {

  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;


  return (
    <html lang="en">
      <body>
      <>
      <Header
        user={user}
        heading={`Welcome ${user?.email? user?.email : "" } to Your Admin console Dashboard`}
        paragraph=""
        linkName="SignIn"
        linkUrl="/signin"
      />
      <Link className='flex justify-center mx-auto' href="/dashboard" >Home Page</Link>
    </>
      </body>
    </html>
  )
}

