import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, TrendingUp, FileText, Download, ChevronRight } from 'lucide-react';
import './Modules.css';

const Result = () => {
  const semesterResults = [
    { sem: "Semester 5", gpa: 8.4, status: "Pass", date: "Dec 2025" },
    { sem: "Semester 4", gpa: 8.7, status: "Pass", date: "June 2025" },
    { sem: "Semester 3", gpa: 8.0, status: "Pass", date: "Dec 2024" },
    { sem: "Semester 2", gpa: 8.5, status: "Pass", date: "June 2024" },
    { sem: "Semester 1", gpa: 8.2, status: "Pass", date: "Dec 2023" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="module-container"
    >
      <div className="result-stats-header">
        <div className="stat-card-glass highlight-primary">
          <Trophy size={32} color="var(--primary)" />
          <div>
            <h3>8.43</h3>
            <p>Cumulative GPA</p>
          </div>
        </div>
        <div className="stat-card-glass highlight-secondary">
          <TrendingUp size={32} color="var(--secondary)" />
          <div>
            <h3>Top 5%</h3>
            <p>Class Ranking</p>
          </div>
        </div>
      </div>

      <div className="glass-card-premium">
        <div className="card-header-flex">
          <h3><FileText size={20} /> Academic Performance Archive</h3>
          <button className="view-btn-mini">Export All Transcripts</button>
        </div>
        
        <div className="results-list">
          {semesterResults.map((res, index) => (
            <motion.div 
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="result-row-glass"
            >
              <div className="res-info">
                <h4>{res.sem}</h4>
                <span>Exam Session: {res.date}</span>
              </div>
              <div className="res-metrics">
                <div className="gpa-pill">{res.gpa} SGPA</div>
                <div className="status-pill completed">{res.status}</div>
              </div>
              <button className="icon-btn-glass"><Download size={18} /></button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Result;
