const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authMiddleware = require('./authMiddleware');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json()); 

const uri = process.env.MONGO_URI;

// --- SCHEMAS & MODELS ---
const noteSchema = new mongoose.Schema({
    text:{type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
});
const Note = mongoose.model('Note', noteSchema);

const workSessionSchema = new mongoose.Schema({
    duration: {type: Number, required:true},
    task: {type: String, required: true, default:'General Work'},
    date: {type: Date, default : Date.now},
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true}
});
const WorkSession = mongoose.model('WorkSession', workSessionSchema);

const userSchema = new mongoose.Schema({
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true}
});
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
const User = mongoose.model('User', userSchema);

// --- DATABASE CONNECTION ---
mongoose.connect(uri)
  .then(() => {
    console.log("Successfully connected to MongoDB!");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error("Database connection error:", err);
  });

// --- API ENDPOINTS ---

// Note Routes
app.get('/api/notes', authMiddleware, async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).sort({ _id: -1 });
  res.json(notes);
});

app.post('/api/notes', authMiddleware, async (req, res) => {
  const newNote = new Note({
    text: req.body.text,
    user: req.user.id
  });
  const savedNote = await newNote.save();
  res.status(201).json(savedNote);
});

app.delete('/api/notes/:id', authMiddleware, async (req, res) => {
  const idToDelete = req.params.id;
  await Note.findOneAndDelete({ _id: idToDelete, user: req.user.id });
  res.status(200).json({ message: 'Note deleted successfully' });
});

// Auth Routes
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }
    const newUser = new User({ username, password });
    const savedUser = await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: { id: savedUser._id, username: savedUser.username }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during registration.", error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error during login." });
  }
});

app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({ id: req.user.id, username: req.user.username });
});

// Work Session Routes
app.post('/api/sessions', authMiddleware, async (req, res) => {
  try {
    const { duration, task } = req.body;
    const newSession = new WorkSession({
      duration: duration || 0,
      task: task || 'General Work',
      date: new Date(),
      user: req.user.id
    });
    const savedSession = await newSession.save();
    res.status(201).json(savedSession);
  } catch(error) {
    console.error("Error saving work session:", error);
    res.status(500).json({ message: "Server error while saving work session." });
  }
});

app.get('/api/sessions', authMiddleware, async (req, res) => {
  try {
    const sessions = await WorkSession.find({user: req.user.id}).sort({date: -1});
    res.json(sessions);
  } catch(error) {
    res.status(500).json({ message: "Server error while fetching work sessions." });
  }
});

// --- HEATMAP ENDPOINT ---
app.get('/api/sessions/heatmap', authMiddleware, async (req, res) => {
  try {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const data = await WorkSession.aggregate([
      // 1. Filter for sessions belonging to the logged-in user from the last year
      {
        $match: {
          user: new mongoose.Types.ObjectId(req.user.id),
          date: { $gte: oneYearAgo }
        }
      },
      // 2. Group documents by date and sum the durations
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          totalDuration: { $sum: "$duration" }
        }
      },
      // 3. Format the output
      {
        $project: {
          _id: 0,
          date: "$_id",
          count: "$totalDuration" // The heatmap library expects a 'count' property
        }
      }
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});