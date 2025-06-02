'use client';
import { useState } from "react"

export default function Form(){
    const[send,setSend] = useState("");
    const [form, setForm] = useState({ email: "", message: "" });

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
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

            const data = await res.json();
            setSend(data.send ? "Sent!" : "Failed: " + data.message);
        } catch (err) {
            console.error("Error:", err);
            setSend("Error sending message");
        }
        };
        

    return(
        <div className="w-11/12 h-96 mt-5 mx-auto ">
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
                    className="w-3/4 h-8 rounded-lg  mt-2 outline outline-2 outline-gray-500 bg-transparent text-white">
                    </input>
                </div>
                <div className="w-full h-3/4  flex gap-5 mx-auto justify-center ">
                    <div className="text-[#FA812F] font py-2 font-inter">Message :</div>
                    <textarea 
                        name="message" 
                        type="textarea" 
                        value={form.message}
                        onChange={handleChange}
                    className="w-3/4 h-52 rounded-lg  mt-2 mr-5 outline outline-2 outline-gray-500 bg-transparent text-white"></textarea >
                </div>
                <div className="flex justify-end px-16 py-5"> 
                    <button onClick={handleSubmit} type="submit" className="buttonD">Send</button>
                </div>
            </div>
        </div>
    )
}