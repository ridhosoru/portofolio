'use client';
import { useState } from "react"
import { motion } from "framer-motion";

export default function Form(){
    const[send,setSend] = useState("");
    const [form, setForm] = useState({ email: "", message: "" });
    const [close,setClose] = useState(false);
    const [loading,setLoading] = useState(false);

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setClose(false);

        try {
            setLoading(true);
            const res = await fetch("/api/sendmessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
            });
            console.log("Response status:", res.status);
            if (!res.ok) {
            const text = await res.text(); 
            throw new Error(`Server error: ${text}`);
            }
            setLoading(false);
            const data = await res.json();
            setSend(data.send ?  "Failed: " : "Sent!" + data.message);
            setForm({ email: "", message: "" });
            
        } catch (err) {
            console.error("Error:", err);
            setSend("Error sending message");
        }
        };
        

    return(
        <>
        
        <div className="hidden lg:block relative w-11/12  mt-5 mx-auto ">
            {!loading ?(
            <>
            <div className="w-full flex justify-center items-center">
                <div className="text-xl font-bold text-[#FA812F] font-inter">Send Message</div>
            </div>
            <div className="w-full mx-auto mt-5 h-96 outline outline-2 outline-gray-500 rounded-lg flex flex-col">
                <div className="w-full h-1/4 flex gap-5 mx-auto py-5 justify-center">
                    <div className="text-[#FA812F] font py-2 font-inter">Email :</div>
                    <input
                        name="email" 
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                    className="w-3/4 h-8 rounded-lg  mt-2 outline outline-2 outline-gray-500 bg-black autofill:bg-black text-white">
                    </input>
                </div>
                <div className="w-full h-3/4  flex gap-5 mx-auto justify-center ">
                    <div className="text-[#FA812F] font py-2 font-inter">Message :</div>
                    <textarea 
                        name="message" 
                        type="textarea" 
                        value={form.message}
                        onChange={handleChange}
                    className="w-3/4 h-52 rounded-lg  mt-2 mr-5 outline outline-2 outline-gray-500 bg-transparent  text-white"></textarea >
                </div>
                <div className="flex justify-end px-16 py-5"> 
                    <button onClick={handleSubmit} type="submit" className="buttonD">Send</button>
                </div>
                {send && !close &&(
                    
                    <>
                     <div className=" fixed inset-0 backdrop-blur-[1px] bg-black/20 z-10 pointer-events-none transition-all duration-300" />
                    <div className="fixed inset-0 h-40 w-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FA812F] z-30 rounded-lg text-black">
                        <div className="flex flex-col w-full h-full text-center items-center justify-center"> 
                            <div>{send}</div>
                            <button
                            onClick={(e)=>{
                                e.preventDefault();
                                setClose(true);
                            }}

                             className="h-10 w-20 rounded-lg mt-5 bg-black text-white">Close</button>
                        </div>
                        
                    </div>
                    </>
                    
                )}
            </div>
            </>):(
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
        <div className="block lg:hidden relative w-full mt-5 mx-auto ">
        {!loading ?(
            <>
            <div className="w-full flex justify-center items-center">
                <div className="text-xl font-bold text-[#FA812F] font-inter">Send Message</div>
            </div>
            <div className="w-11/12 mx-auto mt-5 h-96 flex flex-col">
                <div className="w-full h-1/4 flex gap-5 mx-auto py-5 justify-center">
                    <div className="text-[#FA812F] font py-2 font-inter">Email :</div>
                    <input
                        name="email" 
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                    className="w-3/5 h-8 rounded-lg  mt-2 outline outline-2 outline-gray-500 bg-black autofill:bg-black text-white">
                    </input>
                </div>
                <div className="w-full h-3/4  flex gap-5 mx-auto justify-center ">
                    <div className="text-[#FA812F] font py-2 font-inter">Message :</div>
                    <textarea 
                        name="message" 
                        type="textarea" 
                        value={form.message}
                        onChange={handleChange}
                    className="w-3/5 h-52 rounded-lg  mt-2 mr-5 outline outline-2 outline-gray-500 bg-transparent  text-white"></textarea >
                </div>
                <div className="flex justify-end px-16 py-5"> 
                    <button onClick={handleSubmit} type="submit" className="buttonD">Send</button>
                </div>
                {send && !close &&(
                    
                    <>
                     <div className=" fixed inset-0 backdrop-blur-[1px] bg-black/20 z-10 pointer-events-none transition-all duration-300" />
                    <div className="fixed inset-0 h-40 w-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#FA812F] z-30 rounded-lg text-black">
                        <div className="flex flex-col w-full h-full text-center items-center justify-center"> 
                            <div>{send}</div>
                            <button
                            onClick={(e)=>{
                                e.preventDefault();
                                setClose(true);
                            }}

                             className="h-10 w-20 rounded-lg mt-5 bg-black text-white">Close</button>
                        </div>
                        
                    </div>
                    </>
                    
                )}
            </div>
            </>):(
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
        </>
    )
}