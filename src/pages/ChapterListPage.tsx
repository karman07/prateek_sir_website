import React, { useState, useEffect } from 'react';
import { useChapters } from '../contexts/ChapterContext';
import { useLocation } from 'react-router-dom';

interface ChapterListPageProps {
  
}

const ChapterListPage: React.FC<ChapterListPageProps> = () => {
  const { chapters } = useChapters();
  const [search, setSearch] = useState('');
  const [book, setBook] = useState('All');
  const [type, setType] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const bookName = params.get('bookName') || undefined;
  console.log(bookName)
  const staticChapters = [
    {
      chapter: 'Intro to AI',
      book: 'ML Basics',
      type: 'PDF',
      fileUrl: '#',
    },
    {
      chapter: 'Deep Learning 101',
      book: 'Neural Nets',
      type: 'PPT',
      fileUrl: '#',
    },
  ];

  const chapterData = chapters.length ? chapters : staticChapters;

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);

    // If a book name is passed as prop, set it
    if (bookName) {
      console.log(bookName)
      setBook(bookName);
    }
  }, [bookName]);

  const books = ['All', ...new Set(chapterData.map(c => c.book))];
  const types = ['All', ...new Set(chapterData.map(c => c.type))];

  const filtered = chapterData.filter(ch =>
    (book === 'All' || ch.book === book) &&
    (type === 'All' || ch.type === type) &&
    ch.chapter.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 bg-white">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg p-6 mt-16">
        {!isLoggedIn && (
          <div className="mb-6 text-center text-red-600 font-semibold text-lg">
            🔒 Please login or sign up from the navbar above to access and download chapters!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <input
            type="text"
            placeholder="Search chapter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            disabled={!isLoggedIn}
          />
          <select
            value={book}
            onChange={(e) => setBook(e.target.value)}
            className="border px-4 py-2 rounded-md"
            disabled={!isLoggedIn}
          >
            {books.map((b, idx) => <option key={idx} value={b}>{b}</option>)}
          </select>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border px-4 py-2 rounded-md"
            disabled={!isLoggedIn}
          >
            {types.map((t, idx) => <option key={idx} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoggedIn ? (
            filtered.length ? (
              filtered.map((ch, idx) => (
                <div key={idx} className="bg-white border rounded-lg p-5 shadow hover:shadow-xl transition">
                  <h2 className="text-xl font-semibold mb-2">{ch.chapter}</h2>
                  <p><strong>Book:</strong> {ch.book}</p>
                  <p><strong>Type:</strong> {ch.type}</p>
                  <a
                    href={ch.fileUrl}
                    download
                    className="block w-full mt-4 text-center py-2 rounded bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium"
                  >
                    Download
                  </a>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-slate-500">📚 No chapters found.</p>
            )
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Login to view chapters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterListPage;
