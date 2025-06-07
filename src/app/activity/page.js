'use client';
import { useEffect, useState } from "react"
import { motion } from "framer-motion";

export default function Activity(){
    const[activity,getActivity] = useState([]);
    const [contributions, setContributions] = useState([]);
    const [loading,setLoading] = useState(false);
    const [activ,setActiv] = useState([]);


    useEffect(() => {
    const fetchContributions = async () => {
      const res = await fetch('/api/getContribution');
      const data = await res.json();
      setContributions(data);
      setLoading(false);
    };
    fetchContributions();
  }, []);

    useEffect(()=>{
        const fetchActivity = async ()=>{
            setLoading(true);
            const res = await fetch('/api/githubactivity');
            const data = await res.json();
            getActivity(data);
            console.log(data)
            setLoading(false);
        }
        fetchActivity();
    },[])
    
    useEffect(()=>{
        if (!activity || activity.length === 0) return;
        const newActivity=[];
        activity.forEach((event) => {
            const { type, created_at, repo, payload } = event;
            const repoName = repo?.name || "unknown";

            if (type === 'PushEvent' && payload?.commits) {
                payload.commits.forEach((commit) => {
                    newActivity.push({
                        name: repoName,
                        activity: created_at,
                        message: commit.message,
                        project: commit.url,
                    });
                });
            } else {
                newActivity.push({
                    name: repoName,
                    activity: created_at,
                    message: type,
                    project: `https://github.com/${repoName}`,
                });
            }
        });

        setActiv(newActivity);
    }, [activity])
    const weeks = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  const getMonthLabels = () => {
    const labels = [];
    let lastMonth = null;
    weeks.forEach((week, i) => {
      const firstDay = week[0];
      if (!firstDay) return;
      const date = new Date(firstDay.date);
      const month = date.toLocaleString('default', { month: 'short' });
      if (month !== lastMonth) {
        labels.push({ index: i, month });
        lastMonth = month;
      }
    });
    return labels;
  };

  const monthLabels = getMonthLabels();



    return (
        <div className="w-full min-h-screen">
            <div className="hidden lg:block">
                <motion.div className="w-full h-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                >
                    {!loading?(
                    <>
                    <div className="text-[#FA812F] font-inter font-bold justify-center flex mt-2 text-2xl">Activity</div>
                    <div className="w-4/5 h-auto outline outline-2 outline-gray-500 mx-auto mt-5 py-5 rounded-lg">
                        <div className="text-[#FA812F] font-bold font-inter text-xl flex justify-center">Box Contribution Github</div>
                        <div className="overflow-x-auto w-3/4 mx-auto h-auto">
                                <div
                                    className={`inline-grid mb-1`}
                                    style={{
                                    gridTemplateColumns: `repeat(${weeks.length}, 16px)`,
                                    columnGap: '4px' // sesuaikan dengan gap kotak kontribusi (gap-1 = 4px)
                                    }}
                                >
                                    {weeks.map((_, i) => {
                                    const label = monthLabels.find((m) => m.index === i);
                                    return (
                                        <div
                                        key={i}
                                        className="text-xs text-white text-center"
                                        style={{ width: '16px', height: '16px', lineHeight: '16px' }}
                                        >
                                        {label ? label.month : ''}
                                        </div>
                                    );
                                    })}
                                </div>

                                {/* Kotak kontribusi */}
                                <div
                                    className="grid grid-rows-7 grid-flow-col gap-1"
                                    style={{
                                    gridTemplateColumns: `repeat(${weeks.length}, 16px)`
                                    }}
                                >
                                    {weeks.map((week, i) =>
                                    week.map((day, j) => (
                                        <div
                                        key={`${i}-${j}`}
                                        title={`${day.date}: ${day.contributionCount} contributions`}
                                        className="w-4 h-4 rounded-sm"
                                        style={{ backgroundColor: day.color }}
                                        />
                                    ))
                                    )}
                                </div>
                        </div>
                    </div>
                    <div className="w-full h-auto mb-20 ">
                        <div className="flex justify-center items-center mt-5 w-11/12 h-auto mb-20  mx-auto">
                                <div className={`w-1 rounded-xl bg-[#FA812F] relative`}
                                        style={{height:`${(activ.length *40)}px`}}
                                >
                                    {activ.map((item,index)=>(
                                        <div className="flex- flex-col"
                                            key={index}
                                        >
                                            <div className={`absolute -translate-x-1 w-3 h-3 rounded-full bg-[#FA812F] `}
                                                    style={{ top: `${(index / (activ.length - 1)) * 100}%` }}
                                            ></div>
                                            <div className={`absolute  ${index % 2 === 0  ? 'left-[1px]' : 'right-[1px]'} -translate-x-1 mx-4 `}
                                                    style={{ top: `${(index / (activ.length - 1)) * 100}%` }}
                                            >
                                                <div className="w-40 h-full font-inter">
                                                    <div className="text-white text-[12px] text-center">{item.name}</div>
                                                    <div className="text-white text-[10px] text-center">{item.message}</div>
                                                    <div className="text-gray-400 text-[8px] text-center italic">{item.activity.replace('T', ' ').replace('Z', '')}</div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                    </div></>):
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
                </motion.div>
            </div>
            <div className="block lg:hidden">
                <motion.div className="w-full h-auto  mt-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                >
                    {!loading?(
                    <>
                    <div className="text-[#FA812F] font-inter font-bold justify-center flex mt-2 text-2xl">Activity</div>
                    <div className="w-4/5 h-auto outline outline-2 outline-gray-500 mx-auto mt-5 py-5 rounded-lg">
                        <div className="text-[#FA812F] font-bold font-inter text-xl flex justify-center">Box Contribution Github</div>
                        <div className="overflow-x-auto w-3/4 mx-auto h-auto">
                                <div
                                    className={`inline-grid mb-1`}
                                    style={{
                                    gridTemplateColumns: `repeat(${weeks.length}, 16px)`,
                                    columnGap: '4px' // sesuaikan dengan gap kotak kontribusi (gap-1 = 4px)
                                    }}
                                >
                                    {weeks.map((_, i) => {
                                    const label = monthLabels.find((m) => m.index === i);
                                    return (
                                        <div
                                        key={i}
                                        className="text-xs text-white text-center"
                                        style={{ width: '16px', height: '16px', lineHeight: '16px' }}
                                        >
                                        {label ? label.month : ''}
                                        </div>
                                    );
                                    })}
                                </div>

                                {/* Kotak kontribusi */}
                                <div
                                    className="grid grid-rows-7 grid-flow-col gap-1"
                                    style={{
                                    gridTemplateColumns: `repeat(${weeks.length}, 16px)`
                                    }}
                                >
                                    {weeks.map((week, i) =>
                                    week.map((day, j) => (
                                        <div
                                        key={`${i}-${j}`}
                                        title={`${day.date}: ${day.contributionCount} contributions`}
                                        className="w-4 h-4 rounded-sm"
                                        style={{ backgroundColor: day.color }}
                                        />
                                    ))
                                    )}
                                </div>
                        </div>
                    </div>
                    <div className="w-full h-auto mb-20 ">
                        <div className="flex justify-center items-center mt-5 w-11/12 h-auto mb-20  mx-auto">
                                <div className={`w-1 rounded-xl bg-[#FA812F] relative`}
                                        style={{height:`${(activ.length *40)}px`}}
                                >
                                    {activ.map((item,index)=>(
                                        <div className="flex- flex-col"
                                            key={index}
                                        >
                                            <div className={`absolute -translate-x-1 w-3 h-3 rounded-full bg-[#FA812F] `}
                                                    style={{ top: `${(index / (activ.length - 1)) * 100}%` }}
                                            ></div>
                                            <div className={`absolute  ${index % 2 === 0  ? 'left-[1px]' : 'right-[1px]'} -translate-x-1 mx-4 `}
                                                    style={{ top: `${(index / (activ.length - 1)) * 100}%` }}
                                            >
                                                <div className="w-40 h-full font-inter">
                                                    <div className="text-white text-[12px] text-center">{item.name}</div>
                                                    <div className="text-white text-[10px] text-center">{item.message}</div>
                                                    <div className="text-gray-400 text-[8px] text-center italic">{item.activity.replace('T', ' ').replace('Z', '')}</div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                    </div></>):
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
                </motion.div>
            </div>

        </div>
    )
}