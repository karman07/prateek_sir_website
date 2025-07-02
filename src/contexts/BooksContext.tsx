import React, { createContext, useContext } from 'react';

export interface Book {
  title: string;
  description: string;
  price: string;
  image: string;
  link?: string;
}

const books: Book[] = [
  {
    title: 'The Future of Code',
    description:
      'A bold exploration of how emerging tech will reshape our world—perfect for forward-thinkers and innovators who want to stay ahead.',
    price: '₹399',
    image:
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80',

  },
  {
    title: 'Digital Philosophy',
    description:
      'A thought-provoking deep dive into the ethical, social, and technological implications of the digital age.',
    price: '₹499',
    image:
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80',
    link: '/books/digital-philosophy',
  },
  {
    title: 'Blueprints of Innovation',
    description:
      'From ideas to execution—this book gives you frameworks to build future-ready products in tech-driven industries.',
    price: '₹450',
    image:
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80',
    link: '/books/blueprints-of-innovation',
  },
];

const BooksContext = createContext<Book[]>(books);

export const useBooks = () => useContext(BooksContext);

export const BooksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <BooksContext.Provider value={books}>{children}</BooksContext.Provider>;
};
