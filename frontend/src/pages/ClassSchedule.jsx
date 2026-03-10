import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, MapPin, Calendar, Layers, Hash } from 'lucide-react';
import './Modules.css';

const ClassSchedule = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const periods = [
    { time: '09:00 AM', subjects: ['Algorithms (Lab)', 'Algorithms (Lab)', 'Free', 'AI', 'Free'] },
    { time: '10:30 AM', subjects: ['Free', 'Distributed Sys', 'Distributed Sys', 'Network Sec', 'Distributed Sys'] },
    { time: '12:00 PM', subjects: ['AI', 'AI', 'Network Sec', 'Free', 'Cloud Comp'] },
    { time: '02:00 PM', subjects: ['Network Sec', 'Free', 'Cloud Comp', 'AI (Lab)', 'AI (Lab)'] },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="module-container"
    >
      <div className="card-header-flex glass-card-premium">
        <div>
          <h2><Clock size={24} /> Weekly Academic Timetable</h2>
          <p>Spring 2026 Semester Schedule</p>
        </div>
        <div className="schedule-filters">
          <div className="filter-pill active">Main Campus</div>
          <div className="filter-pill">Online Classes</div>
        </div>
      </div>

      <div className="schedule-grid-container glass-card-premium">
        <div className="timetable-responsive">
          <table className="timetable-glass">
            <thead>
              <tr>
                <th>Time / Day</th>
                {days.map(day => <th key={day}>{day}</th>)}
              </tr>
            </thead>
            <tbody>
              {periods.map((period, pIdx) => (
                <tr key={pIdx}>
                  <td className="time-col">
                    <Clock size={14} /> {period.time}
                  </td>
                  {period.subjects.map((sub, sIdx) => {
                    const isFree = sub === 'Free';
                    const isLab = sub.includes('(Lab)');
                    
                    return (
                      <td key={sIdx} className="subject-cell">
                        {!isFree ? (
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className={`subject-card-mini ${isLab ? 'lab-subject' : ''}`}
                          >
                            <span className="sub-name">{sub}</span>
                            <span className="room-info"><MapPin size={10} /> {isLab ? 'Lab 3B' : 'Room 402'}</span>
                          </motion.div>
                        ) : (
                          <div className="free-period">Break</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="schedule-legend glass-card-premium">
        <h3><Layers size={18} /> Schedule Legend</h3>
        <div className="legend-items">
          <div className="legend-item"><div className="color-dot core"></div> Theory Class</div>
          <div className="legend-item"><div className="color-dot lab"></div> Lab Session</div>
          <div className="legend-item"><div className="color-dot break"></div> Break / Free</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClassSchedule;
