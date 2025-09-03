
import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import RightSidebar from './components/RightSidebar';
import { useTheme } from './context/ThemeContext';

export default function Layout() {
  const { theme } = useTheme();
  const mainBgClass = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';

  const [timeStamp, setTimeStamp] = useState(() => {

    const savedData = localStorage.getItem('myTimeStamps');
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    localStorage.setItem('myTimeStamps', JSON.stringify(timeStamp));
  }, [timeStamp]);

  const handleAddTimeStamp = (time) => {
    setTimeStamp(prev => [time, ...prev]);
  };

  const handleDeleteTimeStamp = (indexToDelete) => {
    setTimeStamp(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  const location = useLocation();
  const hideSidebarOn = ['/login', '/community', '/about', '/dashboard'];

  return (
    <div className={`flex flex-row h-screen w-screen bg-[var(--color-1)]${mainBgClass}`}>
      <Sidebar />

      <div className='flex flex-col w-full h-full'>
        <Header />
        
        <Outlet context={{
          timeStamp,
          handleAddTimeStamp,
          handleDeleteTimeStamp
        }} />
      </div>
       {(location.pathname !== '/login' && location.pathname !== '/community' 
            && location.pathname!=='/about' && location.pathname !== '/dashboard'
       ) && <RightSidebar />}

    </div>
  );
}