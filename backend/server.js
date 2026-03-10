const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const AcademicData = require('./models/AcademicData');
const Announcement = require('./models/Announcement');
const auth = require('./middleware/auth');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// Real Data Endpoints
app.get('/api/student/academic-data', auth, async (req, res) => {
  try {
    const data = await AcademicData.findOne({ user: req.user.userId });
    if (!data) {
      return res.status(404).json({ message: "No academic record found for this student." });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching academic data." });
  }
});

app.get('/api/announcements', async (req, res) => {
  try {
    const data = await Announcement.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching announcements." });
  }
});

// Legacy Mock (Internal Support)
app.get('/api/student/profile-mock', (req, res) => {
  res.json({
    name: "John Doe",
    department: "Computer Science & Engineering",
    semester: "6th Semester",
    id: "CS2021045",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
  });
});

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected Successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
