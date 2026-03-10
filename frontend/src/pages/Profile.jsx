import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Book, Hash, Edit3, Camera, MapPin } from 'lucide-react';
import { studentService } from '../services/api';
import './Modules.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await studentService.getProfile();
        setProfile(res.data.user);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="loading-shimmer-full">Synchronizing Identity...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="module-container"
    >
      <div className="profile-header-card glass-card-premium">
        <div className="profile-avatar-section">
          <div className="avatar-wrapper-large">
            <img src={profile?.avatar} alt="Profile" />
            <button className="edit-avatar-btn"><Camera size={18} /></button>
          </div>
          <div className="profile-main-info">
            <h2>{profile?.name}</h2>
            <p className="profile-badge">Student · {profile?.department || 'General'}</p>
            <div className="profile-stats-row">
              <span><strong>8.4</strong> CGPA</span>
              <span className="divider">|</span>
              <span><strong>{profile?.semester || '6th'}</strong> Semester</span>
            </div>
          </div>
        </div>
        <button className="edit-profile-btn-premium"><Edit3 size={18} /> Edit Profile</button>
      </div>

      <div className="profile-grid">
        <div className="info-card-glass">
          <h3><User size={20} /> Personal Information</h3>
          <div className="info-list">
            <div className="info-item">
              <label>Full Name</label>
              <span>{profile?.name}</span>
            </div>
            <div className="info-item">
              <label>Email Address</label>
              <span>{profile?.email}</span>
            </div>
            <div className="info-item">
              <label>Student ID</label>
              <span className="text-highlight">#{profile?.studentId || 'STU-7350'}</span>
            </div>
          </div>
        </div>

        <div className="info-card-glass">
          <h3><Book size={20} /> Academic Details</h3>
          <div className="info-list">
            <div className="info-item">
              <label>Department</label>
              <span>{profile?.department || 'Computer Science Engineering'}</span>
            </div>
            <div className="info-item">
              <label>Semester</label>
              <span>{profile?.semester || '6th Semester'}</span>
            </div>
            <div className="info-item">
              <label>Academic Status</label>
              <span className="badge-active">Active</span>
            </div>
          </div>
        </div>

        <div className="info-card-glass full-width">
          <h3><Shield size={20} /> Security & Account</h3>
          <div className="security-controls">
            <div className="security-item">
              <div>
                <h4>Two-Factor Authentication</h4>
                <p>Enhance your account security by adding an extra layer.</p>
              </div>
              <button className="toggle-btn-mini">Enable</button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
