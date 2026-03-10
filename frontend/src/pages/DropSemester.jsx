import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Info, Clock, CheckCircle, ArrowRight, ShieldAlert } from 'lucide-react';
import './Modules.css';

const DropSemester = () => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [reason, setReason] = useState('');
  const [success, setSuccess] = useState(false);

  const handleDrop = () => {
    setSuccess(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="module-container"
    >
      <div className="glass-card-premium caution-card">
        <div className="caution-header">
          <ShieldAlert size={40} color="#fbbf24" />
          <h2>Withdrawal from Current Semester</h2>
          <p>This process is irreversible for the current academic session.</p>
        </div>

        <div className="caution-content">
          <h3><AlertTriangle size={18} /> Important Considerations:</h3>
          <ul className="caution-list">
            <li>Your current course registrations will be voided.</li>
            <li>Refunds are subject to university policy (70% possible before mid-terms).</li>
            <li>Your student ID will remain active for administrative purposes.</li>
            <li>You must re-register for the next available semester.</li>
          </ul>
        </div>

        {!success ? (
          <div className="caution-action-area">
            <div className="input-group-premium">
              <label><Info size={16} /> Reason for Withdrawal</label>
              <textarea 
                placeholder="Briefly explain your reason..."
                className="glass-textarea"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <button 
              className={`drop-btn-premium ${isConfirming ? 'confirm' : ''}`}
              onClick={() => isConfirming ? handleDrop() : setIsConfirming(true)}
            >
              {isConfirming ? 'Yes, I am sure' : 'Initialize Withdrawal'}
            </button>
            
            {isConfirming && <button className="cancel-btn-mini" onClick={() => setIsConfirming(false)}>Cancel Process</button>}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="success-msg-glass"
          >
            <CheckCircle size={32} />
            <h3>Request Submitted</h3>
            <p>Your withdrawal request has been sent for administrative review.</p>
            <button className="pay-btn-premium" onClick={() => window.location.href = '/dashboard'}>Return to Dashboard</button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DropSemester;
