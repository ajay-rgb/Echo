import React, { useState, useContext } from 'react'; // 1. Import useContext
import { useTheme } from '../context/ThemeContext';
import { useTimer } from '../hooks/useTimer';
import { FaPlay, FaPause, FaCog } from 'react-icons/fa';
import UserContext from '../context/userContext'; // 2. Import your UserContext

export default function Timer() {
  const { time, isRunning, handleStartStop, handleReset, formatTime } = useTimer();
  const { theme } = useTheme();
  const { user } = useContext(UserContext); // 3. Get the user from context

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSaveSession = async () => {
    // 4. Only proceed if a user is logged in
    if (!user) {
      alert("Please log in to save a session.");
      return;
    }

    const token = localStorage.getItem('token');
    try {
      await fetch(`${apiUrl}/api/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          duration: time,
          task: taskName
        }),
      });

      handleReset();
      setTaskName('');
      alert('Session saved successfully!');
    } catch (error) {
      console.error("Failed to save session:", error);
    }
  };
  return (
    <div className={`timer-card relative flex flex-col items-center justify-center h-full w-2/4 p-2  rounded-md shadow-md bg-[var(--cardclr)] ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
      
      {isOptionsOpen && (
        <div className="options-popup absolute h-auto w-60 z-10 bg-white p-4 flex flex-col justify-between items-center rounded-lg shadow-lg">
          <h2 className="text-sm text-black font-bold mb-2">What are you working on?</h2>
          <input
            type="text"
            placeholder="Project Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full break-words mb-2 text-black focus:outline-none"
          />
          <button
            className="bg-green-500 text-white px-4 py-1 w-full rounded-full hover:bg-black"
            onClick={() => setIsOptionsOpen(false)}
          >
            Save
          </button>
        </div>
      )}

      <button 
        onClick={() => setIsOptionsOpen(!isOptionsOpen)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
        <FaCog />
      </button>

      <div className='rounded-full px-1 border-2 border-black mb-2'>
        <h1 className='text-black text-2xl font-bold p-4'>
          {formatTime(time).slice(-2)}
        </h1>
      </div>
      <h1 className='text-black text-xl p-2 mb-2'>
        {formatTime(time).slice(0, -3)} 
      </h1>
      
      <div className='flex flex-row w-full gap-2 p-1 mb-2'>
        <button
          className='bg-black text-white px-4 flex items-center justify-center py-1 w-full rounded-full hover:bg-white hover:text-black'
          onClick={handleStartStop}
        >
          {isRunning ? <FaPause /> : <FaPlay />}
        </button>
        <button
          className='bg-[var(--primary-txt)] text-white px-4 py-1 w-full rounded-full hover:bg-white hover:text-black'
          onClick={handleSaveSession} 
        >
          Save
        </button>
      </div>
    </div>
  );
}