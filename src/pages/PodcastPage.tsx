import React, { useState, useMemo } from 'react';
import { usePodcasts } from '@/contexts/PodcastContext';
import { Mic, MapPin, CalendarDays, Search, Filter, X } from 'lucide-react';

const PodcastPage: React.FC = () => {
  const podcasts = usePodcasts();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Remove duplicates based on topic + place + date combination
  const uniquePodcasts = useMemo(() => {
    const seen = new Set();
    return podcasts.filter((podcast) => {
      const uniqueKey = `${podcast.topic.toLowerCase().trim()}-${podcast.place.toLowerCase().trim()}-${podcast.date}`;
      if (seen.has(uniqueKey)) {
        return false;
      }
      seen.add(uniqueKey);
      return true;
    });
  }, [podcasts]);

  // Extract unique places for filter options from deduplicated data
  const uniquePlaces = [...new Set(uniquePodcasts.map(podcast => podcast.place))];

  const filteredAndSortedPodcasts = uniquePodcasts
    .filter((podcast) => {
      const matchesSearch = `${podcast.topic} ${podcast.place} ${podcast.date}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      
      const matchesFilter = filterBy === 'all' || podcast.place === filterBy;
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'topic':
          return a.topic.localeCompare(b.topic);
        case 'place':
          return a.place.localeCompare(b.place);
        default:
          return 0;
      }
    });

  const clearFilters = () => {
    setSearchQuery('');
    setSortBy('date');
    setFilterBy('all');
  };

  return (
    <section className="w-full px-6 pt-32 pb-20 sm:px-8 md:px-16 lg:px-24 xl:px-32 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-slate-900">
            All{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-transparent bg-clip-text">
              Talks & Podcasts
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover inspiring conversations and thought-provoking discussions
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative mb-6">
            <Search className="absolute top-4 left-4 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by topic, location, or date..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-700"
            >
              <Filter size={18} />
              Filters {(filterBy !== 'all' || sortBy !== 'date') && <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">Active</span>}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Filter Options</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="date">Date (Newest First)</option>
                    <option value="topic">Topic (A-Z)</option>
                    <option value="place">Location (A-Z)</option>
                  </select>
                </div>

                {/* Filter By Location */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Filter by Location
                  </label>
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="all">All Locations</option>
                    {uniquePlaces.map((place) => (
                      <option key={place} value={place}>
                        {place}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Clear Filters */}
              {(filterBy !== 'all' || sortBy !== 'date' || searchQuery) && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <button
                    onClick={clearFilters}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="text-center text-slate-600 mb-8">
            Showing {filteredAndSortedPodcasts.length} of {uniquePodcasts.length} podcasts
          </div>
        </div>

        {/* Podcast Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedPodcasts.length > 0 ? (
            filteredAndSortedPodcasts.map((podcast, index) => (
              <div
                key={`${podcast.topic}-${podcast.place}-${podcast.date}-${index}`}
                className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col gap-4 hover:border-blue-200 group"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.5s ease-out forwards'
                }}
              >
                {/* Topic */}
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg shrink-0 group-hover:bg-blue-200 transition-colors">
                    <Mic size={20} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold leading-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                    {podcast.topic}
                  </h3>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3">
                  <div className="bg-rose-100 p-1.5 rounded-lg shrink-0">
                    <MapPin size={16} className="text-rose-600" />
                  </div>
                  <p className="text-slate-600 text-sm font-medium">{podcast.place}</p>
                </div>

                {/* Date */}
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-1.5 rounded-lg shrink-0">
                    <CalendarDays size={16} className="text-emerald-600" />
                  </div>
                  <p className="text-slate-600 text-sm font-medium">
                    {new Date(podcast.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2"></div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="bg-slate-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Search size={24} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">No podcasts found</h3>
              <p className="text-slate-500 mb-4">Try adjusting your search or filter criteria</p>
              {(searchQuery || filterBy !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Animation CSS */}
      {/* <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style> */}
    </section>
  );
};

export default PodcastPage;