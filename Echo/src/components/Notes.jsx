import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa'; // 1. Import a trash icon

export default function Notes() {
  const [notes, setNotes] = useState(()=>{
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [input, setInput] = useState("");

  useEffect(()=>{
    localStorage.setItem('notes', JSON.stringify(notes));
  },[notes])

  const handleKeyDown = (e)=>{
    if(e.key === 'Enter' && input.trim() !== ""){
        setNotes([input, ...notes]);
        setInput("");
    }
  }

  const addNotesHandler = () => {
    if (input.trim() !== "") {
      setNotes([input, ...notes]);
      setInput("");
    }
  };

  // 2. Create a function to handle deleting a note
  const handleDeleteNote = (indexToDelete) => {
    setNotes(prevNotes => prevNotes.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="h-full w-full bg-yellow-200 p-4 rounded-lg shadow-lg flex flex-col">
      <div className="flex flex-row items-center justify-between mb-4">
        <input
          value={input}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInput(e.target.value)}
          className=" bg-yellow-100  rounded-[100px] p-2 pl-3 w-full mr-2 text-black focus:outline-none"
          placeholder="write your notes here"
          type="text"
        />
        <button
          type="button"
          onClick={addNotesHandler}
          className="text-black border-1 px-2 py-1 item-center justify-center flex font-bold rounded-full hover:text-white hover:bg-[var(--primary)]"
        >
          +
        </button>
      </div>

      <div className="flex-grow overflow-y-auto min-h-0 no-scrollbar">
        {notes.map((note, index) => (
          <div className='flex flex-row items-center justify-between'>

            <div 
            key={index} className="flex min-h-0 w-[180px] flex-grow items-center p-2 mb-2 font-bold border-b border-gray-800 overflow-hidden">
            <p className="text-black break-words mr-2">{note}</p>
          </div>
          
            <div>
            <button
              onClick={() => handleDeleteNote(index)}
              className="text-red-500 hover:text-red-700 p-1 shrink-0"
            >
              <FaTrash  className='text-black scale-80 cursor-pointer ml-2'/>
            </button>
            </div>

          </div>
          
        ))}
      </div>
    </div>
  );
}