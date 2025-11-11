import React, { useState, useEffect, useContext } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import UserContext from '../context/userContext';

export default function SessionList() {
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editTask, setEditTask] = useState('');
  const [editDuration, setEditDuration] = useState('');
  const { user } = useContext(UserContext);
  const apiUrl = import.meta.env.VITE_API_URL;
  const baseApi = (apiUrl || '').replace(/\/+$/, '');

  useEffect(() => {
    if (user) {
      fetchSessions();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchSessions = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${baseApi}/api/sessions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setSessions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch sessions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDuration = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEdit = (session) => {
    setEditingId(session._id);
    setEditTask(session.task || 'General Work');
    setEditDuration(formatDuration(session.duration));
  };

  const handleSaveEdit = async (sessionId) => {
    const token = localStorage.getItem('token');
    
    // Parse duration back to milliseconds
    const [hours, minutes, seconds] = editDuration.split(':').map(Number);
    const durationMs = ((hours * 3600) + (minutes * 60) + seconds) * 1000;

    try {
      await fetch(`${baseApi}/api/sessions/${sessionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          task: editTask,
          duration: durationMs
        })
      });

      setEditingId(null);
      fetchSessions(); // Refresh list
    } catch (error) {
      console.error("Failed to update session:", error);
      alert("Failed to update session. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTask('');
    setEditDuration('');
  };

  const handleDelete = async (sessionId) => {
    if (!confirm('Are you sure you want to delete this session?')) {
      return;
    }

    const token = localStorage.getItem('token');
    try {
      await fetch(`${baseApi}/api/sessions/${sessionId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      fetchSessions(); // Refresh list
    } catch (error) {
      console.error("Failed to delete session:", error);
      alert("Failed to delete session. Please try again.");
    }
  };

  if (isLoading) {
    return <div className="text-center text-gray-500 p-4">Loading sessions...</div>;
  }

  if (!user) {
    return <div className="text-center text-gray-500 p-4">Please log in to view your sessions.</div>;
  }

  if (sessions.length === 0) {
    return <div className="text-center text-gray-500 p-4">No sessions recorded yet. Start tracking your time!</div>;
  }

  return (
    <div className="w-full h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-black">Session History</h2>
      <div className="space-y-2">
        {sessions.map((session) => (
          <div 
            key={session._id} 
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            {editingId === session._id ? (
              // Edit Mode
              <div className="space-y-2">
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 text-black"
                  placeholder="Task name"
                />
                <input
                  type="text"
                  value={editDuration}
                  onChange={(e) => setEditDuration(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 text-black"
                  placeholder="HH:MM:SS"
                  pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveEdit(session._id)}
                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    <FaSave /> Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Display Mode
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="font-semibold text-black text-lg">
                    {session.task || 'General Work'}
                  </h3>
                  <div className="text-sm text-gray-600 flex gap-4 mt-1">
                    <span>Duration: {formatDuration(session.duration)}</span>
                    <span>{formatDate(session.createdAt)}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(session)}
                    className="text-blue-500 hover:text-blue-700 p-2"
                    title="Edit session"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(session._id)}
                    className="text-red-500 hover:text-red-700 p-2"
                    title="Delete session"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
