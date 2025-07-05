import React from 'react';
import { usePodcasts } from '@/contexts/PodcastContext';
import PodcastCard from './PodcastCard';
import { COLORS } from '@/constants/colors';
import { useNavigate } from 'react-router-dom';

const PodcastList: React.FC = () => {
  const podcasts = usePodcasts();
  const navigate = useNavigate();
  return (
    <section
      className="w-full px-4 py-16 sm:px-6 md:px-12 lg:px-20 xl:px-32"
      style={{ backgroundColor: '#fff', color: COLORS.textPrimary }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-slate-800">
          Recent <span className={COLORS.gradientText}>Talks & Podcasts</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-8 mb-10">
          {podcasts.slice(0, 3).map((podcast, idx) => (
            <PodcastCard key={podcast._id} podcast={podcast} idx={idx} />
          ))}
        </div>

        <div className="mt-6">
          <button
            className={`px-6 py-2 rounded-lg text-sm font-medium text-white transition duration-300 ${COLORS.gradientAccent}`}
            onClick={() => {
              navigate('/podcast');
            }}
          >
            View More →
          </button>
        </div>
      </div>
    </section>
  );
};

export default PodcastList;
