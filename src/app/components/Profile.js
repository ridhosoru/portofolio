export default function Profile(){
     const exp = [
        {instansi:'Batam State Polytechnic',division:'Electrical Engineering', year:'(2020-2024)'},
        {instansi:'PT.Philips Industries',division:'Data Analytic Engineering', year:'(2023-2024)'}
    ];

    const proexp =[
        {name :'Holographic LED Fan Display', position:'Project Leader,Program division',year :'(2021)'},
        {name :'Automation Selection Wire Box', position:'Software Developer,Microcontroller Programmer',year :'(2022)'},
        {name :'Classification Product using YOLO v7 and Raspy4B', position:'Software Developer,Microcontroller Programmer,ML',year :'(2023)'},
        {name :'Prediction Measurement using sklearn-decision tree', position:'Software Developer,ML',year :'2024'},
        {name :'MTC APP using PyQt6', position:'Software Developer',year :'2025'},
    ];
    return(
        <>
        <div className="hidden lg:block">
            <div className="w-full h-full flex flex-col">
                <div className="flex justify-center items-center">
                    <div className="text-[#FA812F] font-inter font-bold text-2xl">Profile</div>
                </div>
                <div className="flex justify-center items-center mt-5">
                    <div className=" flex items-center justify-center h-11/12 w-11/12">
                    <div className="text-white font-inter text-center italic">
                        <span>
                            "Ridho is a graduate of the Batam State Polytechnic majoring in Electrical Engineering with the Mechatronics Engineering Study Program.
                    He is very hardworking,ambitious and has a high level of creativity and has the ability to quickly adapt to a new environment so that he can work under pressure. 
                    Ridho has experience working as data analytic engineer in PT.Philips Industries Batam.During studies, 
                    in addition to diligently studying so as to maintain excellent grades, Ridho participated in several campus projects and also joined the campus press organization.
                    Ridho has an interest in software development, microcontrollers, automation, electrical, and IOT, but he will always be open to learn something new."
                        </span>
                    </div>
                </div>
                </div>
                <div className="w-full h-full mt-5 ">
                    <div className="flex justify-center items-center">
                        <div className="text-[#FA812F] font-inter font-bold text-xl">Experience</div>
                    </div>
                    <div className="w-full h-3/4 mt-6 flex flex-row">
                        <div className="w-1/2 h-96 ">
                            <div className="text-[#FA812F] font-inter flex justify-center mt-2">Journey</div>
                            <div className="flex justify-center items-center mt-5 w-11/12 h-1/2 mx-auto">
                                <div className={`w-1 rounded-xl bg-[#FA812F] relative`}
                                        style={{height:`${(exp.length *40)}px`}}
                                >
                                    {exp.map((item,index)=>(
                                        <div className="flex- flex-col"
                                            key={index}
                                        >
                                            <div className={`absolute -translate-x-1 w-3 h-3 rounded-full bg-[#FA812F] `}
                                                    style={{ top: `${(index / (exp.length - 1)) * 100}%` }}
                                            ></div>
                                            <div className={`absolute  ${index % 2 === 0  ? 'left-[1px]' : 'right-[1px]'} -translate-x-1 mx-4 `}
                                                    style={{ top: `${(index / (exp.length - 1)) * 100}%` }}
                                            >
                                                <div className="w-40 h-full font-inter">
                                                    <div className="text-white text-[12px] text-center">{item.division}</div>
                                                    <div className="text-white text-[10px] text-center">{item.instansi}</div>
                                                    <div className="text-gray-400 text-[8px] text-center italic">{item.year}</div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 h-11/12 ">
                            <div className="text-[#FA812F] font-inter flex justify-center mt-2">Project Experience</div>
                            <div className="flex justify-center items-center w-11/12 h-full mx-auto ">
                                <div className={`w-1 rounded-xl bg-[#FA812F] relative`}
                                        style={{height:`${(proexp.length *60)}px`}}
                                >
                                    {proexp.map((item,index)=>(
                                        <div className="flex- flex-col"
                                            key={index}
                                        >
                                            <div className={`absolute -translate-x-1 w-3 h-3 rounded-full bg-[#FA812F] `}
                                                    style={{ top: `${(index / (proexp.length - 1)) * 100}%` }}
                                            ></div>
                                            <div className={`absolute  ${index % 2 === 0  ? 'left-[1px]' : 'right-[1px]'} -translate-x-1 mx-4 `}
                                                    style={{ top: `${(index / (proexp.length - 1)) * 100}%` }}
                                            >
                                                <div className="w-52 h-full font-inter">
                                                    <div className="text-white text-[12px] text-center">{item.name}</div>
                                                    <div className="text-white text-[10px] text-center">{item.position}</div>
                                                    <div className="text-gray-400 text-[8px] text-center italic">{item.year}</div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div className="block lg:hidden w-full">
            <div className=" w-full mt-5 h-auto ">
                <div className="flex justify-center items-center">
                    <div className="text-[#FA812F] font-inter font-bold text-2xl">Profile</div>
                </div>
                <div className="flex justify-center items-center mt-5">
                    <div className=" flex items-center justify-center h-11/12 w-11/12">
                    <div className="text-white font-inter text-center italic">
                        <span>
                            "Ridho is a graduate of the Batam State Polytechnic majoring in Electrical Engineering with the Mechatronics Engineering Study Program.
                    He is very hardworking,ambitious and has a high level of creativity and has the ability to quickly adapt to a new environment so that he can work under pressure. 
                    Ridho has experience working as data analytic engineer in PT.Philips Industries Batam.During studies, 
                    in addition to diligently studying so as to maintain excellent grades, Ridho participated in several campus projects and also joined the campus press organization.
                    Ridho has an interest in software development, microcontrollers, automation, electrical, and IOT, but he will always be open to learn something new."
                        </span>
                    </div>
                </div>
                </div>
                <div className="w-full h-auto  mt-5">
                    <div className="text-[#FA812F] font-inter flex justify-center mt-2">Journey</div>
                </div>
                <div className="w-full h-auto  flex justify-center mt-5">
                    <div className={`w-1 rounded-xl bg-[#FA812F] relative`}
                            style={{height:`${(exp.length *40)}px`}}
                    >
                        {exp.map((item,index)=>(
                            <div className="flex- flex-col"
                                key={index}
                            >
                                <div className={`absolute -translate-x-1 w-3 h-3 rounded-full bg-[#FA812F] `}
                                        style={{ top: `${(index / (exp.length - 1)) * 100}%` }}
                                ></div>
                                <div className={`absolute  ${index % 2 === 0  ? 'left-[1px]' : 'right-[1px]'} -translate-x-1 mx-4 `}
                                        style={{ top: `${(index / (exp.length - 1)) * 100}%` }}
                                >
                                    <div className="w-40 h-full font-inter">
                                        <div className="text-white text-[12px] text-center">{item.division}</div>
                                        <div className="text-white text-[10px] text-center">{item.instansi}</div>
                                        <div className="text-gray-400 text-[8px] text-center italic">{item.year}</div>
                                    </div>
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="h-auto w-full  mt-12">
                    <div className="text-[#FA812F] font-inter flex justify-center mt-2">Project Experience</div>
                    <div className="w-full h-auto  flex justify-center mt-5">
                    <div className={`w-1 rounded-xl bg-[#FA812F] relative`}
                                style={{height:`${(proexp.length *60)}px`}}
                        >
                            {proexp.map((item,index)=>(
                                <div className="flex- flex-col"
                                    key={index}
                                >
                                    <div className={`absolute -translate-x-1 w-3 h-3 rounded-full bg-[#FA812F] `}
                                            style={{ top: `${(index / (proexp.length - 1)) * 100}%` }}
                                    ></div>
                                    <div className={`absolute  ${index % 2 === 0  ? 'left-[1px]' : 'right-[1px]'} -translate-x-1 mx-4 `}
                                            style={{ top: `${(index / (proexp.length - 1)) * 100}%` }}
                                    >
                                        <div className="w-40 h-full font-inter">
                                            <div className="text-white text-[12px] text-center">{item.name}</div>
                                            <div className="text-white text-[10px] text-center">{item.position}</div>
                                            <div className="text-gray-400 text-[8px] text-center italic">{item.year}</div>
                                        </div>
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                

                </div>

            </div>
        </div>
        </>
    )
}