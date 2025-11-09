const express = require('express');
const Note = require('../models/Note');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

// GET /api/notes
router.get('/notes', async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(notes);
});

// POST /api/notes
router.post('/notes', async (req, res) => {
  const { text } = req.body || {};
  if (!text || !text.trim()) return res.status(400).json({ message: 'text required' });
  const note = await Note.create({ user: req.user.id, text: text.trim() });
  res.status(201).json(note);
});

// DELETE /api/notes/:id
router.delete('/notes/:id', async (req, res) => {
  const id = req.params.id;
  const deleted = await Note.findOneAndDelete({ _id: id, user: req.user.id });
  if (!deleted) return res.status(404).json({ message: 'not found' });
  res.status(204).send();
});

module.exports = router;
