import React from 'react';
import { motion } from 'framer-motion';
import { FileText, TrendingUp, Users, Calendar } from 'lucide-react';
import './MetricCard.css';

const MetricCard = ({ title, value, color, variant, index }) => {
  const getIcon = () => {
    switch (title) {
      case 'Total Payable': return <Calendar size={28} />;
      case 'Total Paid': return <TrendingUp size={28} />;
      case 'Others': return <Users size={28} />;
      default: return <FileText size={28} />;
    }
  };

  return (
    <motion.div 
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
      whileHover={{ scale: 1.05 }}
      className={`metric-card-new glass-card glow-on-hover ${variant === 'highlight' ? 'highlighted' : ''}`}
    >
      <div className="metric-content-new">
        <div className="icon-circle" style={{ color: color }}>
          <div className="icon-bg-overlay" style={{ background: color }}></div>
          {getIcon()}
          <div className="icon-glow" style={{ background: color }}></div>
        </div>
        <div className="metric-text-new">
          <span className="metric-val-new">{value}</span>
          <span className="metric-label-new">{title}</span>
        </div>
      </div>
    </motion.div>
  );
};


export default MetricCard;
