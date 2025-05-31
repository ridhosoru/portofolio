'use client';
import { FaHome,FaProjectDiagram  } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar(){
    const pathname = usePathname();
    const [menu,setMenu] = useState(false);

    const NavbarItem = [
        {icon:<FaHome/>, name: 'Home', path:'/'},
        {icon:<FaProjectDiagram/>, name: 'Project', path:'/project'},
        {icon:<FiActivity/>, name: 'Activity', path : '/activity'},
    ];
    return (
            <div className="lg:w-1/6 lg:h-full sm:w-full sm:h-20 ">
                <div className="hidden lg:block">
                    <div className="flex flex-col items-center  mt-2">
                        <div className="text-white text-xl font-bold">Welcome</div>
                        <div className="w-20 h-20 bg-white rounded-full mt-10"></div>
                        <div className="text-white text-lg mt-2">Ridho Soru</div>
                        <div className="w-full h-60 mt-20">
                            {NavbarItem.map((item,index)=>(
                            <Link  href={item.path}
                                    className={`w-full h-10  gap-2 mt-5 text-xl flex items-center ${pathname === item.path ? 'bg-gray-500 rounded-lg' : 'bg-transparent' } transition-all duration-500`}
                                    key={index}>
                                <div className="text-white">{item.icon}</div>
                                <div className="text-white">{item.name}</div>
                            </Link>
                        ))}
                        </div>  
                    </div>
                </div>
                <div className="lg:hidden">
                    {menu && (
                        <div className="absolute inset-0 backdrop-blur-[1px] bg-black/20 z-10 pointer-events-none transition-all duration-300" />
                    )}
                    <div className="fixed  w-full h-10  outline-1 outline-gray-500 flex justify-between">
                        <div className="text-white ml-3 text-3xl">Welcome</div>
                        <button className="text-white text-3xl mr-3"
                                onClick={(e)=>{
                                    setMenu(true);
                                    console.log(menu);
                                    e.preventDefault();
                                }}
                        ><IoMdMenu/></button>
                    </div>
                </div>
                {menu &&(
                        <div className="absolute top-1/2 left-1/2 w-52 h-52 outline-1 outline-gray-500 bg-white rounded-xl transform -translate-x-1/2 -translate-y-1/2 z-30">
                            <div className="flex justify-end mr-2 text-3xl font-bold">
                                <button
                                        onClick={(e)=>{
                                            e.preventDefault();
                                            setMenu(false);
                                        }}
                                ><IoMdClose/></button>
                            </div>
                            <div className="h-52 w-52 items-center flex justify-center">
                                <div className="w-2/3 h-2/3  mb-16 flex flex-col items-center justify-center">
                                {NavbarItem.map((item,index)=>(
                                    <Link href={item.path}
                                            key={index}
                                            onClick={(e)=>{setMenu(false);}}
                                            className="flex mt-4 gap-2 items-center justify-center border-b-4">
                                        <div className="text-xl">{item.icon}</div>
                                        <div className="text-xl">{item.name}</div>
                                    </Link>
                                ))}
                                </div>
                            </div>
                        </div>
                    )}
            </div>
    )
}