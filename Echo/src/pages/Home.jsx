import React from 'react';
import Timer from '../components/Timer.jsx';
import Progress from '../components/Progress.jsx';
import Graph from '../components/Graph.jsx';

export default function Home() {
  // No need for useOutletContext or state management anymore.
  // This component is now just for layout.

  return (
    <div className='bg-gray-100 flex flex-col flex-grow p-4 gap-4 min-h-0 rounded-bl-lg'>

      {/* Top Section: Takes up 50% of the height */}
      <div className='flex flex-row justify-center items-center gap-4 h-1/2'>
        <Timer />
        <Progress />
      </div>

      {/* Bottom Section: Takes up the other 50% of the height */}
      <div className='w-full h-1/2 min-h-0'>
        <Graph />
      </div>

    </div>
  );
}