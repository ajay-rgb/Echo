
import React, { useState } from 'react';
import Calendar from 'react-calendar';

export default function MyCalendar() {

    const[date, setDate] = useState(new Date());

    return (
        <div className="bg-white rounded-lg  h-full w-full flex flex-col justify-between items-center">

           
                <Calendar
                onChange= {setDate}
                value={date}
                className="h-full rounded-lg  border-non scale-95"
                />
            
            
        </div>
    );
}