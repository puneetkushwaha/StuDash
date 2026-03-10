import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, CheckCircle, Clock, BarChart2, FileText } from 'lucide-react';
import './Modules.css';

const AcademicInfo = () => {
  const courses = [
    { id: 1, code: "CSE-401", name: "Distributed Systems", credits: 4, grade: "A", status: "Completed" },
    { id: 2, code: "CSE-402", name: "Artificial Intelligence", credits: 4, grade: "A-", status: "Ongoing" },
    { id: 3, code: "CSE-403", name: "Network Security", credits: 3, grade: "B+", status: "Ongoing" },
    { id: 4, code: "CSE-404", name: "Cloud Computing", credits: 3, grade: "N/A", status: "Ongoing" },
  ];

  const semesterPerformance = [
    { sem: "Sem 1", gpa: 8.2 },
    { sem: "Sem 2", gpa: 8.5 },
    { sem: "Sem 3", gpa: 8.0 },
    { sem: "Sem 4", gpa: 8.7 },
    { sem: "Sem 5", gpa: 8.4 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="module-container"
    >
      <div className="summary-cards-row">
        <div className="stat-card-glass">
          <BookOpen color="var(--primary)" />
          <div>
            <h3>24</h3>
            <p>Total Credits</p>
          </div>
        </div>
        <div className="stat-card-glass">
          <Award color="#fbbf24" />
          <div>
            <h3>8.4</h3>
            <p>Current CGPA</p>
          </div>
        </div>
        <div className="stat-card-glass">
          <CheckCircle color="#10b981" />
          <div>
            <h3>{courses.filter(c => c.status === "Completed").length}</h3>
            <p>Courses Passed</p>
          </div>
        </div>
      </div>

      <div className="academic-grid-main">
        <div className="courses-table-container glass-card-premium">
          <div className="card-header-flex">
            <h3><FileText size={20} /> Current Course Enrollments</h3>
            <button className="view-btn-mini">Download Syllabus</button>
          </div>
          <div className="table-responsive">
            <table className="premium-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Course Name</th>
                  <th>Credits</th>
                  <th>Status</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id}>
                    <td className="font-bold">{course.code}</td>
                    <td>{course.name}</td>
                    <td>{course.credits}</td>
                    <td><span className={`status-pill ${course.status.toLowerCase()}`}>{course.status}</span></td>
                    <td className="font-bold text-primary">{course.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="performance-chart-mini glass-card-premium">
          <h3><BarChart2 size={20} /> Semester Wise SGPA</h3>
          <div className="bar-chart-container">
            {semesterPerformance.map((data, index) => (
              <div key={index} className="bar-group">
                <div 
                  className="bar-fill" 
                  style={{ height: `${data.gpa * 10}%` }}
                >
                  <span className="bar-value">{data.gpa}</span>
                </div>
                <span className="bar-label">{data.sem}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AcademicInfo;
