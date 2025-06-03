'use client';
import Navbar from "./components/Navbar";
import "./globals.css";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [menu,setMenu] = useState(false);
  return (
    <html lang="en" className="h-full">
      
      <body className={`bg-black h-full w-full`}>
        <div className="lg:w-3/4 lg:min-h-screen lg:flex-row flex flex-col w-full min-h-screen bg-black mx-auto relative">
          {<Navbar menu={menu} setMenu={setMenu}/>}
          {menu && (
            <div className="absolute inset-0 backdrop-blur-[1px] bg-black/20 z-10 pointer-events-none transition-all duration-300" />
                    )}
          <div className="lg:w-5/6 flex flex-1 lg:outline lg:outline-gray-500 lg:outline-1 w-full min-h-screen">
          {children}
          </div>
        </div>
      </body>
    </html>
  );
}
