import React from 'react';
import { motion } from 'framer-motion';
import { ListTodo, Sparkles } from 'lucide-react';
import TaskManager from '../components/TaskManager';
import './Modules.css';

const TodoListPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="module-container"
    >
      <div className="card-header-flex glass-card-premium">
        <div className="header-left">
          <h2><ListTodo size={24} /> My Personal To-Do List</h2>
          <p>Organize your academic life with real-time sync.</p>
        </div>
        <div className="header-badge-premium">
          <Sparkles size={16} /> Beta
        </div>
      </div>

      <div className="todo-page-grid">
        <div className="todo-main-section glass-card-premium">
          <TaskManager />
        </div>
        <div className="todo-side-info glass-card-premium">
          <h3>Task Analytics</h3>
          <div className="task-stat-glass">
            <span>Productivity Score</span>
            <div className="progress-bar-glow">
              <div className="progress-inner" style={{ width: '65%' }}></div>
            </div>
          </div>
          <p className="task-tip">Tip: Completing tasks before 10 AM increases focus by 20%.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TodoListPage;
