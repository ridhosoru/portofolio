'use client';
import { motion } from "framer-motion";
import React, { useState,useEffect, act } from 'react';
import { FaPython,FaJs,FaReact,FaRaspberryPi,FaArrowRight,FaLinkedin,FaGithub,FaInstagram  } from "react-icons/fa";
import Profile from "./components/Profile";
import Form from "./components/Form";

export default function Home(){
    const [contact,setContact] = useState(false);
    const [repos, setRepos] = useState([]);
    const [even,setEven] = useState([]);
    const [activity,setActivity] =useState([]);
    const [loading,setLoading] = useState(false);
    const [actloading,setactLoading] = useState(false);
    

    useEffect(()=>{
        const fetchRepos = async ()=>{
            setLoading(true);
            const res = await fetch('/api/githubLast');
            const data = await res.json();
            console.log(data);
            setRepos(data[0]);
            setLoading(false);
        };
        fetchRepos();
    }, []);

    useEffect(()=>{
        const fetchEven = async ()=>{
            setactLoading(true)
            const res = await fetch('/api/githubactivity');
            const data = await res.json();
            console.log(data);
            setEven(data);
            setactLoading(false)
        };
        fetchEven();
    }, []);
    

    useEffect(()=>{
        if (even.length === 0) return;
        const newActivity = [];
        const data = even[0];
        const {type,repo,created_at} = data;
        if (!data) return;
        const repoName = repo.name;
        const createdAt = created_at;
        
        
        if(type === 'PushEvent'){
            
            const commits = data.payload.commits;
            commits.forEach(commit=>{
                newActivity.push({
                    name : repoName,
                    activity: createdAt,
                    message : commit.message,
                    project : commit.url,
                })
            })
        }
        else{
            
            const repoName = data.repo.name;
            const createdAt = data.created_at;
            newActivity.push({
                name: repoName,
                activity: created_at,
                message: type,
                project: `https://github.com/${repoName}`
                });
        }
        setActivity(newActivity);
    
    },[even])

    let DateUpdate = "Unknown Date";
    if (repos.updated_at && typeof repos.updated_at === 'string') {
    DateUpdate = repos.updated_at.split("T")[0];
    }

    

    const connitem = [
            {icon : <FaLinkedin/>, link : "https://www.linkedin.com/in/ridhosoru/"},
            {icon : <FaGithub/>, link : "https://github.com/ridhosoru"},
            {icon :<FaInstagram/>, link : "https://www.instagram.com/ridhosoru/"}
                ];

    return (
        <div className="lg:w-full lg:h-full h-full w-full">
            <motion.div className="hidden lg:block"  
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}>
                <div className="w-full h-52">
                    <div className="w-4/5 h-48 mt-2 ml-2">
                        <div className="flex gap-2">
                            <div className="text-white font-inter font-bold text-3xl">Hi!!!</div>
                            <motion.span
                                className="inline-block origin-bottom text-xl"
                                animate={{
                                rotate: [0, 10, -8, 5, -8, 10, 0],
                                }}
                                transition={{
                                repeat: Infinity,
                                duration: 1.5,
                                ease: "easeInOut",
                                }} 
                            >👋</motion.span>

                        </div>
                        
                        <div className="flex gap-2">
                            <div className="text-white font-inter font-bold text-3xl">I'm</div>
                            <div className="text-[#FA812F] font-inter font-bold text-3xl">Yohanes Ridho Soru</div>
                        </div>
                        <div className="text-gray-500 font-inter">Batam,Riau Island - Indonesia</div>
                        <div className="italic font-inter text-white">"An ordinary guy with an interest in the world of programming and electricity"</div>
                        <div className="mt-2 flex gap-5">
                            <button className="buttonD">Download CV</button>
                            <button className={`${contact ?'buttonC': 'buttonD'}`}
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        setContact(!contact);
                                    }}
                            >{contact? <FaArrowRight/> :"Contact Me"}</button>
                            {contact && (connitem.map((item,index)=>(
                                <a href={item.link} target="_blank" className="buttonC" key={index}>{item.icon}</a>
                            )))}
                        </div>
                        </div>
                </div>
                <div className="w-[98%] h-1 bg-gray-500 rounded-xl flex mx-auto"></div>
                <div className="w-full min-h-screen mt-5 flex flex-col">
                    <Profile/>
                    
                </div>
                <div className="w-[98%] h-1 bg-gray-500 rounded-xl flex mx-auto mb-2"></div>

                <div className="w-full h-96 mt-5 flex">
                    <div className="w-1/2 h-full flex flex-col items-center">
                        <div className="text-[#FA812F] font-inter font-bold text-xl">Project Updated</div>
                        <div className="w-3/4 h-4/5 mt-5 outline outline-1 outline-gray-500 rounded-lg flex items-end">
                            <div className="w-full h1/4 p-2">
                            {!loading ?(
                                <>
                                <div className="text-white font-inter font-bold text-3xl">{repos.name}</div>
                                <div className="text-[#FA812F] font-inter">{repos.language}</div>
                                <div className="flex w-full h-full justify-between ">
                                    <div className="text-gray-500 font-inter">{DateUpdate}</div>
                                    <div className={`w-24 h-6 justify-center flex rounded-md items-center outline outline-1 ${repos.topics === "onprogress" ? 'outline-green-500 text-green-500' : 'text-yellow-500 outline-yellow-500'} outline-gray-100 text-white`}>{repos.topics === "onprogress" ? 'Finish' : 'On Progress'}</div>
                                </div>
                                </>
                            ) :(
                                <motion.div
                                            style={{
                                                width: 50,
                                                height: 50,
                                                border: "5px solid #FA812F",
                                                borderTopColor: "transparent",
                                                borderRadius: "50%",
                                                margin: "auto",
                                            }}
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                            />
                            )}
                            </div>    
                        </div>
                     </div>
                    <div className="w-1/2 h-full  flex flex-col items-center">
                        <div className="text-[#FA812F] font-inter font-bold text-xl">Last Activity</div>
                        <div className="w-3/4 h-4/5 outline outline-1 outline-gray-500 rounded-lg mt-5 flex justify-center items-center">
                        {!actloading?(
                            <div className="w-full h-full flex justify-center items-center">
                                {activity.map((item,index)=>(
                                    <div key={index} className="text-white flex flex-col text-center gap-5">
                                        <div>
                                            <div className="text-[#FA812F]">Project</div>
                                            <div>{item.name}</div>
                                        </div>
                                        <div>
                                            <div className="text-[#FA812F]">Date Time</div>
                                            <div>{item.activity.replace('T', ' ').replace('Z', '')}</div>
                                        </div>
                                        <div>
                                            <div className="text-[#FA812F]">Activity</div>
                                            <div>{item.message}</div>
                                        </div>
                                    </div>
                                ))}  
                            </div>
                        )
                    :(
                        <motion.div
                                style={{
                                    width: 50,
                                    height: 50,
                                    border: "5px solid #FA812F",
                                    borderTopColor: "transparent",
                                    borderRadius: "50%",
                                    margin: "auto",
                                }}
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                />
                    )
                    }
                        </div>
                    </div>
                </div>
                <div className="w-[98%] h-1 bg-gray-500 rounded-xl flex mx-auto mb-2"></div>
                <div className="w-full h-[500px]">
                    <Form/>
                </div>
                <div className="w-[98%] h-1 bg-gray-500 rounded-xl flex mx-auto mb-2"></div>
            </motion.div>
            <div className="block lg:hidden">
                <div className="w-11/12 h-80  mt-16 flex flex-col mx-auto items-center justify-center text-white">
                    <div className="flex gap-2">
                                <div className="text-white font-inter font-bold text-2xl">Hi!!!</div>
                                <motion.span
                                    className="inline-block origin-bottom text-xl"
                                    animate={{
                                    rotate: [0, 10, -8, 5, -8, 10, 0],
                                    }}
                                    transition={{
                                    repeat: Infinity,
                                    duration: 1.5,
                                    ease: "easeInOut",
                                    }} 
                                >👋</motion.span>
                    </div>
                    <div className="flex gap-2">
                            <div className="text-white font-inter font-bold text-2xl">I'm</div>
                            <div className="text-[#FA812F] font-inter font-bold text-2xl">Yohanes Ridho Soru</div>
                    </div>
                    <div className="text-gray-500 font-inter">Batam,Riau Island - Indonesia</div>
                    <div className="italic font-inter text-white text-center">"An ordinary guy with an interest in the world of programming and electricity"</div>
                    
                    <button className="buttonD mt-2">Download CV</button>
                    <div className="flex mt-2 gap-4">
                    <button className={`${contact ?'buttonC': 'buttonD'}`}
                            onClick={(e)=>{
                                e.preventDefault();
                                setContact(!contact);
                            }}
                    >{contact? <FaArrowRight/> :"Contact Me"}</button>
                    {contact && (connitem.map((item,index)=>(
                        <a href={item.link} target="_blank" className="buttonC" key={index}>{item.icon}</a>
                    )))}
                    </div>
                <div className="w-full mt-8 h-1 bg-gray-500 rounded-xl flex mx-auto">
                    
                </div>
                            
                </div>
                
            </div>
        </div>
    )
}
