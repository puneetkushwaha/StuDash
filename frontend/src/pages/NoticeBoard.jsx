import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Info, AlertOctagon, Search, Filter, Calendar } from 'lucide-react';
import { announcementService } from '../services/api';
import './Modules.css';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await announcementService.getAnnouncements();
        setNotices(res.data);
      } catch (err) {
        console.error("Error fetching announcements:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  const filteredNotices = filter === 'All' ? notices : notices.filter(n => n.category === filter);

  const getUrgencyColor = (type) => {
    switch (type) {
      case 'urgent': return "#ef4444";
      case 'success': return "#10b981";
      default: return "var(--primary)";
    }
  };

  if (loading) return <div className="loading-shimmer-full">Synchronizing Campus Updates...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="module-container"
    >
      <div className="card-header-flex glass-card-premium">
        <div className="header-left">
          <h2><Bell size={24} /> Campus Announcement Board</h2>
          <p>Real-time updates from university administration.</p>
        </div>
        <div className="header-actions">
          <div className="search-bar-mini">
            <Search size={18} />
            <input type="text" placeholder="Search notices..." />
          </div>
          <select 
            className="filter-select-glass" 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Exam">Exams</option>
            <option value="Workshop">Workshops</option>
            <option value="Holiday">Holidays</option>
          </select>
        </div>
      </div>

      <div className="notices-grid">
        {filteredNotices.length > 0 ? (
          filteredNotices.map((notice, index) => (
            <motion.div 
              key={notice._id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="notice-card-detailed glass-card-premium"
              style={{ borderLeft: `4px solid ${getUrgencyColor(notice.type)}` }}
            >
              <div className="notice-type-badge" style={{ color: getUrgencyColor(notice.type) }}>
                {notice.category}
              </div>
              <h3>{notice.title}</h3>
              <p>{notice.description}</p>
              <div className="notice-footer-flex">
                <span className="notice-date-glass"><Calendar size={14} /> {notice.date}</span>
                <button className="read-more-btn">Read Full Notice</button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="empty-notices-full glass-card-premium">
            <Info size={48} />
            <h3>No announcements found for this category.</h3>
            <p>Check back later for new updates.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default NoticeBoard;
