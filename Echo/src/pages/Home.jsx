import React from 'react';
import Timer from '../components/Timer.jsx';
import Progress from '../components/Progress.jsx';
import Graph from '../components/Graph.jsx';

export default function Home() {
 

  return (
    <div className='flex flex-col flex-grow p-4 gap-4 min-h-0 rounded-lg bg-[var(--color-2)]'>

    
      <div className='flex flex-row justify-center items-center gap-4 h-1/2'>
        <Timer />
        <Progress />
      </div>

      <div className='w-full h-1/2 min-h-0'>
        <Graph />
      </div>

    </div>
  );
}