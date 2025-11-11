import React, { useState } from 'react';
import ProductivityChart from '../components/ProductivityChart.jsx';
import Heatmap from '../components/Heatmap.jsx';
import SessionList from '../components/SessionList.jsx';
import ExportData from '../components/ExportData.jsx';
import Timer from '../components/Timer.jsx';

export default function Dashboard() {
  const [showSessions, setShowSessions] = useState(false);

  return (
    <div className='flex flex-col h-full w-full p-4 gap-4 bg-(--color-2) overflow-y-auto'>
      
      {/* Header with Export */}
      <div className='flex justify-between items-center'>
        <h1 className='text-black text-2xl font-bold'>Productivity Dashboard</h1>
        <ExportData />
      </div>

      {/* Timer Section */}
      <div className='flex justify-center w-full'>
        <Timer />
      </div>

      {/* Charts Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 w-full'>
        {/* Bar Chart */}
        <div className='bg-white rounded-lg shadow-md p-4 h-80'>
          <h2 className='text-lg font-semibold text-black mb-2'>Time per Task</h2>
          <ProductivityChart />
        </div>

        {/* Heatmap */}
        <div className='bg-white rounded-lg shadow-md p-4 h-80'>
          <h2 className='text-lg font-semibold text-black mb-2'>Activity Heatmap</h2>
          <Heatmap />
        </div>
      </div>

      {/* Session History Toggle */}
      <div className='flex justify-between items-center mt-4'>
        <h2 className='text-xl font-bold text-black'>Session History</h2>
        <button
          onClick={() => setShowSessions(!showSessions)}
          className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors'
        >
          {showSessions ? 'Hide Sessions' : 'Show Sessions'}
        </button>
      </div>

      {/* Session List */}
      {showSessions && (
        <div className='bg-white rounded-lg shadow-md p-4'>
          <SessionList />
        </div>
      )}

    </div>
  );
}