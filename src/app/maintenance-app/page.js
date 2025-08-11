"use client"; 

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";

export default function MaintenanceApp(){

    const [readme, setReadme] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReadme = async () => {
        try {
            const res = await fetch("/api/getReadmeMtc");
            if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setReadme(data.readme || "");
        } catch (err) {
            console.error("Error fetching README:", err);
        } finally {
            setLoading(false);
        }
        };

        fetchReadme();
    }, []);


    return(
        <>
            <div className="w-full min-h-screen">
                <div className="hidden lg:block">
                    <div className="w-full h-40 ">
                        <div className="text-[#FA812F] text-2xl font-inter font-bold flex mt-2 justify-center items-center">Maintenance App</div>
                        <div className="text-white mt-10 ml-2">Maintenance App vesion 1.0 has release!!!!</div>
                        <a href="#" className="text-[#FA812F] ml-2">Download Here</a>
                        <div className="w-[98%] h-1 bg-gray-500 rounded-xl mt-5 flex mx-auto"></div>
                    </div>
                    <div className="prose prose-invert w-10/12 mx-auto min-h-screen text-white">
                        <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}>
                            {readme}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </>
    );
}