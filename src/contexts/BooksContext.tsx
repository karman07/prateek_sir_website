import React, { createContext, useContext } from 'react';

export interface Book {
  _id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  link: string;
  tableOfContents?: string[];
}

const books: Book[] = [
  {
    _id: '1',
    title: 'The Future of Code',
    description:
      'Written in lucid language, this valuable textbook brings together fundamental concepts of data mining, machine learning and data warehousing in a single volume. Topics are discussed in detail with their practical implementation using Weka and R language data mining tools.',
    price: '₹399',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=600&q=80',
    tableOfContents: [
      'Introduction',
      'Chapter 1: Data Mining Basics',
      'Chapter 2: Machine Learning Concepts',
      'Chapter 3: Data Warehousing Techniques',
      'Practical Labs with Weka & R',
      'Case Studies',
      'Conclusion',
      'Introduction',
      'Chapter 1: Data Mining Basics',
      'Chapter 2: Machine Learning Concepts',
      'Chapter 3: Data Warehousing Techniques',
      'Practical Labs with Weka & R',
      'Case Studies',
      'Conclusion',
    ],
    link: 'https://parteekbhatia.com/'
  },
  {
    _id: '2',
    title: 'Digital Philosophy',
    description:
      'A thought-provoking deep dive into the ethical, social, and technological implications of the digital age.',
    price: '₹499',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80',
  
    tableOfContents: [
      'Foreword',
      'Technology and Ethics',
      'Digital Identity',
      'Data Sovereignty',
      'Society 5.0',
      'Future of Digital Consciousness',
    ],
    link: 'https://parteekbhatia.com/'
  },
  {
    _id: '3',
    title: 'Blueprints of Innovation',
    description:
      'From ideas to execution—this book gives you frameworks to build future-ready products in tech-driven industries.',
    price: '₹450',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80',
    tableOfContents: [
      'Innovation Principles',
      'Frameworks for Product Building',
      'Agile Execution Models',
      'Scaling Innovation',
      'Case Studies in Tech',
    ],
    link: 'https://parteekbhatia.com/',
  },
  {
    _id: '4',
    title: 'Blueprints of Innovation',
    description:
      'From ideas to execution—this book gives you frameworks to build future-ready products in tech-driven industries.',
    price: '₹450',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=600&q=80',
    tableOfContents: [
      'Innovation Principles',
      'Frameworks for Product Building',
      'Agile Execution Models',
      'Scaling Innovation',
      'Case Studies in Tech',
    ],
    link: 'https://parteekbhatia.com/'
  },
];

const BooksContext = createContext<Book[]>(books);
export const useBooks = () => useContext(BooksContext);

export const BooksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <BooksContext.Provider value={books}>{children}</BooksContext.Provider>;
};
