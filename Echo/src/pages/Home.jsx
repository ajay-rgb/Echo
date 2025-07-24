
import React from 'react'
import Timer from '../components/Timer.jsx';
import TimeStamps from '../components/TimeStamps.jsx';
import {useState} from 'react'

export default function Home(){

    const [timeStamp, setTimeStamp] = useState(["default"])

    const handleAddTimeStamp = (time)=>{
        setTimeStamp(prev=>[time, ...prev])
    }

    const handleDeleteTimeStamp = (indexToDelete) => {
    setTimeStamp(prev => prev.filter((_, index) => index !== indexToDelete));
    };


    return(
        <div>
            <div className='flex justify-center items-center gap-4 h-full w-full'>
                <Timer onReset={handleAddTimeStamp}/>
                <TimeStamps savedStamp={timeStamp} onDelete = {handleDeleteTimeStamp}/>
            </div>
            
        </div>
    );
}