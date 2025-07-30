import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTimer } from '../hooks/useTimer';
import {FaPlay, FaPause} from 'react-icons/fa';

export default function Timer({ onReset }) {
  const { time, isRunning, handleStartStop, handleReset, formatTime } = useTimer(onReset);
  const {theme}=useTheme();

  const timerBgClass = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black';

  return (
    <div className={` {timerBgClass} flex flex-col items-center justify-center h-full w-2/4 p-4 shadow-md rounded-[10px]`}>
        
        {/* //displays the milliseconds */}
        <div className=' rounded-full px-1 border-2 border-[var(--primary)]'>
          <h1 className='text-[var(--primary)] text-2xl font-bold p-4'>
          {formatTime(time).slice(-2)}
          </h1>
        </div>
     
        <h1 className='text-black text-2xl font-bold p-2'>
          {formatTime(time).slice(0, -2)}
        </h1>

            <div className='flex flex-row gap-4 p-2'>
              <button
                className='bg-[var(--primary)]  text-white px-2 py-1 rounded-lg hover:bg-pink-600'
                onClick={handleStartStop}
              >
                {isRunning ? <FaPause/> : <FaPlay/>}
              </button>
              <button
                className='bg-[#c883e7]  text-white px-2 py-1 rounded-lg hover:bg-pink-600'
                onClick={handleReset}
              >
                Save
              </button>
            </div>
    </div>
  );
}