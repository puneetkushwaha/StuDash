import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Info, AlertOctagon } from 'lucide-react';
import './Announcements.css';

import { announcementService } from '../services/api';

const Announcements = () => {
  const [notices, setNotices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
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

  const getNoticeConfig = (type) => {
    switch (type) {
      case 'urgent': return { icon: <AlertOctagon size={20} />, color: "#ef4444" };
      case 'success': return { icon: <Bell size={20} />, color: "#10b981" };
      default: return { icon: <Info size={20} />, color: "var(--primary)" };
    }
  };

  if (loading && notices.length === 0) {
    return <div className="loading-shimmer-mini">Syncing notices...</div>;
  }

  return (
    <div className="announcements-container">
      <div className="announcements-list">
        {notices.length > 0 ? (
          notices.map((notice, index) => {
            const config = getNoticeConfig(notice.type);
            return (
              <motion.div 
                key={notice._id}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ x: 10 }}
                className="notice-item"
              >
                <div className="notice-icon" style={{ color: config.color }}>
                  {config.icon}
                </div>
                <div className="notice-content">
                  <h4>{notice.title}</h4>
                  <p>{notice.description}</p>
                  <span className="notice-date">{notice.date}</span>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="empty-notices">No new announcements at this time.</div>
        )}
      </div>
      <button className="see-all-btn">See all</button>
    </div>
  );
};

export default Announcements;
