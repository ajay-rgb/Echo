import React from 'react';
import TimeCard from "./TimeCard";
import ProductivityChart from "./ProductivityChart";

export default function TimeStamps({ savedStamp=[], onDelete }) {
  return (
    <div className="timestamp-card flex flex-col items-center h-full w-full shadow-md rounded-lg overflow-y-auto no-scrollbar">
      <ProductivityChart />
    </div>
  );
}