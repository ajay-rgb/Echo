const express = require('express');
const mongoose = require('mongoose');
const Session = require('../models/Session');
const auth = require('../middleware/auth');

const router = express.Router();

// All routes here require auth
router.use(auth);

// GET /api/sessions
router.get('/sessions', async (req, res) => {
  const sessions = await Session.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(sessions);
});

// POST /api/sessions
router.post('/sessions', async (req, res) => {
  const { duration, task } = req.body || {};
  if (typeof duration !== 'number' || duration < 0) {
    return res.status(400).json({ message: 'duration (ms) required' });
  }
  const session = await Session.create({ user: req.user.id, duration, task });
  res.status(201).json(session);
});

// GET /api/sessions/heatmap
router.get('/sessions/heatmap', async (req, res) => {
  const userId = req.user.id;
  const data = await Session.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: '$duration' },
      },
    },
    { $project: { _id: 0, date: '$_id', count: 1 } },
    { $sort: { date: 1 } },
  ]);
  res.json(data);
});

// PUT /api/sessions/:id - Update a session
router.put('/sessions/:id', async (req, res) => {
  try {
    const { task, duration } = req.body || {};
    const updateData = {};
    
    if (task !== undefined) updateData.task = task;
    if (duration !== undefined) {
      if (typeof duration !== 'number' || duration < 0) {
        return res.status(400).json({ message: 'duration must be a positive number' });
      }
      updateData.duration = duration;
    }

    const session = await Session.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      updateData,
      { new: true }
    );

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json(session);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update session' });
  }
});

// DELETE /api/sessions/:id - Delete a session
router.delete('/sessions/:id', async (req, res) => {
  try {
    const session = await Session.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete session' });
  }
});

module.exports = router;
