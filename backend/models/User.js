const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  googleId: {
    type: String
  },
  department: {
    type: String,
    default: "Computer Science & Engineering"
  },
  semester: {
    type: String,
    default: "6th Semester"
  },
  studentId: {
    type: String,
    default: function() {
      return 'STU-' + Math.floor(1000 + Math.random() * 9000);
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
