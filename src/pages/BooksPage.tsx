import React, { useState, useEffect } from 'react';
import { useBooks } from '@/contexts/BooksContext';
import BookCard from '@/components/BookCard';
import { Search, Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { COLORS } from '@/constants/colors';

const BooksPage: React.FC = () => {
  const books = useBooks();
  const [search, setSearch] = useState('');
  const [listeningTriggered, setListeningTriggered] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

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

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white pt-32 pb-16 px-4 md:px-16">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-10"
        style={{ color: COLORS.textPrimary2 }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Explore My <span style={{ color: COLORS.accent }}>Books</span>
      </motion.h1>

      {/* Search Bar */}
      <div className="flex items-center max-w-xl mx-auto mb-12 gap-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-12 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="button"
            onClick={handleMicClick}
            className={`absolute right-3 top-2 text-slate-500 ${
              listening ? 'text-blue-500 animate-pulse' : ''
            }`}
          >
            {listening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
        </div>
      </div>

      {!browserSupportsSpeechRecognition && (
        <p className="text-center text-red-500 mb-4">
          Your browser does not support voice recognition.
        </p>
      )}

      {/* Books Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBooks.length === 0 ? (
          <p className="text-center text-slate-500 col-span-full">No books found.</p>
        ) : (
          filteredBooks.map((book, idx) => (
            <BookCard key={book._id} book={book} idx={idx} />
          ))
        )}
      </div>
    </div>
  );
};

export default BooksPage;
