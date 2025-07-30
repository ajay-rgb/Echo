
import React, { useState } from 'react';
import Calendar from 'react-calendar';

export default function MyCalendar() {

    const[date, setDate] = useState(new Date());

    return (
        <div className="bg-white rounded-lg hover:shadow-lg h-full w-full flex flex-col justify-between items-center">

           
                <Calendar
                onChange= {setDate}
                value={date}
                className="h-full text-[var(--primary)] rounded-lg  p-0 m-0 border-none scale-80"
                />
            
            
        </div>
    );
}