const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); 

let notes = [];
let nextId = 3;

// ENDPOINTS
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    const newNote = {
        id: nextId++,
        text: req.body.text,
    };
    notes.unshift(newNote); 
    res.status(201).json(newNote);
});

app.delete('/api/notes/:id', (req, res) => { 
    const idToDelete = parseInt(req.params.id);
    notes = notes.filter(note => note.id !== idToDelete);
    res.status(200).json({ message: 'Note deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});