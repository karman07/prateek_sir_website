// Same imports
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

  const booksRef = useRef<HTMLUListElement>(null);
  const coursesRef = useRef<HTMLUListElement>(null);
  const researchRef = useRef<HTMLUListElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const moreDropdownRef = useRef<HTMLUListElement>(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleDropdown = (label: string) =>
    setOpenDropdown((prev) => (prev === label ? null : label));

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        openDropdown &&
        ![booksRef, coursesRef, researchRef, moreDropdownRef, mobileRef].some(
          (ref) => ref.current && ref.current.contains(target)
        )
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
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50 px-6 sm:px-10 py-4 backdrop-blur-md border-b border-white/10"
        style={{ backgroundColor: COLORS.overlay, color: COLORS.textPrimary }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide">Parteek Bhatia</h1>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-8 font-medium text-sm sm:text-base items-center">
            <li><Link onClick={() => setOpenDropdown(null)} to="/" className="hover:text-blue-300 capitalize">Home</Link></li>
            {['Books', 'Courses', 'Research'].map((label) => (
              <li key={label} className="relative">
                <button
                  onClick={() => toggleDropdown(label)}
                  className={`capitalize flex items-center gap-1 ${
                    openDropdown === label
                      ? `text-[${COLORS.activeNav}] underline underline-offset-4`
                      : 'hover:text-blue-300'
                  }`}
                >
                  {label} <ChevronDown size={16} />
                </button>
                <AnimatePresence>
                  {openDropdown === label && (
                    <motion.ul
                      ref={label === 'Books' ? booksRef : label === 'Courses' ? coursesRef : researchRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 bg-white text-slate-800 shadow-md rounded-lg w-60 p-2 space-y-2 z-50"
                    >
                      {dropdownItem(
                        label === 'Books' ? books : label === 'Courses' ? courses : research,
                        `/${label.toLowerCase()}`,
                        label.toLowerCase() as 'books' | 'courses' | 'research'
                      )}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}

            {/* More Dropdown */}
            <li className="relative">
              <button
                onClick={() => toggleDropdown('More')}
                className={`capitalize flex items-center gap-1 ${
                  openDropdown === 'More'
                    ? `text-[${COLORS.activeNav}] underline underline-offset-4`
                    : 'hover:text-blue-300'
                }`}
              >
                More <ChevronDown size={16} />
              </button>
<AnimatePresence>
  {openDropdown === 'More' && (
    <motion.ul
      ref={moreDropdownRef}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="absolute top-full left-0 mt-2 w-72 bg-white text-slate-800 shadow-2xl rounded-xl p-3 z-50 space-y-2"
      role="menu"
      aria-label="More options"
    >
      {/* Mine Section */}
      <li className="text-xs font-bold text-slate-500 uppercase px-2 pt-1 tracking-widest">
        Mine
      </li>
      {[
        { name: 'About Me', to: '/about' },
        { name: 'Students', to: '/students' },
        { name: 'Contact Me', to: '/contact' },
      ].map((item) => (
        <li key={item.to}>
          <Link
            to={item.to}
            onClick={() => setOpenDropdown(null)}
            className="block px-3 py-2 text-sm rounded-lg hover:bg-slate-100 focus:bg-slate-100 focus:outline-none transition-colors"
            role="menuitem"
          >
            {item.name}
          </Link>
        </li>
      ))}

      {/* Achievements Section */}
      <li className="text-xs font-bold text-slate-500 uppercase px-2 pt-3 tracking-widest">
        Achievements
      </li>
      {[
        { name: 'Administrative Roles', to: '/administrative' },
        { name: 'Journals', to: '/journals' },
        { name: 'Nvidia Workshops', to: '/workshops' },
      ].map((item) => (
        <li key={item.to}>
          <Link
            to={item.to}
            onClick={() => setOpenDropdown(null)}
            className="block px-3 py-2 text-sm rounded-lg hover:bg-slate-100 focus:bg-slate-100 focus:outline-none transition-colors"
            role="menuitem"
          >
            {item.name}
          </Link>
        </li>
      ))}

      {/* Hobby Section */}
      <li className="text-xs font-bold text-slate-500 uppercase px-2 pt-3 tracking-widest">
        Hobby
      </li>
      {[
        { name: 'Poems and Songs', to: '/poems' },
        { name: 'Invited Talks & Podcasts', to: '/podcast' },
      ].map((item) => (
        <li key={item.to}>
          <Link
            to={item.to}
            onClick={() => setOpenDropdown(null)}
            className="block px-3 py-2 text-sm rounded-lg hover:bg-slate-100 focus:bg-slate-100 focus:outline-none transition-colors"
            role="menuitem"
          >
            {item.name}
          </Link>
        </li>
      ))}
    </motion.ul>
  )}
</AnimatePresence>


            </li>

            {isLoggedIn ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfileDropdown((prev) => !prev)}
                  className="flex items-center gap-2 hover:text-blue-300"
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
                      className="absolute top-10 right-0 bg-white text-slate-800 shadow-lg rounded-lg w-64 p-4 z-50 text-sm"
                    >
                      <div className="border-b pb-2 mb-2">
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-2 py-1.5 text-sm text-red-600 hover:bg-slate-100 rounded"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                className={` ${COLORS.gradientAccent} inline-block text-white px-6 py-2 rounded-lg text-sm font-medium transition`}
                onClick={() => setShowLoginModal(true)}
              >
                Login / Sign Up
              </button>
            )}
          </ul>

          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>


      </nav>

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
