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

module.exports = router;
