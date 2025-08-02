import React from 'react';
import TimeCard from "./TimeCard";

export default function TimeStamps({ savedStamp=[], onDelete }) {
  return (
    <div className="timestamp-card p-4 flex flex-col items-center h-full w-full shadow-md rounded-lg overflow-y-auto no-scrollbar">
      {savedStamp.length > 0 ? (
        // If there are stamps, map over them
        savedStamp.map((time, index) => (
          <TimeCard
            key={index}
            time={time}
            onDelete={() => onDelete(index)}
          />
        ))
      ) : (
        // Otherwise, show a placeholder message
        <div className="m-auto text-white opacity-50">
          No timestamps saved yet.
        </div>
      )}
    </div>
  );
}