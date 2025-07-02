import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '@/constants/colors';
import { useBooks } from '@/contexts/BooksContext';
import BookCard from '@/components/BookCard';

const Books: React.FC = () => {
  const books = useBooks();

  return (
    <section
      className="w-full px-4 py-16 sm:px-6 md:px-12 lg:px-20 xl:px-32"
      style={{ backgroundColor: '#fff', color: COLORS.textPrimary }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-12 text-slate-800"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span style={{ color: COLORS.accent }}>Books</span> by Me
        </motion.h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {books.slice(0, 3).map((book, idx) => (
            <BookCard key={idx} book={book} idx={idx} />
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button
            className="text-sm sm:text-base px-6 py-3 rounded-xl font-medium transition hover:scale-105"
            style={{
              backgroundColor: COLORS.accent,
              color: '#fff',
            }}
            // onClick={() => navigate('/books')}
          >
            View More Books
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Books;
