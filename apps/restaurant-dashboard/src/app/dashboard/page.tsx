"use client"
import { useSession } from "next-auth/react";
import Dashboard from '../../components/dashboard/Dashboard';
import { useRouter } from 'next/navigation';

export default function Index() {

const { data: session } = useSession();
const user = session?.user;
const router = useRouter();


  return (
        <Dashboard user={user}/>
  )
}
