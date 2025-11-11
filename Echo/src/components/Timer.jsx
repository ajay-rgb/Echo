import React, { useState, useContext } from 'react'; // 1. Import useContext
import { useTheme } from '../context/ThemeContext';
import { useTimer } from '../hooks/useTimer';
import { FaPlay, FaPause, FaCog, FaStop } from 'react-icons/fa';
import UserContext from '../context/userContext'; // 2. Import your UserContext

export default function Timer() {
  const { time, isRunning, isPaused, handleStartStop, handlePause, handleResume, handleReset, formatTime } = useTimer();
  const { theme } = useTheme();
  const { user } = useContext(UserContext); // 3. Get the user from context

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [taskSuggestions, setTaskSuggestions] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  const baseApi = (apiUrl || '').replace(/\/+$/, '');

  // Fetch unique task names for autocomplete
  React.useEffect(() => {
    if (user) {
      const fetchTasks = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(`${baseApi}/api/sessions`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const sessions = await response.json();
          
          // Get unique task names
          const uniqueTasks = [...new Set(
            (Array.isArray(sessions) ? sessions : []).map(s => s.task || 'General Work')
          )];
          setTaskSuggestions(uniqueTasks);
        } catch (error) {
          console.error("Failed to fetch task suggestions:", error);
        }
      };
      fetchTasks();
    }
  }, [user, baseApi]);

  const handleSaveSession = async () => {
    // 4. Only proceed if a user is logged in
    if (!user) {
      alert("Please log in to save a session.");
      return;
    }

    if (time === 0) {
      alert("Timer is at zero. Start a session first.");
      return;
    }

    const token = localStorage.getItem('token');
    setIsSaving(true);
    try {
      await fetch(`${baseApi}/api/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          duration: time,
          task: taskName || 'General Work'
        }),
      });

      handleReset();
      setTaskName('');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save session:", error);
      alert("Failed to save session. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className={`timer-card relative flex flex-col items-center justify-center h-full w-2/4 p-2  rounded-md shadow-md bg-(--cardclr) ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
      
      {/* Success notification */}
      {saveSuccess && (
        <div className="absolute top-2 left-2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-20 animate-fade-in">
          ✓ Session saved!
        </div>
      )}

      {isOptionsOpen && (
        <div className="options-popup absolute h-auto w-60 z-10 bg-white p-4 flex flex-col justify-between items-center rounded-lg shadow-lg">
          <h2 className="text-sm text-black font-bold mb-2">What are you working on?</h2>
          <input
            type="text"
            list="task-suggestions"
            placeholder="Project Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full wrap-break-word mb-2 text-black focus:outline-none"
          />
          <datalist id="task-suggestions">
            {taskSuggestions.map((task, index) => (
              <option key={index} value={task} />
            ))}
          </datalist>
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
        {!isRunning && !isPaused ? (
          <button
            className='bg-black text-white px-4 flex items-center justify-center py-1 w-full rounded-full hover:bg-white hover:text-black'
            onClick={handleStartStop}
          >
            <FaPlay className="mr-2" /> Start
          </button>
        ) : isRunning ? (
          <button
            className='bg-yellow-500 text-white px-4 flex items-center justify-center py-1 w-full rounded-full hover:bg-yellow-600'
            onClick={handlePause}
          >
            <FaPause className="mr-2" /> Pause
          </button>
        ) : (
          <button
            className='bg-green-500 text-white px-4 flex items-center justify-center py-1 w-full rounded-full hover:bg-green-600'
            onClick={handleResume}
          >
            <FaPlay className="mr-2" /> Resume
          </button>
        )}
        
        <button
          className='bg-(--primary-txt) text-white px-4 py-1 w-full rounded-full hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed'
          onClick={handleSaveSession}
          disabled={isSaving || time === 0}
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}