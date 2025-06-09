'use client';
import { motion } from "framer-motion";
import React, { useState,useEffect, use } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Buffer } from 'buffer';

export default function Project(){
    const [project,setProject] = useState([]);
    const [loading,setLoading] = useState(false);
    const [detail,setDetail] = useState(null);
    const [readmes, setReadmes] = useState('');
    const [loadingReadme, setLoadingReadme] = useState(false);

    const handleDetailClick = async (index) => {
  setDetail(index);
  setLoadingReadme(true);

  try {
    const res = await fetch(`/api/getReadme?index=${index}`);
    const data = await res.json();

    if (res.ok) {
      let readmeString;

      if (typeof data.readme === "string") {
        readmeString = data.readme;
      } else if (typeof data.readme === "object" && data.readme !== null) {
        readmeString = data.readme.content || JSON.stringify(data.readme, null, 2);
      } else {
        readmeString = "README tidak tersedia.";
      }

      setReadmes(readmeString);
    } else {
      setReadmes(`Error: ${data.error}`);
    }
  } catch (err) {
    setReadmes('Gagal mengambil README');
  } finally {
    setLoadingReadme(false);
  }
};



    useEffect(()=>{
        const fetchProject = async ()=>{
            setLoading(true);
            const res = await fetch('/api/github');
            const data = await res.json();
            
            setProject(data);
            setLoading(false)
        }
        fetchProject();

    },[]);



    return(
        <div className="w-full min-h-screen">
            <motion.div className="hidden lg:block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
            >
                {detail !== null && (
                    <div className="absolute inset-0 backdrop-blur-[1px] bg-black/20 z-10 pointer-events-none transition-all duration-300" />
                        )}
                <div className="text-[#FA812F] text-2xl font-inter font-bold flex mt-2 justify-center items-center">Project</div>
                <div className="flex flex-wrap w-full justify-between px-10 min-h-screen mx-auto">
                    {project.map((item,index)=>(
                    <div className="w-2/5 h-80 flex relative items-end mt-10 rounded-lg outline outline-2 outline-gray-500"
                            key={index}
                        >
                            
                            {!loading ?(
                            <div className="w-full h-1/4 mb-2 px-2 flex flex-col">
                                <div className="text-white text-xl font-inter font-bold">{item.name}</div>
                                <div className="text-[#FA812F] text-lg font-inter">{item.language}</div>
                                <div className="w-full h-full flex justify-between">
                                    <div className="text-gray-500 ">{item.updated_at.replace('T', ' ').replace('Z', '')}</div>
                                    <button className={`w-24 h-6 justify-center flex rounded-md items-center outline outline-1 ${item.topics?.includes("finish") ? 'outline-green-500 text-green-500' : 'text-yellow-500 outline-yellow-500'} outline-gray-100`}
                                        onClick={(e)=>{
                                            e.preventDefault();
                                            setDetail(index);
                                            handleDetailClick(index);

                                        }}
                                    >{item.topics?.includes("finish") ?'finish'  :'On Progress' }</button>
                                    
                                </div>
                            </div>):
                        (
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
                        {detail == index &&(
                            <div className="fixed w-[600px] h-[700px] z-20 bg-black overflow-x-hidden overflow-y-auto rounded-lg top-1/2 left-[790px] transform -translate-x-1/2 -translate-y-1/2 outline outline-2 outline-gray-500 ">
                                <div className="flex justify-end px-2 py-2 ">
                                    <button>
                                        <IoMdCloseCircle className="text-white text-3xl "
                                        onClick={(e)=>{e.preventDefault(); setDetail(null)}}
                                    /> </button>
                                </div>
                                {!loadingReadme?(
                                <div className="prose w-full prose-invert max-w-none text-white">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {readmes}
                                    </ReactMarkdown>
                                </div>
                                ): (
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
                        )}
                        </div>
                    
                    ))}
                </div>
                
                
            </motion.div>
            <div className="block lg:hidden mt-14 w-full h-auto">
                {detail !== null && (
                    <div className="absolute inset-0 backdrop-blur-[1px] bg-black/20 z-10 pointer-events-none transition-all duration-300" />
                        )}
                <div className="text-[#FA812F] text-2xl font-inter font-bold flex mt-2 justify-center items-center">Project</div>
                <div className="flex flex-col w-full justify-between min-h-screen mx-auto">
                    {project.map((item,index)=>(
                    <div className="w-4/5 h-96 flex relative items-end mx-auto mt-10 rounded-lg outline outline-2 outline-gray-500"
                            key={index}
                        >
                            {!loading ?(
                            <div className="w-full h-1/4 px-2 flex flex-col">
                                <div className="text-white text-xl font-inter font-bold">{item.name}</div>
                                <div className="text-[#FA812F] text-lg font-inter">{item.language}</div>
                                <div className="w-full h-full flex justify-between">
                                    <div className="text-gray-500 ">{item.updated_at.replace('T', ' ').replace('Z', '')}</div>
                                    <button className={`w-24 h-6 justify-center flex rounded-md items-center outline outline-1 ${item.topics?.includes("finish") ? 'outline-green-500 text-green-500' : 'text-yellow-500 outline-yellow-500'} outline-gray-100 `}
                                        onClick={(e)=>{
                                            e.preventDefault();
                                            setDetail(index)
                                            handleDetailClick(index);

                                        }}
                                    >{item.topics?.includes("finish") ?'finish'  :'On Progress' }</button>
                                </div>
                            </div>):
                        (
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
                        {detail == index &&(
                            <div className="fixed w-3/4 h-4/5 z-20 bg-black overflow-y-auto overflow-x-hidden rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 outline outline-2 outline-gray-500 ">
                                <div className="flex justify-end px-2 py-2">
                                    <button>
                                        <IoMdCloseCircle className="text-white text-3xl "
                                        onClick={(e)=>{e.preventDefault(); setDetail(null)}}
                                    /> </button>
                                </div>
                                {!loadingReadme?(
                                <div className="prose w-full prose-invert max-w-none text-white">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {readmes}
                                    </ReactMarkdown>
                                </div>
                                ): (
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
                        )}
                        </div>
                    
                    ))}
                </div>
            </div>
        </div>
    )
}