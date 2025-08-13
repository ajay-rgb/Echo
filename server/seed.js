

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// --- Import Your Models ---
// Note: You'll need to export your models from where they are defined.
// For now, we'll redefine them here for simplicity.
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

const workSessionSchema = new mongoose.Schema({
  duration: { type: Number, required: true },
  task: { type: String, required: true, trim: true },
  date: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});
const WorkSession = mongoose.model('WorkSession', workSessionSchema);

const noteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});
const Note = mongoose.model('Note', noteSchema);


// --- The Seeding Function ---
const seedDatabase = async () => {
  try {
    // 1. Connect to the database
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB for seeding.");

    // 2. Clear existing sample data
    await User.deleteMany({ username: 'demouser' });
    // Note: This will delete ALL sessions and notes. Be careful on a real DB.
    // For this project, we assume all sessions/notes belong to the demo user.
    await WorkSession.deleteMany({});
    await Note.deleteMany({});
    console.log("Cleared old sample data.");

    // 3. Create a sample user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const demoUser = new User({
      username: 'demouser',
      password: hashedPassword
    });
    await demoUser.save();
    console.log("Created sample user: demouser / password123");

    // 4. Create realistic sample work sessions
    const sessions = [
      { task: 'Building React components', duration: 5400000, daysAgo: 1 }, // 1.5 hours
      { task: 'Fixing CSS bugs', duration: 2700000, daysAgo: 1 }, // 45 mins
      { task: 'Studying data structures', duration: 3600000, daysAgo: 2 }, // 1 hour
      { task: 'Team meeting', duration: 1800000, daysAgo: 3 }, // 30 mins
      { task: 'Refactoring auth middleware', duration: 4500000, daysAgo: 3 }, // 1.25 hours
      { task: 'Deploying to Vercel', duration: 1500000, daysAgo: 5 }, // 25 mins
      { task: 'Building React components', duration: 7200000, daysAgo: 6 }, // 2 hours
      { task: 'General Work', duration: 3000000, daysAgo: 8 }, // 50 mins
    ];

    for (const session of sessions) {
      const sessionDate = new Date();
      sessionDate.setDate(sessionDate.getDate() - session.daysAgo);
      const newSession = new WorkSession({
        ...session,
        date: sessionDate,
        user: demoUser._id
      });
      await newSession.save();
    }
    console.log("Seeded work sessions.");

    // 5. Create realistic sample notes
    const notes = [
      { text: 'Remember to check Recharts documentation for tooltips.' },
      { text: 'Bug found on login page - text alignment is off on mobile.' },
      { text: 'Plan next feature: calendar integration.' }
    ];

    for (const note of notes) {
      const newNote = new Note({
        ...note,
        user: demoUser._id
      });
      await newNote.save();
    }
    console.log("Seeded notes.");

  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // 6. Disconnect from the database
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
};

// Run the function
seedDatabase();