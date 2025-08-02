import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTimer } from '../hooks/useTimer';
import {FaPlay, FaPause, FaCog} from 'react-icons/fa';

export default function Timer({ onReset }) {
  const { time, isRunning, handleStartStop, handleReset, formatTime } = useTimer(onReset);
  const {theme}=useTheme();

  const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);
  const [taskName, setTaskName] = React.useState('');

  // const timerBgClass = theme === 'dark' ? 'bg- text-white' : 'bg-gray-100 text-black';

  return (
    <div className={` timer-card   flex flex-col items-center justify-center h-full w-2/4 p-2 shadow-md rounded-[10px]`}>
        
        {
          (isOptionsOpen) && (
            <div 
            className="options-popup absolute h-70 w-60 z-1 top-20 right-90 bg-white p-4 flex flex-col justify-between items-center rounded-lg shadow-lg">
              <h2 className="text-sm text-black font-bold mb-2">What you working on</h2>
              <input
                type="text"
                placeholder = "Project Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full h-fit break-words mb-2 text-black focus:outline-none"
              />
               
              <button
                className ="bg-green-500 text-white px-4 py-1  w-full rounded-full hover:bg-black hover:text-white"
                onClick={() => {
                  setIsOptionsOpen(false);
                  // Handle saving the task name if needed
                }}
              >
                Save
              </button>
            </div>
          )
        }

      <button 
        onClick={() => setIsOptionsOpen(!isOptionsOpen)}
        className="relative left-20 text-green-500 hover:text-white">
        {/* <FaCog /> */}
        <h1 className='text-2xl font-bold'>...</h1>
      </button>


      <div className=' rounded-full px-1 border-2 border-black mb-2'>
        <h1 className='text-black text-2xl font-bold p-4'>
        {formatTime(time).slice(-2)}
        </h1>
      </div>

      <h1 className='text-black text-1xl p-2 mb-2'>
        {formatTime(time).slice(0, -2)}
      </h1>
       
            <div className='flex flex-row w-full gap-2 p-1 mb-2'>
              <button
                className='bg-black text-white px-4 flex items-center justify-center py-1 w-full rounded-full hover:bg-white hover:text-black'
                onClick={handleStartStop}
              >
                {isRunning ? <FaPause/> : <FaPlay/>}
              </button>
              <button
                className='bg-black text-white px-4 py-1  w-full rounded-full hover:bg-white hover:text-black'
                onClick={handleReset}
              >
                Save
              </button>
            </div>
    </div>
  );
}