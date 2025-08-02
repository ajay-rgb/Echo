import React, { useState, useEffect } from 'react';
import {FaTrash} from 'react-icons/fa';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const apiUrl = 'https://psychic-giggle-6jgjvq55wqjf45r9-3000.app.github.dev';
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/notes`);
        const data = await response.json();
        setNotes(data); 
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    };

    fetchNotes();
  }, []); 

  const handleDelete = async(idToDelete)=>{
    try{
      await fetch(`${apiUrl}/api/notes/${idToDelete}`,{
        method: 'DELETE',
      });
      
      setNotes(prevNotes => prevNotes.filter(note =>note._id!== idToDelete))
    }catch(error){
      console.error("failed to delete note:", error);
    }
  };

  const handleAddNote = async()=>{
    if(input.trim()==='') return;
    try{
      const response = await fetch(`${apiUrl}/api/notes`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body : JSON.stringify({text: input}),
      });
      const newNote = await response.json();
      setNotes(prevNote => [newNote, ...prevNote]);
    }catch(error){
      console.error("Failed to add note:", error);
    }
  }

  const handleKeyDown = (e)=>{
    if(e.key === 'Enter' && input.trim()!==''){
      handleAddNote();
      setInput('');
    }
  }

  return (
    <div className="h-full w-full notes-card p-4 rounded-lg shadow-lg flex flex-col scale-95">
      <div className="flex flex-row items-center justify-between mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-800 rounded-lg p-2 w-full mr-2 text-black focus:outline-none"
          placeholder="write your notes here"
          type="text"
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={handleAddNote}
          className="bg-[var(--dark-bg)] text-white p-3 rounded-full hover:bg-blue-600"
        >
          +
        </button>
      </div>

      <div className="flex-grow overflow-y-auto min-h-0 no-scrollbar">
        {notes.map((note) => (
          <div key={note._id} className="flex items-center justify-between p-2 mb-2 font-bold border-b border-gray-800">
            <p className="text-[var(--dark-bg)] break-words mr-2">{note.text}</p>
            <button className='text-[var(--dark-bg)] text-[12px]'
            onClick={()=>{handleDelete(note._id)}}
            ><FaTrash/></button>
          </div>
        ))}
        
      </div>
    </div>
  );
}