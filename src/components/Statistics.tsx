import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { COLORS,COLORS_PIE } from '@/constants/colors';

const stats = [
  { label: 'Startups', value: 750 },
  { label: 'Patents', value: 1230 },
  { label: 'Projects', value: 1500 },
  { label: 'Publications', value: 400 },
  { label: 'Students', value: 1000 },
];

const chartTypes = ['Bar Chart', 'Pie Chart', 'Line Chart'];

const Statistics: React.FC = () => {
  const [selectedChart, setSelectedChart] = useState('Bar Chart');

  const renderChart = () => {
    if (selectedChart === 'Bar Chart') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats}>
            <XAxis dataKey="label" stroke={COLORS.textMuted} />
            <Tooltip
              contentStyle={{
                backgroundColor: COLORS.primaryBg,
                border: 'none',
                color: '#fff',
              }}
            />
            <Bar dataKey="value" fill={COLORS.accent} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (selectedChart === 'Pie Chart') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={stats}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {stats.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS_PIE[index % COLORS_PIE.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip
              contentStyle={{
                backgroundColor: COLORS.primaryBg,
                border: 'none',
                color: '#fff',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      );
    }

    if (selectedChart === 'Line Chart') {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={stats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" stroke={COLORS.textMuted} />
            <YAxis stroke={COLORS.textMuted} />
            <Tooltip
              contentStyle={{
                backgroundColor: COLORS.primaryBg,
                border: 'none',
                color: '#fff',
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={COLORS.accent}
              strokeWidth={3}
              dot={{ fill: COLORS.gradientAccent}}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    return null;
  };

  return (
    <section
      className="w-full px-4 py-16 sm:px-6 md:px-12 lg:px-20 xl:px-32"
      style={{ backgroundColor: COLORS.primaryBg, color: COLORS.textPrimary }}
    >
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold">
          My <span className={COLORS.gradientText}>Statistics</span>
        </h2>
        <p className="text-sm sm:text-base mt-2 text-slate-300 max-w-xl mx-auto">
          An overview of contributions in academia, research, and student mentorship.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-center text-center">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            className="bg-white/10 rounded-xl p-5 border border-white/10 shadow-md hover:shadow-lg transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <h3 className="text-3xl font-bold text-white mb-2">
              <CountUp end={stat.value} duration={2} suffix={stat.value >= 100 ? '+' : ''} />
            </h3>
            <p className="text-slate-300 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mt-12 flex-wrap">
        {chartTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedChart(type)}
            className={`text-sm sm:text-base px-5 py-2 rounded-full border transition hover:scale-105 ${
              selectedChart === type
                ? 'bg-white text-blue-600 font-semibold'
                : 'bg-white/10 text-white border-white/20'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Chart Display */}
      <div className="mt-10 w-full h-[300px]">
        {renderChart()}
      </div>
    </section>
  );
};

export default Statistics;
