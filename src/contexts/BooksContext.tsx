import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/constants/base';

export interface Book {
  _id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  link: string;
  tableOfContents?: string[];
  priority?: number; 
}

const BooksContext = createContext<Book[]>([]);

export const useBooks = () => useContext(BooksContext);

export const BooksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get<Book[]>(`${BASE_URL}/books`);

        // Sort by priority first (high → low), then by created date (if available)
        const sortedBooks = [...res.data].sort((a, b) => {
          const priorityA = a.priority ?? 0;
          const priorityB = b.priority ?? 0;

          if (priorityA !== priorityB) {
            return priorityB - priorityA; // higher priority first
          }
          return 0; // keep same order if priority equal
        });

        setBooks(sortedBooks);
      } catch (error) {
        console.error('Failed to fetch books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-500">Loading books...</p>
        </div>
      </div>
    );
  }

  return <BooksContext.Provider value={books}>{children}</BooksContext.Provider>;
};
