import React from 'react';
import { usePoems } from '@/contexts/PoemContext';
import { motion } from 'framer-motion';

const PoemsPage: React.FC = () => {
  const poems = usePoems();

  return (
    <div className="min-h-screen px-6 sm:px-10 py-20 bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-slate-800">
          <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
            My Poems & Songs
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {poems.map((poem) => (
            <motion.div
              key={poem._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white shadow-xl rounded-3xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 tracking-tight">
                {poem.title}
              </h2>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed text-lg mb-6">
                {poem.content}
              </p>
              <a
                href={poem.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full text-sm font-medium transition duration-300"
              >
                Watch on YouTube
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PoemsPage;
