const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Announcement = require('./models/Announcement');

dotenv.config();

const announcements = [
  {
    title: "Mid-Term Examination Schedule",
    description: "The schedule for the 6th-semester mid-term examination has been released. Please check the student portal for details.",
    date: "2026-03-20",
    category: "Exam",
    type: "urgent"
  },
  {
    title: "Full Stack Workshop",
    description: "A three-day intensive workshop on modern full-stack development using React and Node.js will be held in Hall A.",
    date: "2026-03-25",
    category: "Workshop",
    type: "info"
  },
  {
    title: "Holi Break",
    description: "The college will remain closed on March 14th and 15th for the Holi festival.",
    date: "2026-03-14",
    category: "Holiday",
    type: "success"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');
    
    await Announcement.deleteMany({});
    console.log('Cleared existing announcements.');
    
    await Announcement.insertMany(announcements);
    console.log('Successfully seeded 3 announcements.');
    
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedDB();
