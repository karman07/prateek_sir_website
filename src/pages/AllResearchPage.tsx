import React, { useState } from 'react';
import { useResearch } from '@/contexts/ResearchContext';
import { COLORS } from '@/constants/colors';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AllResearchPage: React.FC = () => {
  const research = useResearch();
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredResearch = research.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white px-4 py-28 md:px-20">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-12 text-slate-800"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Explore <span className='bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text'>Research Work</span>
      </motion.h1>

      <div className="max-w-xl mx-auto mb-12 relative">
        <Search className="absolute left-3 top-3 text-slate-400" size={20} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search research by title..."
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {filteredResearch.length === 0 ? (
        <p className="text-center text-slate-500 text-lg">No research work found.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResearch.map((item, idx) => (
            <motion.div
              key={item._id}
              className="rounded-2xl border border-slate-200 shadow-md bg-white p-5 flex flex-col justify-between hover:shadow-lg transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 mb-3">
                  <span className="font-semibold">Amount:</span> {item.amount}
                </p>
                <p className="text-sm text-slate-600 mb-1">
                  <span className="font-semibold">Agency:</span> {item.fundingAgency}
                </p>
                <p className="text-sm text-slate-600 mb-1">
                  <span className="font-semibold">Scheme:</span> {item.scheme}
                </p>
                <p className="text-sm text-slate-600 mb-3">
                  <span className="font-semibold">Duration:</span> {item.duration}
                </p>
              </div>
              <div className="flex justify-between items-end mt-4">
                <span className="text-sm text-slate-500 italic">{item.investigators}</span>
                <button
                  onClick={() => navigate(`/research/${item._id}`)}
                  className="text-sm font-medium hover:underline"
                  style={{ color: COLORS.accent }}
                >
                  Learn More →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllResearchPage;
