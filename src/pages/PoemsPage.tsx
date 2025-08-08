import React, { useState } from "react";
import { motion } from "framer-motion";
import { usePoems } from "../contexts/PoemContext";

const PoemPage: React.FC = () => {
  const { videos, loading } = usePoems();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-indigo-600 text-xl font-semibold">
        Loading videos...
      </div>
    );

  return (
    <div className="min-h-screen px-6 sm:px-10 py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-slate-800">
          My{" "}
          <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
            Poems
          </span>
        </h1>

        <div className="mb-10 flex justify-center">
          <input
            type="search"
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-md px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700 placeholder-gray-400 shadow-sm transition"
          />
        </div>

        {filteredVideos.length === 0 ? (
          <p className="text-center text-gray-500 text-lg mt-20">
            No videos found matching "{searchTerm}"
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {filteredVideos.map((video, idx) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="bg-white shadow-xl rounded-3xl p-6 border border-gray-200 hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-5 block rounded-xl overflow-hidden shadow-md"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full object-cover aspect-video rounded-xl hover:scale-105 transition-transform duration-300"
                  />
                </a>

                <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {video.title}
                </h2>
                <p className="text-gray-600 flex-grow line-clamp-3 mb-6 whitespace-pre-line">
                  {video.description}
                </p>

                <a
                  href={video.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full text-sm font-medium text-center transition duration-300"
                >
                  Watch on YouTube →
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PoemPage;
