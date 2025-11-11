import React, { useState, useContext } from 'react';
import { FaDownload, FaFileExport } from 'react-icons/fa';
import UserContext from '../context/userContext';

export default function ExportData() {
  const [isExporting, setIsExporting] = useState(false);
  const { user } = useContext(UserContext);
  const apiUrl = import.meta.env.VITE_API_URL;
  const baseApi = (apiUrl || '').replace(/\/+$/, '');

  const formatDuration = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const exportToCSV = async () => {
    if (!user) {
      alert('Please log in to export data.');
      return;
    }

    setIsExporting(true);
    const token = localStorage.getItem('token');

    try {
      // Fetch sessions
      const response = await fetch(`${baseApi}/api/sessions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const sessions = await response.json();

      if (!Array.isArray(sessions) || sessions.length === 0) {
        alert('No sessions to export.');
        setIsExporting(false);
        return;
      }

      // Create CSV header
      const csvHeader = 'Date,Task,Duration (HH:MM:SS),Duration (Minutes),Timestamp\n';

      // Create CSV rows
      const csvRows = sessions.map(session => {
        const date = new Date(session.createdAt).toLocaleDateString('en-US');
        const timestamp = new Date(session.createdAt).toLocaleString('en-US');
        const task = (session.task || 'General Work').replace(/,/g, ';'); // Replace commas to avoid CSV issues
        const durationFormatted = formatDuration(session.duration);
        const durationMinutes = Math.round(session.duration / (1000 * 60));

        return `${date},"${task}",${durationFormatted},${durationMinutes},${timestamp}`;
      }).join('\n');

      // Combine header and rows
      const csvContent = csvHeader + csvRows;

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `echo-sessions-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      alert('Data exported successfully!');
    } catch (error) {
      console.error('Failed to export data:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const exportToJSON = async () => {
    if (!user) {
      alert('Please log in to export data.');
      return;
    }

    setIsExporting(true);
    const token = localStorage.getItem('token');

    try {
      // Fetch sessions
      const response = await fetch(`${baseApi}/api/sessions`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const sessions = await response.json();

      if (!Array.isArray(sessions) || sessions.length === 0) {
        alert('No sessions to export.');
        setIsExporting(false);
        return;
      }

      // Create formatted JSON
      const jsonContent = JSON.stringify(sessions, null, 2);

      // Create blob and download
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `echo-sessions-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      alert('Data exported successfully!');
    } catch (error) {
      console.error('Failed to export data:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={exportToCSV}
        disabled={isExporting}
        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Export as CSV"
      >
        <FaDownload />
        {isExporting ? 'Exporting...' : 'Export CSV'}
      </button>
      
      <button
        onClick={exportToJSON}
        disabled={isExporting}
        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        title="Export as JSON"
      >
        <FaFileExport />
        {isExporting ? 'Exporting...' : 'Export JSON'}
      </button>
    </div>
  );
}
