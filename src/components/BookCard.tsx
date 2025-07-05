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
  className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white flex flex-col cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: idx * 0.1 }}
  onClick={handleCardClick}
>
  <div className="w-full aspect-[3/2] relative bg-white">
    <img
      src={book.image}
      alt={book.title}
      className="absolute inset-0 w-full h-full object-contain bg-white"
    />
  </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">
          {book.title}
        </h3>
        <p className="text-sm text-slate-600 mb-4">
          {truncateText(book.description, 100)}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-base font-semibold" style={{ color: COLORS.accent }}>
            {book.price}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="text-sm font-medium transition-colors"
            style={{color : COLORS.accent}}
          >
            Read More →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
