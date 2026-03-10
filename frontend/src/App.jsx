import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import { authService } from './services/authService';
import { User, BookOpen, FileText, Zap, Calendar, Award, MessageSquare, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

import Profile from './pages/Profile';
import AcademicInfo from './pages/AcademicInfo';
import PaymentInfo from './pages/PaymentInfo';
import TodoListPage from './pages/TodoListPage';
import DropSemester from './pages/DropSemester';
import Result from './pages/Result';
import NoticeBoard from './pages/NoticeBoard';
import ClassSchedule from './pages/ClassSchedule';

const ProtectedRoute = ({ children }) => {
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const mainLayoutProps = { theme, toggleTheme, isSidebarOpen, toggleSidebar };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainLayout {...mainLayoutProps} />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="courses" element={<ProtectedRoute><AcademicInfo /></ProtectedRoute>} />
          <Route path="payment-info" element={<ProtectedRoute><PaymentInfo /></ProtectedRoute>} />
          <Route path="todo" element={<ProtectedRoute><TodoListPage /></ProtectedRoute>} />
          <Route path="drop-semester" element={<ProtectedRoute><DropSemester /></ProtectedRoute>} />
          <Route path="result" element={<ProtectedRoute><Result /></ProtectedRoute>} />
          <Route path="notice" element={<ProtectedRoute><NoticeBoard /></ProtectedRoute>} />
          <Route path="schedule" element={<ProtectedRoute><ClassSchedule /></ProtectedRoute>} />
          <Route path="logout" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
