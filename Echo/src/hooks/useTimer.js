// src/hooks/useTimer.js
import { useState, useEffect } from 'react';

// A custom hook is just a function that uses other hooks.
export function useTimer(onResetCallback) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let id;
    if (isRunning) {
      id = setInterval(() => {
        setTime(prev => prev + 100);
      }, 100);
    }
    return () => {
      clearInterval(id);
    };
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    // If a callback was passed, call it with the formatted time
    if (onResetCallback) {
      onResetCallback(formatTime(time));
    }
    setTime(0);
    setIsRunning(false);
  };
  
  const formatTime = (time) => {
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${String((time % 1000) / 10).padStart(2, '0')}`;
  };

  // Return the state and functions the component will need
  return { time, isRunning, handleStartStop, handleReset, formatTime };
}