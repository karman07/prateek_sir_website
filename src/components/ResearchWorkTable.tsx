import React from 'react';
import { useResearch } from '@/contexts/ResearchContext';
import { COLORS } from '@/constants/colors';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ResearchWorkCards: React.FC = () => {
  const projects = useResearch();
  const navigate = useNavigate();

  // Show only first 3 projects
  const visibleProjects = projects.slice(0, 3);

  return (
    <section className="w-full px-4 py-16 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-white">
      <div className="max-w-none mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center">
          Research <span className={`${COLORS.gradientText}`}>Projects</span>
        </h2>

        {/* Cards */}
        {visibleProjects.length === 0 ? (
          <p className="text-center text-slate-500 text-lg">No research work found.</p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((proj, idx) => (
              <motion.div
                key={proj._id}
                className="rounded-2xl border border-slate-200 shadow-md bg-white p-5 flex flex-col justify-between hover:shadow-lg transition"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{proj.title}</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    <span className="font-semibold">Amount:</span> {proj.amount}
                  </p>
                  <p className="text-sm text-slate-600 mb-1">
                    <span className="font-semibold">Agency:</span> {proj.fundingAgency}
                  </p>
                  <p className="text-sm text-slate-600 mb-1">
                    <span className="font-semibold">Scheme:</span> {proj.scheme}
                  </p>
                  <p className="text-sm text-slate-600 mb-3">
                    <span className="font-semibold">Duration:</span> {proj.duration}
                  </p>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <span className="text-sm text-slate-500 italic">{proj.investigators}</span>
                  <button
                    onClick={() => navigate(`/research/${proj._id}`)}
                    className="text-sm font-medium hover:underline"
                    style={{ color: COLORS.gradientAccent }}
                  >
                    Learn More →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* View More Button */}
        {projects.length > 3 && (
          <div className="text-center mt-10">
            <button
              className={`px-6 py-2 rounded-lg text-sm font-medium text-white transition duration-300 ${COLORS.gradientAccent}`}
              onClick={() => {
                navigate('/research');
              }}
            >
              View More →
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResearchWorkCards;
