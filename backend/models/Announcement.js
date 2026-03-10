const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Exam', 'Workshop', 'Holiday', 'General'],
    default: 'General'
  },
  type: {
    type: String,
    enum: ['urgent', 'info', 'success'],
    default: 'info'
  }
}, { timestamps: true });

module.exports = mongoose.model('Announcement', announcementSchema);
