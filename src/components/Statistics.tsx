import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '@/constants/colors';

const stats = [
  { label: 'Fundings', value: '$246K' },
  { label: 'Authored Books', value: '5' },
  { label: 'Online Learners', value: '50000' },
  { label: 'SCI Journals', value: '7' },
  { label: 'Invited Talks', value: '60' },
];

const Statistics: React.FC = () => {
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
            <h3 className="text-3xl font-bold text-white mb-2">{stat.value}+</h3>
            <p className="text-slate-300 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
