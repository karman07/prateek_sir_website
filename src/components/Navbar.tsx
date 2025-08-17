import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COLORS } from '@/constants/colors';
import { useBooks } from '@/contexts/BooksContext';
import { useCourses } from '@/contexts/CourseContext';
import { useResearch } from '@/contexts/ResearchContext';
import { motion, AnimatePresence } from 'framer-motion';
import LoginModal from './auth/LoginModal';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const books = useBooks();
  const courses = useCourses();
  const research = useResearch();

  // Refs for dropdown elements
  const booksRef = useRef<HTMLUListElement>(null);
  const coursesRef = useRef<HTMLUListElement>(null);
  const researchRef = useRef<HTMLUListElement>(null);
  const academicRef = useRef<HTMLUListElement>(null);
  const publicationsRef = useRef<HTMLUListElement>(null);
  const personalRef = useRef<HTMLUListElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleDropdown = (label: string) =>
    setOpenDropdown((prev) => (prev === label ? null : label));

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      const refs = [booksRef, coursesRef, researchRef, academicRef, publicationsRef, personalRef, mobileRef];
      
      if (
        openDropdown &&
        !refs.some((ref) => ref.current && ref.current.contains(target))
      ) {
        setOpenDropdown(null);
      }
      
      if (
        showProfileDropdown &&
        profileRef.current &&
        !profileRef.current.contains(target)
      ) {
        setShowProfileDropdown(false);
      }
      
      if (isOpen && mobileRef.current && !mobileRef.current.contains(target)) {
        setIsOpen(false);
        setOpenDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown, isOpen, showProfileDropdown]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setShowProfileDropdown(false);
  };

  const user = isLoggedIn
    ? JSON.parse(localStorage.getItem('user') || '{}')
    : { name: 'Guest', email: 'guest@example.com' };

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
              className="block px-3 py-2 rounded-lg hover:bg-slate-100 text-sm transition-colors"
            >
              {item.title}
            </a>
          </li>
        ) : (
          <li key={item._id}>
            <Link
              onClick={() => setOpenDropdown(null)}
              to={`/${type}/${item._id}`}
              className="block px-3 py-2 rounded-lg hover:bg-slate-100 text-sm transition-colors"
            >
              {item.title}
            </Link>
          </li>
        )
      )}
      <li className="pt-2 border-t border-slate-200">
        <Link
          onClick={() => setOpenDropdown(null)}
          to={showMorePath}
          className="block px-3 py-2 rounded-lg bg-blue-50 text-center text-sm text-blue-600 hover:bg-blue-100 font-medium transition-colors"
        >
          View All {type.charAt(0).toUpperCase() + type.slice(1)}
        </Link>
      </li>
    </>
  );

  const StaticDropdown: React.FC<{
    items: { name: string; to: string; description?: string }[];
    refProp: React.RefObject<HTMLUListElement>;
    className?: string;
  }> = ({ items, refProp, className = "" }) => (
    <motion.ul
      ref={refProp}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`absolute top-full left-0 mt-2 bg-white text-slate-800 shadow-xl rounded-xl p-3 z-50 space-y-1 ${className}`}
      role="menu"
    >
      {items.map((item) => (
        <li key={item.to}>
          <Link
            to={item.to}
            onClick={() => setOpenDropdown(null)}
            className="block px-3 py-2 text-sm rounded-lg hover:bg-slate-100 focus:bg-slate-100 focus:outline-none transition-colors group"
            role="menuitem"
          >
            <div className="font-medium text-slate-900">{item.name}</div>
            {item.description && (
              <div className="text-xs text-slate-500 mt-0.5">{item.description}</div>
            )}
          </Link>
        </li>
      ))}
    </motion.ul>
  );

  // Mobile menu component
  const MobileMenu = () => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={mobileRef}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xl"
        >
          <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
            <Link
              to="/"
              onClick={() => {setIsOpen(false); setOpenDropdown(null);}}
              className="block px-4 py-3 text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Home
            </Link>
            
            {/* Mobile Books */}
            <div>
              <button
                onClick={() => toggleDropdown('Books')}
                className="w-full flex items-center justify-between px-4 py-3 text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Books <ChevronDown size={16} />
              </button>
              {openDropdown === 'Books' && (
                <div className="ml-4 mt-2 space-y-1">
                  {books.slice(0, 3).map((book) => (
                    <Link
                      key={book._id}
                      to={`/books/${book._id}`}
                      onClick={() => {setIsOpen(false); setOpenDropdown(null);}}
                      className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded"
                    >
                      {book.title}
                    </Link>
                  ))}
                  <Link
                    to="/books"
                    onClick={() => {setIsOpen(false); setOpenDropdown(null);}}
                    className="block px-3 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded"
                  >
                    View All Books
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Courses */}
            <div>
              <button
                onClick={() => toggleDropdown('Courses')}
                className="w-full flex items-center justify-between px-4 py-3 text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Courses <ChevronDown size={16} />
              </button>
              {openDropdown === 'Courses' && (
                <div className="ml-4 mt-2 space-y-1">
                  {courses.slice(0, 3).map((course) => (
                    <Link
                      key={course._id}
                      to={course.link || `/courses/${course._id}`}
                      onClick={() => {setIsOpen(false); setOpenDropdown(null);}}
                      className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded"
                    >
                      {course.title}
                    </Link>
                  ))}
                  <Link
                    to="/courses"
                    onClick={() => {setIsOpen(false); setOpenDropdown(null);}}
                    className="block px-3 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded"
                  >
                    View All Courses
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Research */}
            <div>
              <button
                onClick={() => toggleDropdown('Research')}
                className="w-full flex items-center justify-between px-4 py-3 text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Research Projects <ChevronDown size={16} />
              </button>
              {openDropdown === 'Research' && (
                <div className="ml-4 mt-2 space-y-1">
                  {research.slice(0, 3).map((item) => (
                    <Link
                      key={item._id}
                      to={`/research/${item._id}`}
                      onClick={() => {setIsOpen(false); setOpenDropdown(null);}}
                      className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded"
                    >
                      {item.title}
                    </Link>
                  ))}
                  <Link
                    to="/research"
                    onClick={() => {setIsOpen(false); setOpenDropdown(null);}}
                    className="block px-3 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded"
                  >
                    View All Research
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile other links */}
            {[
              { name: 'About Me', to: '/about' },
              { name: 'Students', to: '/students' },
              { name: 'Contact', to: '/contact' },
              { name: 'Publications', to: '/publications' },
              { name: 'Conferences', to: '/conferences' },
              { name: 'Articles', to: '/articles' },
              { name: 'Journals', to: '/journals' },
              { name: 'Administrative Roles', to: '/administrative' },
              { name: 'Workshops', to: '/workshops' },
              { name: 'Poems & Songs', to: '/poems' },
              { name: 'Podcasts & Talks', to: '/podcast' },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => {setIsOpen(false); setOpenDropdown(null);}}
                className="block px-4 py-3 text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Auth */}
            {isLoggedIn ? (
              <div className="pt-2 border-t border-slate-200">
                <div className="px-4 py-2 text-sm text-slate-600">
                  {user.name} ({user.email})
                </div>
                <button
                  onClick={() => {handleLogout(); setIsOpen(false);}}
                  className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {setShowLoginModal(true); setIsOpen(false);}}
                className={`w-full ${COLORS.gradientAccent} text-white px-4 py-3 rounded-lg font-medium transition-all`}
              >
                Login / Sign Up
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 px-6 sm:px-10 py-4 backdrop-blur-md border-b border-white/10"
        style={{ backgroundColor: COLORS.overlay, color: COLORS.textPrimary }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          <Link to="/" className="text-xl sm:text-2xl font-bold tracking-wide hover:text-blue-300 transition-colors">
            Parteek Bhatia
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-6 font-medium text-sm items-center">
            <li>
              <Link 
                to="/" 
                className="hover:text-blue-300 transition-colors py-2"
                onClick={() => setOpenDropdown(null)}
              >
                Home
              </Link>
            </li>

            {/* Books Dropdown */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown('Books')}
                className={`flex items-center gap-1 py-2 transition-colors ${
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
                    className="absolute top-full left-0 mt-2 bg-white text-slate-800 shadow-xl rounded-xl w-72 p-3 space-y-1 z-50"
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
                className={`flex items-center gap-1 py-2 transition-colors ${
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
                    className="absolute top-full left-0 mt-2 bg-white text-slate-800 shadow-xl rounded-xl w-72 p-3 space-y-1 z-50"
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
                className={`flex items-center gap-1 py-2 transition-colors ${
                  openDropdown === 'Research'
                    ? `text-[${COLORS.activeNav}] underline underline-offset-4`
                    : 'hover:text-blue-300'
                }`}
              >
                Research Projects <ChevronDown size={16} />
              </button>
              <AnimatePresence>
                {openDropdown === 'Research' && (
                  <motion.ul
                    ref={researchRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 bg-white text-slate-800 shadow-xl rounded-xl w-72 p-3 space-y-1 z-50"
                  >
                    {dropdownItem(research, '/research', 'research')}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>

            {/* Academic Dropdown */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown('Academic')}
                className={`flex items-center gap-1 py-2 transition-colors ${
                  openDropdown === 'Academic'
                    ? `text-[${COLORS.activeNav}] underline underline-offset-4`
                    : 'hover:text-blue-300'
                }`}
              >
                Academic <ChevronDown size={16} />
              </button>
              <AnimatePresence>
                {openDropdown === 'Academic' && (
                  <StaticDropdown
                    items={[
                      { name: 'Students', to: '/students', description: 'My mentees and research scholars' },
                      { name: 'Administrative Roles', to: '/administrative', description: 'Leadership positions held' },
                      { name: 'Workshops / Seminars', to: '/workshops', description: 'Training and workshops conducted' }
                    ]}
                    refProp={academicRef}
                    className="w-80"
                  />
                )}
              </AnimatePresence>
            </li>

            {/* Publications Dropdown */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown('Publications')}
                className={`flex items-center gap-1 py-2 transition-colors ${
                  openDropdown === 'Publications'
                    ? `text-[${COLORS.activeNav}] underline underline-offset-4`
                    : 'hover:text-blue-300'
                }`}
              >
                Research Publications <ChevronDown size={16} />
              </button>
              <AnimatePresence>
                {openDropdown === 'Publications' && (
                  <StaticDropdown
                    items={[
                      { name: 'SCI Journal', to: '/journals', description: 'Peer-reviewed journal publications' },
                      { name: 'Other Publications', to: '/publications', description: 'Research publications and papers' },
                      { name: 'Conferences', to: '/conferences', description: 'Conference presentations' },
                      { name: 'Articles', to: '/articles', description: 'Articles and opinion pieces' },
                    ]}
                    refProp={publicationsRef}
                    className="w-80"
                  />
                )}
              </AnimatePresence>
            </li>

            {/* Personal Dropdown */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown('Personal')}
                className={`flex items-center gap-1 py-2 transition-colors ${
                  openDropdown === 'Personal'
                    ? `text-[${COLORS.activeNav}] underline underline-offset-4`
                    : 'hover:text-blue-300'
                }`}
              >
                More <ChevronDown size={16} />
              </button>
              <AnimatePresence>
                {openDropdown === 'Personal' && (
                  <StaticDropdown
                    items={[
                      { name: 'About Me', to: '/about', description: 'My background and journey' },
                      { name: 'Poems & Songs', to: '/poems', description: 'Creative writing and compositions' },
                      { name: 'Podcasts & Talks', to: '/podcast', description: 'Invited talks and podcast appearances' },
                      { name: 'Contact Me', to: '/contact', description: 'Get in touch' },
                    ]}
                    refProp={personalRef}
                    className="w-80"
                  />
                )}
              </AnimatePresence>
            </li>

            {/* User Profile/Auth */}
            {isLoggedIn ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfileDropdown((prev) => !prev)}
                  className="flex items-center gap-2 hover:text-blue-300 py-2 transition-colors"
                >
                  <User size={20} />
                  <ChevronDown size={14} />
                </button>
                <AnimatePresence>
                  {showProfileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute top-10 right-0 bg-white text-slate-800 shadow-xl rounded-xl w-64 p-4 z-50 text-sm"
                    >
                      <div className="border-b border-slate-200 pb-3 mb-3">
                        <div className="font-semibold text-slate-900">{user.name}</div>
                        <div className="text-xs text-slate-500 mt-1">{user.email}</div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                className={`${COLORS.gradientAccent} text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all hover:shadow-lg transform hover:scale-105`}
                onClick={() => setShowLoginModal(true)}
              >
                Login / Sign Up
              </button>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              aria-label="Toggle menu"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu />
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          onClose={() => {
            setShowLoginModal(false);
            setIsLoggedIn(!!localStorage.getItem('token'));
          }}
        />
      )}
    </>
  );
};

export default Navbar;