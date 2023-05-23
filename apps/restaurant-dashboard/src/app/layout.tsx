"use client"
import { NextAuthProvider} from "./providers";
import "../app/globals.css";

export default function RootLayout({ children }: any) {

  return (
    <body suppressHydrationWarning={true} >
    <NextAuthProvider  >{children}</NextAuthProvider>
    </body>
  )
}

