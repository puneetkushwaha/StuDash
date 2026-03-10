const mongoose = require('mongoose');

const academicDataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  attendance: {
    type: Number,
    default: 0
  },
  gpa: {
    type: Number,
    default: 0.0
  },
  completedAssignments: {
    type: Number,
    default: 0
  },
  totalAssignments: {
    type: Number,
    default: 0
  },
  pendingTasks: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('AcademicData', academicDataSchema);
