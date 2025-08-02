const express = require('express');
const cors = require('cors');
require('dotenv').config();
const authMiddleware = require('./authMiddleware');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const port = 3000;


app.use(cors());
app.use(express.json()); 

const uri = process.env.MONGO_URI;

const noteSchema = new mongoose.Schema({
    text:{type: String, required: true},

    user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  }
});

const Note = mongoose.model('Note', noteSchema);

const userSchema = new mongoose.Schema({
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true}
});

userSchema.pre('save', async function(next) {
  // Hash the password only if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

mongoose.connect(uri)
  .then(() => {
    console.log("Successfully connected to MongoDB!");
    // 5. Start the server only after the DB connection is successful
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error("Database connection error:", err);
  });

// ENDPOINTS
// GET all notes FOR THE LOGGED-IN USER
app.get('/api/notes', authMiddleware, async (req, res) => {
  // Find notes that have a 'user' field matching the logged-in user's ID
  const notes = await Note.find({ user: req.user.id }).sort({ _id: -1 });
  res.json(notes);
});

// POST a new note FOR THE LOGGED-IN USER
app.post('/api/notes', authMiddleware, async (req, res) => {
  const newNote = new Note({
    text: req.body.text,
    user: req.user.id // Assign the logged-in user's ID to the note
  });
  const savedNote = await newNote.save();
  res.status(201).json(savedNote);
});

// DELETE a note FOR THE LOGGED-IN USER
app.delete('/api/notes/:id', authMiddleware, async (req, res) => {
  const idToDelete = req.params.id;
  // We can add a check to make sure the user owns the note before deleting
  await Note.findOneAndDelete({ _id: idToDelete, user: req.user.id });
  res.status(200).json({ message: 'Note deleted successfully' });
});

app.post('/api/register', async (req, res) => {
  try {
    // 1. Get username and password from the request body
    const { username, password } = req.body;

    // 2. Check if the username already exists in the database
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      // 400 Bad Request - username is taken
      return res.status(400).json({ message: "Username already exists." });
    }

    // 3. Create a new user instance
    const newUser = new User({
      username: username,
      password: password // The hashing will happen automatically before saving
    });

    // 4. Save the new user to the database
    const savedUser = await newUser.save();

    // 5. Send a success response (don't send the password back)
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: savedUser._id,
        username: savedUser.username
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Server error during registration.", error: error.message });
  }
});

app.post('/api/login', async(req, res)=>{
    const{username, password} = req.body;
    try{
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message: "Invalid username or password"});
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