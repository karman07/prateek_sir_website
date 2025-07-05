import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooks } from '@/contexts/BooksContext';
import { motion } from 'framer-motion';
import { COLORS } from '@/constants/colors';
import { BookOpen, ArrowRight } from 'lucide-react';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const books = useBooks();
  const navigate = useNavigate();
  const [showAllContents, setShowAllContents] = useState(false);

  const book = books.find((b) => b._id === id);
  const similarBooks = books.filter((b) => b._id !== id);

  if (!book) {
    return (
      <div className="text-center py-20 text-lg" style={{ color: COLORS.textMuted2 }}>
        Book not found.
      </div>
    );
  }

  const visibleContents = showAllContents
    ? book.tableOfContents
    : book.tableOfContents?.slice(0, 5);

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Book Details */}
        <motion.div
          className="grid md:grid-cols-2 gap-12 items-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* ✅ Fixed Book Cover */}
          <div className="w-full max-h-[500px] aspect-[3/4] relative bg-white rounded-2xl shadow-2xl overflow-hidden mt-4">
            <img
              src={book.image}
              alt={book.title}
              className="absolute inset-0 w-full h-full object-contain p-4"
            />
          </div>

          <div className="flex flex-col justify-between space-y-8 mt-4">
            <div>
              <h1 className="text-4xl font-bold mb-4" style={{ color: COLORS.primaryBg }}>
                {book.title}
              </h1>
              <p className="text-lg leading-relaxed" style={{ color: COLORS.textMuted2 }}>
                {book.description}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-xl font-semibold" style={{ color: COLORS.accent }}>
                Price: {book.price}
              </p>
              <a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl font-medium transition text-white hover:scale-105 duration-300 shadow-md"
                style={{ backgroundColor: COLORS.primaryBg }}
              >
                Buy Now
              </a>
            </div>
          </div>
        </motion.div>

        {/* Table of Contents */}
        {book.tableOfContents && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: COLORS.primaryBg }}>
              <BookOpen className="w-6 h-6" /> Table of Contents
            </h2>
            <ul className="space-y-3 pl-4 list-none">
              {visibleContents?.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-slate-600 text-base">
                  <span className="w-2 h-2 mt-2 rounded-full" style={{ backgroundColor: COLORS.accent }} />
                  {item}
                </li>
              ))}
            </ul>

            {book.tableOfContents.length > 5 && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setShowAllContents(!showAllContents)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all shadow-sm border border-slate-300 hover:bg-slate-100"
                >
                  {showAllContents ? 'Show Less' : 'Show More'}
                  <motion.span
                    animate={{ rotate: showAllContents ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Similar Books */}
        <div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.primaryBg }}>
            Similar Books
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {similarBooks.map((similar) => (
              <motion.div
                key={similar._id}
                whileHover={{ y: -4 }}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 cursor-pointer"
                onClick={() => navigate(`/books/${similar._id}`)}
              >
                {/* ✅ Fixed Similar Book Image */}
                <div className="h-48 w-full relative bg-white overflow-hidden">
                  <img
                    src={similar.image}
                    alt={similar.title}
                    className="absolute inset-0 w-full h-full object-contain p-2"
                  />
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold" style={{ color: COLORS.primaryBg }}>
                    {similar.title}
                  </h3>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {similar.description}
                  </p>
                  <div className="text-sm font-semibold" style={{ color: COLORS.accent }}>
                    {similar.price}
                  </div>
                  <div className="flex items-center text-sm font-medium" style={{ color: COLORS.accent }}>
                    View Details <ArrowRight className="ml-1 w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
