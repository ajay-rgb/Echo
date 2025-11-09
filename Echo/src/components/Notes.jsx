import React, { useState, useEffect, useContext } from 'react';
import { FaTrash } from 'react-icons/fa';
import UserContext from '../context/userContext';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;
<<<<<<< HEAD
  const baseApi = (apiUrl || '').replace(/\/+$/, '');
=======
>>>>>>> 544db4d3ffbb8d8f13dc4a19c5817d06f7bb63cd
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      const fetchNotes = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await fetch(`${baseApi}/api/notes`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const data = await response.json();
          setNotes(data);
        } catch (error) {
          console.error("Failed to fetch notes:", error);
        }
      };
      fetchNotes();
    } else {
      
      setNotes([]);
    }
  }, [user]);

  const handleDelete = async (idToDelete) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`${baseApi}/api/notes/${idToDelete}`, {
        method: 'DELETE',
        headers: {
          
          'Authorization': `Bearer ${token}`
        }
      });
      setNotes(prevNotes => prevNotes.filter(note => note._id !== idToDelete));
    } catch (error) {
      console.error("failed to delete note:", error);
    }
  };

  const handleAddNote = async () => {
    const token = localStorage.getItem('token');
    if (input.trim() === '') return;
    try {
      const response = await fetch(`${baseApi}/api/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: input }),
      });
      const newNote = await response.json();
      setNotes(prevNote => [newNote, ...prevNote]);
      setInput(''); 
    } catch (error) {
      console.error("Failed to add note:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddNote();
    }
  };
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
          className="bg-gray-200 text-black p-3 h-full rounded-full hover:bg-gray-300"
        >
          +
        </button>
      </div>

      <div className="flex-grow overflow-y-auto min-h-0 no-scrollbar">
        {notes.map((note) => (
          <div key={note._id} className="flex items-center justify-between p-2 mb-2  border-b border-gray-800">
            <p className="text-black break-words  mr-2">{note.text}</p>
            <button className='text-black text-[12px]'
            onClick={()=>{handleDelete(note._id)}}
            ><FaTrash/></button>
          </div>
        ))}
        
      </div>
    </div>
  );
}
