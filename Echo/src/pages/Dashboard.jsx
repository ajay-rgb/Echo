

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';

export default function Dashboard() {
  return (
   
    <div className='flex flex-row h-full w-full'>
      
      {/* Main Content Column */}
      <div className='flex flex-col w-full h-full'>
        
      
        <div className='bg-[var(--secondary)] flex flex-col flex-grow p-4 gap-4 min-h-0 rounded-bl-lg'>

          <h1 className='text-black'>Dashboard</h1>
         

        </div>
      </div>
    </div>
  );
}