import React from 'react';

export default function TimeCard({ time, onDelete }) {
  return (
    <div className="flex flex-row items-center justify-between w-full shrink-0 p-2 mb-2 border-b border-gray-400 bg-[#eae4da] rounded-md">
      <h3 className='text-[#1d1d1b] font-semibold tracking-wider'>{time}</h3>
      <button
        onClick={onDelete}
        className="bg-red-600 text-white px-3 py-1 text-sm rounded hover:bg-red-700 transition"
      >
        Delete
      </button>
    </div>
  );
}