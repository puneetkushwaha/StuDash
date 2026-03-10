import React from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const AcademicCharts = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleFont: { family: 'Outfit', size: 14, weight: 'bold' },
        bodyFont: { family: 'Outfit', size: 13 },
        padding: 12,
        cornerRadius: 12,
      },
    },
    scales: {
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
        ticks: { color: '#64748b', font: { family: 'Outfit', size: 12 } },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#64748b', font: { family: 'Outfit', size: 12 } },
      },
    },
  };

  const data = {
    labels: ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5', 'Unit 6'],
    datasets: [
      {
        fill: true,
        label: 'Performance',
        data: [65, 78, 72, 85, 82, 95],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#6366f1',
      },
    ],
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="glass-card"
      style={{ height: '350px', padding: '2rem' }}
    >
      <div style={{ height: '100%' }}>
        <Line options={options} data={data} />
      </div>
    </motion.div>
  );
};

export default AcademicCharts;
