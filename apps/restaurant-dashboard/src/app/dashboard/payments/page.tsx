"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Index() {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  return (<>Payment</>)
}