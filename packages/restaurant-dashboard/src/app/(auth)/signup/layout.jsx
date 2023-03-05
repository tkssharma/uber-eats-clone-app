"use client"

import '../../globals.css';

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
    <head />
    <body className="flex justify-center">
      <div className="w-1/4 m-auto">
      {children} 
      </div>
    </body>
    </html>
  );
}

