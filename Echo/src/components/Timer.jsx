
import React from 'react';
import {useState, useEffect, useRef } from 'react';


export default function Timer(){

   const formatTime = (time) => {
  // Convert total milliseconds to total seconds
  const totalSeconds = Math.floor(time / 1000);

  // Calculate hours, minutes, and remaining seconds
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// :${String(milliseconds).padStart(2, '0')}


    const [time, setTime] = useState(0);
    const [isrunning, setIsRunning] = useState(false);

    const handleStartStop = ()=>{
        setIsRunning(!isrunning);
    }

    const handleReset=()=>{
        setTime(0);
        setIsRunning(false);
    }

    useEffect(()=>{
        let id
        if(isrunning){
            id = setInterval(()=>{
            setTime(prev => prev+100);
        }, 100)
        }
        return(
            () => {
                clearInterval(id);
            }
        );

    }, [isrunning]);

    

    return(
        <div className="flex flex-col items-center justify-center h-[300px] w-[200px] bg-gray-100 border-2 border-black rounded-[20px]">
            <h3 className="text-black text-2xl font-bold p-4 border-b-2 border-black">Timer</h3>
            <h1 
            className='text-black text-4xl font-bold p-4'
            >{formatTime(time)}</h1>

            <div
            className='flex flex-row gap-4 p-4'
            >
                <button
            className='bg-[#9ED6DF] border-2 border-black text-black px-4 py-2 rounded-lg hover:bg-pink-600 hover:translate-y-[3px] transition duration-300'
            onClick={handleStartStop}
            >{isrunning?'Stop':'Start'}</button>

            <button
            className='bg-[#9ED6DF] border-2 border-black text-black px-4 py-2 rounded-lg hover:bg-pink-600 hover:translate-y-[3px] transition duration-300'
            onClick={handleReset}
            >{'Reset'}</button>
            </div>

        </div>
    );
}