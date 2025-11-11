// src/components/ProductivityChart.jsx
import React, { useState, useEffect, useContext } from 'react'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import UserContext from '../context/userContext'; 

export default function ProductivityChart() {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState('all'); // 'week', 'month', 'all'
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const { user } = useContext(UserContext); 

  useEffect(() => {
    
    if (user) {
      const fetchSessions = async () => {
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(`${apiUrl}/api/sessions`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch sessions');
          }

          const data = await response.json();
          setSessions(Array.isArray(data) ? data : [data]); 
    
        } catch (error) {
          console.error("Failed to fetch sessions:", error);
          setError("Failed to load chart data");
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
  }, [user, apiUrl]); 

  const filterSessionsByDateRange = (sessions) => {
    if (dateRange === 'all') return sessions;

    const now = new Date();
    const daysToSubtract = dateRange === 'week' ? 7 : 30;
    const cutoffDate = new Date(now.setDate(now.getDate() - daysToSubtract));

    return sessions.filter(session => {
      const sessionDate = new Date(session.createdAt);
      return sessionDate >= cutoffDate;
    });
  };

  const processData = (sessions) => {
    const filteredSessions = filterSessionsByDateRange(sessions);
    const taskTotals = {};
    
    filteredSessions.forEach(session => {
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
    return <div className="m-auto text-black">Loading chart data...</div>;
  }

  if (error) {
    return <div className="m-auto text-red-500">{error}</div>;
  }
  
  const chartData = processData(sessions);

  return (
    <div className="flex flex-col items-center h-full w-full shadow-md rounded-lg p-4">
      {/* Date Range Filter */}
      <div className="w-full flex justify-end mb-4">
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" stroke="black" />
            <YAxis stroke="white" />
            <Tooltip contentStyle={{ backgroundColor: '#b978feff', border: 'none' }} />
            {/* <Legend   /> */}
            <Bar dataKey="minutes" fill="#95d5b2" />
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