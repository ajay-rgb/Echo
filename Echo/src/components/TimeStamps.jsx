import React from 'react';
import TimeCard from "./TimeCard";

export default function TimeStamps({ savedStamp, onDelete }) {
  return (
    // This container fills its parent and will scroll its content when it overflows.
    <div className="bg-[var(--cardclr)] flex flex-col items-center h-full w-full shadow-md rounded-lg p-4 overflow-y-auto no-scrollbar">
      {savedStamp.map((time, index) => (
        <TimeCard
          key={index}
          time={time}
          onDelete={() => onDelete(index)}
        />
      ))}
    </div>
  );
}