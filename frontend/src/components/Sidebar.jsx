import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  Calendar, 
  MessageSquare, 
  LogOut,
  Zap,
  User,
  ChevronLeft,
  ChevronRight,
  Menu,
  ListTodo
} from 'lucide-react';
import './Sidebar.css';

import { authService } from '../services/authService';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const user = authService.getCurrentUser() || { name: 'Guest', studentId: 'N/A', avatar: '' };

  const handleLogout = () => {
    authService.logout();
  };

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={22} />, path: '/dashboard' },
    { name: 'Profile', icon: <User size={22} />, path: '/profile' },
    { name: 'Academic info', icon: <BookOpen size={22} />, path: '/courses' },
    { name: 'Payment Info', icon: <FileText size={22} />, path: '/payment-info' },
    { name: 'To-Do List', icon: <ListTodo size={22} />, path: '/todo' },
    { name: 'Result', icon: <FileText size={22} />, path: '/result' },
    { name: 'Notice', icon: <MessageSquare size={22} />, path: '/notice' },
    { name: 'Schedule', icon: <Calendar size={22} />, path: '/schedule' },
  ];

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isSidebarOpen ? 'var(--sidebar-width)' : '80px' }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={`sidebar ${!isSidebarOpen ? 'collapsed' : ''}`}
    >
      <div className="sidebar-header">
        <div className="logo-box">
          <Zap className="text-white" size={24} fill="white" />
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="logo-text"
              >
                STUDASH
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <button onClick={toggleSidebar} className="sidebar-toggle-btn" title="Toggle Sidebar">
          {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="sidebar-nav scrollable">
        <ul>
          {menuItems.map((item, index) => (
            <motion.li 
              key={index}
              className="nav-item"
            >
              <NavLink 
                to={item.path} 
                className={({ isActive }) => `nav-link magnetic-item ${isActive ? 'active-link' : ''}`}
              >
                <div className="nav-icon">{item.icon}</div>
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="nav-name"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </NavLink>
            </motion.li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="sidebar-user-card glass-card"
            >
              <div className="user-card-avatar">
                <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="User" />
              </div>
              <div className="user-card-info">
                <span className="user-card-name">{user.name}</span>
                <span className="user-card-id">{user.studentId}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <NavLink to="/login" onClick={handleLogout} className="logout-link-premium">
          <LogOut size={20} />
          {isSidebarOpen && <span>Logout</span>}
        </NavLink>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
