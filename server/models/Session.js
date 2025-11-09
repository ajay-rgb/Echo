const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
    duration: { type: Number, required: true }, // milliseconds
    task: { type: String, default: 'General Work' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Session', sessionSchema);
