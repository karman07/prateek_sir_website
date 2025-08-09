import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, BookOpen, Users, ChevronDown, X } from 'lucide-react';
import { useJournals } from '../contexts/JournalContext';

const JournalPublications: React.FC = () => {
  const { journals } = useJournals();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedJournal, setSelectedJournal] = useState('');
  const [sortBy, setSortBy] = useState('year-desc');
  const [showFilters, setShowFilters] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Get unique years and journals for filters
  const uniqueYears = useMemo(() => {
    return [...new Set(journals.map(j => j.year))].sort((a, b) => b.localeCompare(a));
  }, [journals]);

  const uniqueJournals = useMemo(() => {
    return [...new Set(journals.map(j => j.journal))].sort();
  }, [journals]);

  // Filter and sort journals
  const filteredAndSortedJournals = useMemo(() => {
    let filtered = journals.filter(journal => {
      const matchesSearch = !searchTerm || 
        journal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        journal.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
        journal.journal.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesYear = !selectedYear || journal.year === selectedYear;
      const matchesJournal = !selectedJournal || journal.journal === selectedJournal;
      
      return matchesSearch && matchesYear && matchesJournal;
    });

    // Sort journals
    switch (sortBy) {
      case 'year-desc':
        return filtered.sort((a, b) => b.year.localeCompare(a.year));
      case 'year-asc':
        return filtered.sort((a, b) => a.year.localeCompare(b.year));
      case 'title':
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case 'journal':
        return filtered.sort((a, b) => a.journal.localeCompare(b.journal));
      default:
        return filtered;
    }
  }, [journals, searchTerm, selectedYear, selectedJournal, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedYear('');
    setSelectedJournal('');
    setSortBy('year-desc');
    setAnimationKey(prev => prev + 1);
  };

  const activeFiltersCount = [searchTerm, selectedYear, selectedJournal].filter(Boolean).length;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 px-4 sm:px-8 mt-24">
        <div className="max-w-6xl mx-auto">
          {/* Header with enhanced animation */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4 text-slate-800">
              SCI <span className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 text-transparent bg-clip-text animate-gradient">Publications</span>
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Discover our latest research contributions and scientific publications
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 mb-8 overflow-hidden">
            {/* Search Bar */}
            <div className="p-6 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by title, authors, or journal..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <div className="px-6 py-3 bg-slate-50 border-b border-slate-100">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Advanced Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="p-6 bg-slate-50 animate-slide-down">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* Year Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <Calendar className="inline w-4 h-4 mr-1" />
                      Year
                    </label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Years</option>
                      {uniqueYears.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>

                  {/* Journal Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <BookOpen className="inline w-4 h-4 mr-1" />
                      Journal
                    </label>
                    <select
                      value={selectedJournal}
                      onChange={(e) => setSelectedJournal(e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Journals</option>
                      {uniqueJournals.map(journal => (
                        <option key={journal} value={journal}>{journal}</option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Options */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Sort By
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="year-desc">Year (Newest)</option>
                      <option value="year-asc">Year (Oldest)</option>
                      <option value="title">Title (A-Z)</option>
                      <option value="journal">Journal (A-Z)</option>
                    </select>
                  </div>
                </div>

                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Results Counter */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-slate-600">
              Showing {filteredAndSortedJournals.length} of {journals.length} publications
            </p>
          </div>

          {/* Publications List */}
          <div key={animationKey} className="space-y-6">
            {filteredAndSortedJournals.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">No publications found</h3>
                <p className="text-slate-500">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <ol className="space-y-6 list-none">
                {filteredAndSortedJournals.map((j, idx) => (
                  <li
                    key={j._id || idx}
                    className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 overflow-hidden animate-slide-up relative"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="p-6">
                      {/* Publication Number and Year Badge */}
                      <div className="flex justify-between items-start mb-3">
                        <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          #{idx + 1}
                        </span>
                        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium">
                          {j.year}
                        </span>
                      </div>

                      {/* Publication Details */}
                      <div className="space-y-3">
                        {/* Title */}
                        <h3 className="text-xl font-semibold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">
                          {j.title}
                        </h3>

                        {/* Authors */}
                        <div className="flex items-start gap-2">
                          <Users className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                          <p className="text-slate-600 font-medium">
                            {j.authors}
                          </p>
                        </div>

                        {/* Journal Information */}
                        <div className="flex items-start gap-2">
                          <BookOpen className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                          <p className="text-slate-600">
                            <em className="text-indigo-600 font-medium">{j.journal}</em>
                            {j.volume && <span className="ml-1">Vol. {j.volume}</span>}
                            {j.number && <span>, No. {j.number}</span>}
                            <span className="ml-1">({j.year}): {j.pages}</span>
                          </p>
                        </div>
                      </div>

                      {/* Hover Effect Line */}
                      <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
    </>
  );
};

export default JournalPublications;