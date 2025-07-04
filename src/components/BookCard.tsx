import React from 'react';
import { motion } from 'framer-motion';
import { Book } from '@/contexts/BooksContext';
import { COLORS } from '@/constants/colors';
import { useNavigate } from 'react-router-dom';

const truncateText = (text: string, maxLength: number) =>
  text.length > maxLength ? text.slice(0, maxLength) + '...' : text;

const BookCard: React.FC<{ book: Book; idx: number }> = ({ book, idx }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/books/${book._id}`);
  };

  return (
    <motion.div
      className="rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white flex flex-col cursor-pointer hover:shadow-2xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: idx * 0.1 }}
      onClick={handleCardClick}
    >
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-52 object-cover"
      />
      <div className="p-6 flex-1 flex flex-col justify-between">
        <h3 className="text-xl font-bold mb-2 text-slate-800">
          {book.title}
        </h3>
        <p className="text-sm mb-4" style={{ color: COLORS.textMuted }}>
          {truncateText(book.description, 100)}
        </p>
        <div className="flex justify-between items-center">
          <span
            className="font-semibold text-base"
            style={{ color: COLORS.accent }}
          >
            {book.price}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent triggering card click
              handleCardClick();   // navigate manually
            }}
            className="text-sm font-medium hover:underline"
            style={{ color: COLORS.accent }}
          >
            Read More →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
