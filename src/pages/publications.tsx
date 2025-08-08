import React, { useState, useEffect } from 'react';
import { usePublications } from '@/contexts/PublicationsContext';
import PublicationCard from '@/components/PublicationCard';
import { Search, Mic, MicOff, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { COLORS } from '@/constants/colors';

const PublicationsPage: React.FC = () => {
  const publications = usePublications();
  const [search, setSearch] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [listeningTriggered, setListeningTriggered] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  // Extract unique years for filter
  const years = Array.from(new Set(publications.map(p => p.year))).sort((a, b) => b - a);

  useEffect(() => {
    if (!listening && transcript && listeningTriggered) {
      setSearch(transcript);
      setListeningTriggered(false);
    }
  }, [transcript, listening, listeningTriggered]);

  const handleMicClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: false, language: 'en-IN' });
      setListeningTriggered(true);
    }
  };

  const filteredPublications = publications.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.authors.toLowerCase().includes(search.toLowerCase()) ||
      String(p.year).includes(search);

    const matchesYear = selectedYear === 'All' || String(p.year) === selectedYear;

    return matchesSearch && matchesYear;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-32 pb-16 px-4 md:px-16">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-10"
        style={{ color: COLORS.textPrimary2 }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Explore My{' '}
        <span className='bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text'>
          Publications
        </span>
      </motion.h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row items-center max-w-4xl mx-auto mb-12 gap-4">
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search publications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-12 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white/80 backdrop-blur-sm"
          />
          <button
            type="button"
            onClick={handleMicClick}
            className={`absolute right-3 top-2 text-slate-500 ${listening ? 'text-blue-500 animate-pulse' : ''}`}
          >
            {listening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
        </div>

        {/* Year Filter */}
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="pl-8 pr-4 py-2 border border-slate-300 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="All">All Years</option>
            {years.map((year) => (
              <option key={year} value={String(year)}>{year}</option>
            ))}
          </select>
          <Filter className="absolute left-2 top-3 text-slate-400" size={18} />
        </div>
      </div>

      {!browserSupportsSpeechRecognition && (
        <p className="text-center text-red-500 mb-4">
          Your browser does not support voice recognition.
        </p>
      )}

      {/* Publications Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPublications.length === 0 ? (
          <p className="text-center text-slate-500 col-span-full">No publications found.</p>
        ) : (
          filteredPublications.map((p, idx) => (
            <PublicationCard key={p._id} publication={p} idx={idx} />
          ))
        )}
      </div>
    </div>
  );
};

export default PublicationsPage;
