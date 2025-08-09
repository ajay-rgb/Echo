// src/components/ProductivityChart.jsx
import React, { useState, useEffect, useContext } from 'react'; // 1. Import useContext
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import UserContext from '../context/userContext'; // 2. Import your UserContext

export default function ProductivityChart() {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  const { user } = useContext(UserContext); // 3. Get the user from context

  useEffect(() => {
    // 4. Only fetch data if a user is logged in
    if (user) {
      const fetchSessions = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(`${apiUrl}/api/sessions`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await response.json();
          setSessions(Array.isArray(data) ? data : [data]); 
    
        } catch (error) {
          console.error("Failed to fetch sessions:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchSessions();
    } else {
      // If no user, stop loading and show an empty state
      setIsLoading(false);
      setSessions([]);
    }
  }, [user, apiUrl]); // 5. Re-run the effect if the user logs in or out

  // This function processes the raw session data for the chart
  const processData = (sessions) => {
    const taskTotals = {};
    sessions.forEach(session => {
      const task = session.task || 'General Work';
      const durationInMinutes = session.duration / (1000 * 60);
      if (!taskTotals[task]) {
        taskTotals[task] = 0;
      }
      taskTotals[task] += durationInMinutes;
    });

    return Object.keys(taskTotals).map(task => ({
      name: task,
      minutes: Math.round(taskTotals[task])
    }));
  };

  if (isLoading) {
    return <div className="m-auto text-white">Loading chart data...</div>;
  }
  
  const chartData = processData(sessions);

  return (
    <div className="bg-[var(--cardclr)] flex flex-col items-center h-full w-full shadow-md rounded-lg p-4">
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="black" />
            <YAxis stroke="white" />
            <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} />
            <Legend />
            <Bar dataKey="minutes" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="m-auto text-black opacity-50">
          No data to display yet. Save a session to see your progress!
        </div>
      )}
    </div>
  );
}