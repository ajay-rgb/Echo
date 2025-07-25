// src/components/Timer.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useTimer } from '../hooks/useTimer'; // Import your custom hook

export default function Timer({ onReset }) {
  // Call the hook to get all the logic
  const { time, isRunning, handleStartStop, handleReset, formatTime } = useTimer(onReset);
  const {theme}=useTheme();

  const timerBgClass = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black';

  return (
    <div className={` bg-[var(--cardclr)] flex flex-col items-center justify-center h-full w-2/4 p-4 shadow-md rounded-[10px]`}>
      <h3 className={`text-[var(--primary)] text-1xl font-bold p-4`}>Timer</h3>
      <h1 className='text-black text-2xl font-bold p-4'>
        {formatTime(time)}
      </h1>
      <div className='flex flex-row gap-4 p-4'>
        <button
          className='bg-[var(--primary)]  text-white px-2 py-1 rounded-lg hover:bg-pink-600'
          onClick={handleStartStop}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button
          className='bg-[#c883e7]  text-white px-2 py-1 rounded-lg hover:bg-pink-600'
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}