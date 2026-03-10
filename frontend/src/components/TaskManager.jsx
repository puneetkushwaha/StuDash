import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, Trash2, Clock, AlertCircle } from 'lucide-react';
import { taskService } from '../services/api';
import './TaskManager.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await taskService.getAll();
      setTasks(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load tasks");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    try {
      const res = await taskService.create({ 
        title: newTask,
        deadline: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      setTasks([res.data, ...tasks]);
      setNewTask("");
    } catch (err) {
      setError("Failed to add task");
    }
  };

  const toggleTask = async (task) => {
    try {
      const res = await taskService.update(task._id, { completed: !task.completed });
      setTasks(tasks.map(t => t._id === task._id ? res.data : t));
    } catch (err) {
      setError("Failed to update task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  if (loading && tasks.length === 0) return <div className="loading-shimmer-mini">Syncing Tasks...</div>;

  return (
    <div className="task-manager-glass">
      {error && (
        <div className="task-error-msg">
          <AlertCircle size={14} /> {error}
        </div>
      )}

      <div className="task-header-mini">
        <h3>To-Do List</h3>
        <span className="task-count">{tasks.filter(t => !t.completed).length} Pending</span>
      </div>

      <form onSubmit={addTask} className="task-input-group">
        <input 
          type="text" 
          placeholder="What needs to be done?" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className="add-task-btn">
          <Plus size={20} />
        </button>
      </form>

      <div className="task-list-mini scrollable-tasks">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div 
              key={task._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`task-item-premium ${task.completed ? 'completed' : ''}`}
            >
              <button 
                onClick={() => toggleTask(task)}
                className={`check-btn ${task.completed ? 'is-checked' : ''}`}
              >
                {task.completed && <Check size={14} />}
              </button>
              <div className="task-content">
                <p>{task.title}</p>
                <span className="task-time"><Clock size={12} /> {task.deadline}</span>
              </div>
              <button onClick={() => deleteTask(task._id)} className="delete-task-btn">
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        {tasks.length === 0 && !loading && (
          <div className="empty-tasks-placeholder">
            No tasks for today. Relax!
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
