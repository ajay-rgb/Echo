import React from 'react';
import { FaStopwatch, FaStickyNote, FaChartBar } from 'react-icons/fa';

export default function About() {
  return (
    <div className="flex-grow p-8 bg-[var(--secondary)] text-gray-800 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-4xl font-bold text-center mb-4 text-[var(--primary-txt)]">About Echo</h1>
        <p className="text-lg text-center text-gray-200 mb-12">
          Your Personal Productivity Companion
        </p>

        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">What is Echo?</h2>
          <p className="text-gray-700 leading-relaxed">
            Echo is a modern productivity application designed to help you understand and optimize how you spend your time. In a world full of distractions, Echo provides simple yet powerful tools to track your work sessions, organize your thoughts, and gain clear insights into your daily habits. Whether you're a student, a professional, or anyone looking to improve focus, Echo is built to support your journey towards greater efficiency and mindfulness.
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-center mb-6 text-[var(--primary-txt)]">Core Features</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaStopwatch className="text-4xl text-blue-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Task-Based Timer</h3>
              <p className="text-gray-600 text-sm">Track time spent on specific tasks to understand where your effort is going.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaStickyNote className="text-4xl text-yellow-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Persistent Notes</h3>
              <p className="text-gray-600 text-sm">Jot down ideas and to-dos that are saved securely and permanently in the cloud.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaChartBar className="text-4xl text-green-500 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Productivity Insights</h3>
              <p className="text-gray-600 text-sm">Visualize your work patterns with intuitive graphs and a personal dashboard (coming soon!).</p>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500">
          <p>Developed with ❤️ </p>
          <p>@2025.</p>
        </div>

      </div>
    </div>
  );
}