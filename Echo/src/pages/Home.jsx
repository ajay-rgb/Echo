import React, { useState } from 'react';
import Timer from '../components/Timer.jsx';
import Header from '../components/Header.jsx';
import Graph from '../components/Graph.jsx';
import Sidebar from '../components/Sidebar.jsx';
import RightSidebar from '../components/RightSidebar.jsx';
import TimeStamps from '../components/TimeStamps.jsx';

export default function Home() {
  const [timeStamp, setTimeStamp] = useState([]);

  const handleAddTimeStamp = (time) => {
    setTimeStamp(prev => [time, ...prev]);
  };

  const handleDeleteTimeStamp = (indexToDelete) => {
    setTimeStamp(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  return (
    // This top-level container should fill its parent (the Layout)
    <div className='flex flex-row h-full w-full'>
      <Sidebar />
      
      {/* Main Content Column */}
      <div className='flex flex-col w-full h-full'>
        <Header />

        {/* This container will now grow to fill available vertical space */}
        <div className='bg-[var(--secondary)] flex flex-col flex-grow p-4 gap-4 min-h-0 rounded-bl-lg'>

          {/* Top Section (Timer & Graph) - let it take its natural height */}
          <div className='flex flex-row justify-center items-center gap-4 h-[40%]'>
            <Timer onReset={handleAddTimeStamp} />
            <Graph />
          </div>

          {/* Bottom Section (Timestamps) - tell it to grow and constrain it */}
          <div className='w-full min-h-0 h-[60%]'>
            <TimeStamps savedStamp={timeStamp} onDelete={handleDeleteTimeStamp} />
          </div>

        </div>
      </div>
      
      <RightSidebar />
    </div>
  );
}