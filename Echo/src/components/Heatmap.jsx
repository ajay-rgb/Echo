import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function MonthlyHeatmap() {
  const [data, setData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      // Example: { "2025-08-01": 2.5, "2025-08-02": 1, ... }
      const result = await fetch(`${apiUrl}/heatmap`);
      const json = await result.json();
      setData(json);
    };
    fetchData();
  }, [apiUrl]);

  const daysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();

  const getMonthDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const totalDays = daysInMonth(year, month);
    let days = [];
    for (let i = 1; i <= totalDays; i++) {
      const dateStr = new Date(year, month, i)
        .toISOString()
        .split("T")[0];
      days.push({
        date: dateStr,
        value: data[dateStr] || 0
      });
    }
    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const monthDays = getMonthDays(currentDate);

  return (
    <div className="w-full h-full bg-transparent p-4 rounded-lg shadow-md flex flex-col">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPreviousMonth}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <FaChevronLeft className="text-black" />
        </button>
        <h2 className="font-bold text-black text-sm md:text-base">
          {currentDate.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric"
          })}
        </h2>
        <button
          onClick={goToNextMonth}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          <FaChevronRight className="text-black" />
        </button>
      </div>

      {/* Heatmap */}
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: "repeat(10, 1fr)"
        }}
      >
        

        {/* Empty cells for first day offset */}
        {Array(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay())
          .fill(null)
          .map((_, idx) => (
            <div key={"empty-" + idx}></div>
          ))}

        {/* Actual day cells */}
        {monthDays.map((d) => (
          <div
            key={d.date}
            className={`aspect-square rounded ${
              d.value === 0
                ? "bg-gray-100"
                : d.value < 1
                ? "bg-green-200"
                : d.value < 2
                ? "bg-green-400"
                : d.value < 4
                ? "bg-green-600"
                : "bg-green-800"
            }`}
            title={`${d.date}: ${d.value} hrs`}
          ></div>
        ))}
      </div>
    </div>
  );
}
