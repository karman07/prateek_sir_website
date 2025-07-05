import React, { useState } from 'react';
import { usePodcasts } from '@/contexts/PodcastContext';
import { Mic, MapPin, CalendarDays, Search } from 'lucide-react';

const PodcastPage: React.FC = () => {
  const podcasts = usePodcasts();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPodcasts = podcasts.filter((podcast) =>
    `${podcast.topic} ${podcast.place} ${podcast.date}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <section className="w-full px-6 pt-32 pb-20 sm:px-8 md:px-16 lg:px-24 xl:px-32 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-slate-800">
          All{' '}
          <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text">
            Talks & Podcasts
          </span>
        </h1>

        {/* Search Bar */}
        <div className="mb-12 max-w-xl mx-auto relative">
          <Search className="absolute top-3.5 left-4 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search podcasts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Podcast Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPodcasts.length > 0 ? (
            filteredPodcasts.map((podcast) => (
              <div
                key={podcast._id}
                className="bg-white border border-slate-200 rounded-2xl shadow-md hover:shadow-lg transition-all p-6 flex flex-col gap-5"
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
