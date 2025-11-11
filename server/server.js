require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/sessions');
const notesRoutes = require('./routes/notes');

const app = express();

// CORS configuration
const origins = (process.env.CORS_ORIGINS || '*')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: origins.length === 1 && origins[0] === '*' ? '*' : origins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type'],
  })
);

app.use(express.json({ limit: '1mb' }));

// Health
app.get('/', (_req, res) => {
  res.json({ status: 'ok', service: 'echo-backend' });
});

// API routes
app.use('/api', authRoutes);
app.use('/api', sessionRoutes);
app.use('/api', notesRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    console.error('MONGO_URI is not set');
    process.exit(1);
  }
  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server listening on :${PORT}`));
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
