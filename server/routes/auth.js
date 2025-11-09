const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ message: 'username and password required' });
    const existing = await User.findOne({ username: username.toLowerCase() });
    if (existing) return res.status(409).json({ message: 'username already exists' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username: username.toLowerCase(), password: hash });
    res.status(201).json({ user: { _id: user._id, username: user.username } });
  } catch (e) {
    res.status(500).json({ message: 'registration failed' });
  }
});

// POST /api/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ message: 'username and password required' });
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) return res.status(401).json({ message: 'invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'invalid credentials' });
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { _id: user._id, username: user.username } });
  } catch (e) {
    res.status(500).json({ message: 'login failed' });
  }
});

// GET /api/profile
router.get('/profile', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('_id username');
  if (!user) return res.status(404).json({ message: 'not found' });
  res.json(user);
});

module.exports = router;
