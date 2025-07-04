import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COLORS } from '@/constants/colors';
import { useBooks } from '@/contexts/BooksContext';
import { useCourses } from '@/contexts/CourseContext';
import { useResearch } from '@/contexts/ResearchContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const books = useBooks();
  const courses = useCourses();
  const research = useResearch();

  const booksRef = useRef<HTMLUListElement>(null);
  const coursesRef = useRef<HTMLUListElement>(null);
  const researchRef = useRef<HTMLUListElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleDropdown = (label: string) =>
    setOpenDropdown((prev) => (prev === label ? null : label));

  // Close dropdown/menu on clicks outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        openDropdown &&
        ![booksRef, coursesRef, researchRef, mobileRef].some(
          (ref) => ref.current && ref.current.contains(target)
        )
      ) {
        setOpenDropdown(null);
      }
      if (isOpen && mobileRef.current && !mobileRef.current.contains(target)) {
        setIsOpen(false);
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown, isOpen]);

  const dropdownItem = (
    items: { _id: string; title: string; link?: string }[],
    showMorePath: string,
    type: 'books' | 'research' | 'courses'
  ) => (
    <>
      {items.slice(0, 5).map((item) =>
        type === 'courses' && item.link ? (
          <li key={item._id}>
            <a
              onClick={() => setOpenDropdown(null)}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-1 rounded hover:bg-slate-100 text-sm"
            >
              {item.title}
            </a>
          </li>
        ) : (
          <li key={item._id}>
            <Link
              onClick={() => setOpenDropdown(null)}
              to={`/${type}/${item._id}`}
              className="block px-3 py-1 rounded hover:bg-slate-100 text-sm"
            >
              {item.title}
            </Link>
          </li>
        )
      )}
      <li>
        <Link
          onClick={() => setOpenDropdown(null)}
          to={showMorePath}
          className="block px-3 py-1 rounded bg-slate-100 text-center text-sm text-blue-600 hover:bg-slate-200"
        >
          Show More
        </Link>
      </li>
    </>
  );

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 px-6 sm:px-10 py-4 backdrop-blur-md border-b border-white/10"
      style={{ backgroundColor: COLORS.overlay, color: COLORS.textPrimary }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide">Prateek Bhatia</h1>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 font-medium text-sm sm:text-base items-center">
          <li>
            <Link onClick={() => setOpenDropdown(null)} to="/" className="hover:text-blue-300 capitalize">Home</Link>
          </li>

          {/* Books Dropdown */}
          <li className="relative">
            <button
              onClick={() => toggleDropdown('Books')}
              className={`capitalize flex items-center gap-1 ${
                openDropdown === 'Books'
                  ? `text-[${COLORS.activeNav}] underline underline-offset-4`
                  : 'hover:text-blue-300'
              }`}
            >
              Books <ChevronDown size={16} />
            </button>
            <AnimatePresence>
              {openDropdown === 'Books' && (
                <motion.ul
                  ref={booksRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 bg-white text-slate-800 shadow-md rounded-lg w-48 p-2 space-y-2 z-50"
                >
                  {dropdownItem(books, '/books', 'books')}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          {/* Courses Dropdown */}
          <li className="relative">
            <button
              onClick={() => toggleDropdown('Courses')}
              className={`capitalize flex items-center gap-1 ${
                openDropdown === 'Courses'
                  ? `text-[${COLORS.activeNav}] underline underline-offset-4`
                  : 'hover:text-blue-300'
              }`}
            >
              Courses <ChevronDown size={16} />
            </button>
            <AnimatePresence>
              {openDropdown === 'Courses' && (
                <motion.ul
                  ref={coursesRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 bg-white text-slate-800 shadow-md rounded-lg w-60 p-2 space-y-2 z-50"
                >
                  {dropdownItem(courses, '/courses', 'courses')}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          {/* Research Dropdown */}
          <li className="relative">
            <button
              onClick={() => toggleDropdown('Research')}
              className={`capitalize flex items-center gap-1 ${
                openDropdown === 'Research'
                  ? `text-[${COLORS.activeNav}] underline underline-offset-4`
                  : 'hover:text-blue-300'
              }`}
            >
              Research Work <ChevronDown size={16} />
            </button>
            <AnimatePresence>
              {openDropdown === 'Research' && (
                <motion.ul
                  ref={researchRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 bg-white text-slate-800 shadow-md rounded-lg w-72 p-2 space-y-2 z-50"
                >
                  {dropdownItem(research, '/research', 'research')}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          <li>
            <Link onClick={() => setOpenDropdown(null)} to="/about" className="hover:text-blue-300 capitalize">About Me</Link>
          </li>
          <li>
            <Link onClick={() => setOpenDropdown(null)} to="/podcast" className="hover:text-blue-300 capitalize">Podcast</Link>
          </li>
          <li>
            <Link onClick={() => setOpenDropdown(null)} to="/contact" className="hover:text-blue-300 capitalize">Contact Me</Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={mobileRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 px-2 overflow-hidden"
          >
            <ul className="flex flex-col gap-4 bg-white/10 p-4 rounded-lg shadow-lg border border-white/10 text-white text-sm">
              <Link onClick={() => { setIsOpen(false); setOpenDropdown(null); }} to="/">Home</Link>

              {/* Mobile Books */}
              <div>
                <button onClick={() => toggleDropdown('Books')} className="flex justify-between w-full">
                  Books <ChevronDown size={16} />
                </button>
                <AnimatePresence>
                  {openDropdown === 'Books' && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 mt-1 space-y-1 text-white/90"
                    >
                      {books.slice(0, 5).map((book) => (
                        <li key={book._id}>
                          <Link onClick={() => { setIsOpen(false); setOpenDropdown(null); }} to={`/books/${book._id}`}>
                            {book.title}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link onClick={() => { setIsOpen(false); setOpenDropdown(null); }} to="/books" className="text-blue-300 underline">
                          Show More
                        </Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Courses */}
              <div>
                <button onClick={() => toggleDropdown('Courses')} className="flex justify-between w-full">
                  Courses <ChevronDown size={16} />
                </button>
                <AnimatePresence>
                  {openDropdown === 'Courses' && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 mt-1 space-y-1 text-white/90"
                    >
                      {courses.slice(0, 5).map((course) => (
                        <li key={course._id}>
                          <a
                            href={course.link}
                            onClick={() => { setIsOpen(false); setOpenDropdown(null); }}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {course.title}
                          </a>
                        </li>
                      ))}
                      <li>
                        <Link onClick={() => { setIsOpen(false); setOpenDropdown(null); }} to="/courses" className="text-blue-300 underline">
                          Show More
                        </Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Research */}
              <div>
                <button onClick={() => toggleDropdown('Research')} className="flex justify-between w-full">
                  Research Work <ChevronDown size={16} />
                </button>
                <AnimatePresence>
                  {openDropdown === 'Research' && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 mt-1 space-y-1 text-white/90"
                    >
                      {research.slice(0, 5).map((proj) => (
                        <li key={proj._id}>
                          <Link onClick={() => { setIsOpen(false); setOpenDropdown(null); }} to={`/research/${proj._id}`}>
                            {proj.title}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link onClick={() => { setIsOpen(false); setOpenDropdown(null); }} to="/research" className="text-blue-300 underline">
                          Show More
                        </Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              <Link onClick={() => { setIsOpen(false); setOpenDropdown(null); }} to="/about">About Me</Link>
              <Link onClick={() => { setIsOpen(false); setOpenDropdown(null); }} to="/podcast">Podcast</Link>
              <Link onClick={() => { setIsOpen(false); setOpenDropdown(null); }} to="/contact">Contact Me</Link>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
