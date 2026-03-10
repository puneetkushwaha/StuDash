import React, { useState } from 'react';
import { Search, Bell, Moon, Sun, ChevronDown, Rocket, Menu, User, LogOut } from 'lucide-react';
import { authService } from '../services/authService';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ theme, toggleTheme, isSidebarOpen, toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = authService.getCurrentUser() || { name: 'Guest', avatar: '' };
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="navbar-premium">
      <div className="navbar-left-unique">
        {!isSidebarOpen && (
          <button onClick={toggleSidebar} className="navbar-toggle-btn-top" title="Open Sidebar">
            <Menu size={20} color="var(--primary)" />
          </button>
        )}
        <div className="search-unique-wrapper">
          <Search size={18} color="var(--primary)" className="search-icon-prism" />
          <input type="text" placeholder="Search for anything..." />
        </div>
      </div>

      <div className="navbar-right-unique">
        {/* Extreme Theme Toggle Prism */}
        <div className="theme-prism-container">
          <button 
            onClick={toggleTheme} 
            className={`theme-prism-btn ${theme === 'dark' ? 'is-dark' : 'is-light'}`}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? <Moon size={20} fill="var(--primary)" /> : <Sun size={20} fill="var(--secondary)" />}
          </button>
        </div>
        
        <div className="notification-bell-unique glass-card">
          <Bell size={20} color="var(--text-primary)" />
          <span className="bell-glow-dot"></span>
        </div>

        <div className="profile-container-relative">
          <div 
            className={`user-profile-unique glass-card ${isDropdownOpen ? 'active' : ''}`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="profile-info-mini">
              <span className="profile-name-premium">{user.name}</span>
              <span className="profile-status-online">System Active</span>
            </div>
            <div className="profile-avatar-prism">
              <img 
                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                alt="User" 
              />
            </div>
            <ChevronDown size={14} className={`dropdown-chevron ${isDropdownOpen ? 'rotate' : ''}`} />
          </div>

          {isDropdownOpen && (
            <div className="profile-dropdown-prism glass-card-premium">
              <Link to="/profile" className="dropdown-item-prism" onClick={() => setIsDropdownOpen(false)}>
                <User size={18} />
                <span>My Profile</span>
              </Link>
              <button className="dropdown-item-prism logout-prism" onClick={handleLogout}>
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
