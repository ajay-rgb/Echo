import React, { useState, useEffect, useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import UserContext from "../context/UserContext"; // Import the UserContext

export default function MonthlyHeatmap() {
  const [data, setData] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const apiUrl = import.meta.env.VITE_API_URL;
  const { user } = useContext(UserContext); // Get the user from context

  useEffect(() => {
    // Only fetch data if a user is logged in
    if (user) {
      const fetchData = async () => {
        const token = localStorage.getItem('token'); // Get auth token
        try {
          // FIX 1: Correct API endpoint
          const result = await fetch(`${apiUrl}/api/sessions/heatmap`, {
            headers: {
              // FIX 2: Add Authorization header
              'Authorization': `Bearer ${token}`
            }
          });
          const json = await result.json();
          
          // Convert the array from the server into an object for easy lookup
          const dataObject = {};
          json.forEach(item => {
            const hours = item.count / (1000 * 60 * 60);
            dataObject[item.date] = hours;
          });
          setData(dataObject);

        } catch (error) {
          console.error("Failed to fetch heatmap data:", error);
        }
      };
      fetchData();
    }
  }, [apiUrl, user, currentDate]); // Re-fetch if the month or user changes

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const getMonthDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const totalDays = daysInMonth(year, month);
    let days = [];
    for (let i = 1; i <= totalDays; i++) {
      const dateStr = new Date(year, month, i).toISOString().split("T")[0];
      days.push({
        date: dateStr,
        value: data[dateStr] || 0,
      });
    }
    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const monthDays = getMonthDays(currentDate);
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  // Adjust for Sunday being 0
  const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  return (
    <div className="w-full h-full bg-white p-4 rounded-lg shadow-md flex flex-col">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={goToPreviousMonth} className="p-2 rounded-full hover:bg-gray-200">
          <FaChevronLeft className="text-black" />
        </button>
        <h2 className="font-bold text-black text-sm md:text-base">
          {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h2>
        <button onClick={goToNextMonth} className="p-2 rounded-full hover:bg-gray-200">
          <FaChevronRight className="text-black" />
        </button>
      </div>

      {/* Heatmap */}
      <div
        className="grid gap-1"
        style={{
          // FIX 3: Use 7 columns for the days of the week
          gridTemplateColumns: "repeat(7, 1fr)",
        }}
      >
        {/* Empty cells for first day offset */}
        {Array(offset).fill(null).map((_, idx) => (
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
            title={`${d.date}: ${d.value.toFixed(2)} hrs`}
          ></div>
        ))}
      </div>
    </div>
  );
}