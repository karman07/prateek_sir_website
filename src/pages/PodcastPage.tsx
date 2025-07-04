import React, { useState } from 'react';
import { usePodcasts } from '@/contexts/PodcastContext';
import { Mic, MapPin, CalendarDays } from 'lucide-react';
import { COLORS } from '@/constants/colors';

const PodcastPage: React.FC = () => {
  const podcasts = usePodcasts();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPodcasts = podcasts.filter((podcast) =>
    `${podcast.topic} ${podcast.place} ${podcast.date}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <section className="w-full px-6 py-16 sm:px-8 md:px-16 lg:px-24 xl:px-32 bg-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-slate-800">
          All <span style={{ color: COLORS.accent }}>Talks & Podcasts</span>
        </h1>

        {/* Search Input */}
        <div className="mb-10 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search podcasts..."
            className="w-full px-5 py-3 rounded-lg border border-slate-300 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Podcast List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPodcasts.length > 0 ? (
            filteredPodcasts.map((podcast) => (
              <div
                key={podcast._id}
                className="bg-white border border-slate-200 rounded-2xl shadow-lg p-6 flex flex-col gap-5"
              >
                {/* Topic */}
                <div className="flex items-start gap-3 text-slate-800">
                  <Mic size={24} className="text-blue-600 mt-1 shrink-0" />
                  <h3 className="text-lg font-semibold leading-snug break-words">
                    {podcast.topic}
                  </h3>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3 text-slate-600 text-sm">
                  <MapPin size={20} className="text-rose-500 mt-0.5 shrink-0" />
                  <p className="leading-snug break-words">{podcast.place}</p>
                </div>

                {/* Date */}
                <div className="flex items-start gap-3 text-slate-600 text-sm">
                  <CalendarDays size={20} className="text-emerald-600 mt-0.5 shrink-0" />
                  <p>{podcast.date}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-500 col-span-full">No podcasts found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PodcastPage;
