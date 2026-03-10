import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Award,
  CheckCircle,
  Clock,
  ChevronRight,
  TrendingUp,
  Calendar,
  BookOpen
} from 'lucide-react';
import { studentService } from '../services/api';
import MetricCard from '../components/MetricCard';
import WelcomeBanner from '../components/WelcomeBanner';
import Announcements from '../components/Announcements';
import TaskManager from '../components/TaskManager';
import { authService } from '../services/authService';
import './Dashboard.css';

const Dashboard = () => {
  const [studentData, setStudentData] = React.useState(authService.getCurrentUser() || {
    name: "Member",
    department: "Student Portal",
    semester: "Active",
    id: "STU-0000",
    avatar: ""
  });
  
  const [metrics, setMetrics] = React.useState([
    { title: "Attendance", value: "85%", icon: <Users size={20} />, progress: 85, color: "var(--primary)" },
    { title: "Current GPA", value: "8.4", icon: <Award size={20} />, progress: 8.4 * 10, color: "var(--secondary)" },
    { title: "Assignments", value: "12 / 15", icon: <CheckCircle size={20} />, progress: 80, color: "var(--accent)" },
    { title: "Pending", value: "03", icon: <Clock size={20} />, progress: 30, color: "#f59e0b" }
  ]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await studentService.getProfile();
        if (profileRes.data.success) {
          setStudentData(profileRes.data.user);
        }

        const metricsRes = await studentService.getAcademicData();
        const data = metricsRes.data;
        
        setMetrics([
          { title: "Attendance", value: `${data.attendance}%`, icon: <Users size={20} />, progress: data.attendance, color: "var(--primary)" },
          { title: "Current GPA", value: data.gpa.toString(), icon: <Award size={20} />, progress: data.gpa * 10, color: "#10b981" },
          { title: "Assignments", value: `${data.completedAssignments} / ${data.totalAssignments}`, icon: <CheckCircle size={20} />, progress: (data.completedAssignments / data.totalAssignments) * 100, color: "var(--secondary)" },
          { title: "Pending", value: data.pendingTasks.toString().padStart(2, '0'), icon: <Clock size={20} />, progress: 30, color: "#f59e0b" }
        ]);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header-flex">
        <WelcomeBanner studentName={studentData.name} />
      </div>

      <div className="finance-grid">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            index={index}
            {...metric}
          />
        ))}
      </div>

      <div className="dashboard-grid-main-3col">
        {/* Left Col: Courses */}
        <section className="dashboard-section glass-card p-6">
          <div className="section-label">
            <span>Enrolled Courses</span>
            <span className="see-all-link">Details <ChevronRight size={16} /></span>
          </div>
          <div className="courses-vertical-list">
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02, x: 5 }}
                className="course-row-item"
              >
                <div className="course-icon-bg">
                  <BookOpen size={20} color="var(--primary)" />
                </div>
                <div className="course-row-details">
                  <p className="course-title-small">{i === 1 ? 'Object Oriented Programming' : 'Database Systems'}</p>
                  <p className="course-meta-small">Lec: 40 • Credits: 4</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Center Col: Notices */}
        <section className="dashboard-section glass-card p-6">
          <div className="section-label">
            <span>Student Notices</span>
            <span className="see-all-link">Feed <TrendingUp size={16} /></span>
          </div>
          <Announcements />
        </section>

        {/* Right Col: Tasks */}
        <section className="dashboard-section glass-card p-6">
          <div className="section-label">
            <span>Daily Tasks</span>
            <Calendar size={18} color="var(--primary)" />
          </div>
          <TaskManager />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
