// src/pages/Home.jsx
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import Timer from '../components/Timer.jsx';
import Progress from '../components/Progress.jsx';
import TimeStamps from '../components/TimeStamps.jsx';

export default function Home() {
  // Get the props passed down from the Outlet in Layout.jsx
  const { timeStamp, handleAddTimeStamp, handleDeleteTimeStamp } = useOutletContext();

  return (
    <div className='bg-[var(--dark-bg)] flex flex-col flex-grow p-4 gap-4 min-h-0 rounded-bl-lg'>
      <div className='flex flex-row justify-center items-center gap-4'>
        <Progress />
        <Timer />
      </div>
      <div className='w-full flex-grow min-h-0 bg-[#222823] rounded-lg  '>
        <TimeStamps savedStamp={timeStamp} onDelete={handleDeleteTimeStamp} />
      </div>
    </div>
  );
}