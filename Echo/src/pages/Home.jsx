
import React from 'react'
import Timer from '../components/Timer.jsx';

export default function Home(){
    return(
        <div>
            <div className='flex justify-center items-center h-full w-full'>
                <Timer/>
            </div>
            
        </div>
    );
}