import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import './WelcomeBanner.css';

const WelcomeBanner = ({ studentName }) => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="welcome-banner"
    >
      <div className="banner-text">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.4 }}
          className="banner-date"
        >
          {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </motion.span>
        <h1>Welcome back, {studentName}!</h1>
        <p>Your academic performance is looking exceptional this semester. Keep up the high energy! ⚡</p>
      </div>
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="banner-illustration"
      >
        <Zap size={100} fill="var(--primary)" />
      </motion.div>
    </motion.div>
  );
};

export default WelcomeBanner;
