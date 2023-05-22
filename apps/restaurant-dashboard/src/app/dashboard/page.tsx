"use client"
import { useSession } from "next-auth/react";
import Dashboard from '../../components/dashboard/Dashboard';

export default function Index() {

const { data: session } = useSession();
const user = session?.user;

  return (
        <Dashboard user={user}/>
  )
}
