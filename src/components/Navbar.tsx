import React, { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { COLORS } from "@/constants/colors";
import { useBooks } from "@/contexts/BooksContext";
import { useCourses } from "@/contexts/CourseContext";
import { useResearch } from "@/contexts/ResearchContext";
import { motion, AnimatePresence } from "framer-motion";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseApp } from "@/firebase/firebase";
import LoginModal from "./auth/LoginModal";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

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

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown, isOpen]);

  const handleLogout = () => {
    const auth = getAuth(firebaseApp);
    signOut(auth);
    setUser(null);
  };

  const dropdownItem = (
    items: { _id: string; title: string; link?: string }[],
    showMorePath: string,
    type: "books" | "research" | "courses"
  ) => (
    <>
      {items.slice(0, 5).map((item) =>
        type === "courses" && item.link ? (
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
    <nav className="fixed top-0 left-0 w-full z-50 px-6 sm:px-10 py-4 bg-[#0B1F3A] text-white shadow-md border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-wide">Prateek Bhatia</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-10 font-medium text-base items-center ml-10 text-white/90">
          <li><Link to="/" className="hover:text-white">Home</Link></li>

          {["Books", "Courses", "Research"].map((label) => (
            <li className="relative" key={label}>
              <button
                onClick={() => toggleDropdown(label)}
                className="flex items-center gap-1 hover:text-white"
              >
                {label} <ChevronDown size={16} />
              </button>
              <AnimatePresence>
                {openDropdown === label && (
                  <motion.ul
                    ref={
                      label === "Books"
                        ? booksRef
                        : label === "Courses"
                        ? coursesRef
                        : researchRef
                    }
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`absolute top-full left-0 mt-2 bg-white text-slate-800 shadow-md rounded-lg w-${
                      label === "Books" ? "48" : label === "Courses" ? "60" : "72"
                    } p-2 space-y-2 z-50`}
                  >
                    {dropdownItem(
                      label === "Books"
                        ? books
                        : label === "Courses"
                        ? courses
                        : research,
                      `/${label.toLowerCase()}`,
                      label.toLowerCase() as any
                    )}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          ))}

          <li><Link to="/about" className="hover:text-white">About Me</Link></li>
          <li><Link to="/podcast" className="hover:text-white">Podcast</Link></li>
          <li><Link to="/contact" className="hover:text-white">Contact Me</Link></li>

          <li>
            {user ? (
              <div className="relative group">
                <img
                  src={user.photoURL || "/avatar.png"}
                  alt="profile"
                  className="w-9 h-9 rounded-full cursor-pointer"
                />
                <div className="absolute top-12 right-0 w-56 p-3 bg-white border rounded-lg shadow-md hidden group-hover:block z-50 text-sm text-slate-800">
                  <p className="font-semibold">{user.displayName || user.email}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="mt-2 text-red-500 hover:underline"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow hover:from-blue-600 hover:to-indigo-700 text-sm"
              >
                Login / Signup
              </button>
            )}
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={mobileRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-xs bg-white z-40 shadow-lg p-6 text-slate-800 md:hidden"
          >
            <button onClick={toggleMenu} className="mb-6">
              <X size={28} />
            </button>
            <ul className="space-y-4 text-base font-medium">
              <li><Link to="/" onClick={toggleMenu}>Home</Link></li>

              {["Books", "Courses", "Research"].map((label) => (
                <li key={label}>
                  <button
                    onClick={() => toggleDropdown(label)}
                    className="flex items-center justify-between w-full"
                  >
                    {label} <ChevronDown size={16} />
                  </button>
                  {openDropdown === label && (
                    <ul className="pl-4 space-y-1">
                      {dropdownItem(
                        label === "Books"
                          ? books
                          : label === "Courses"
                          ? courses
                          : research,
                        `/${label.toLowerCase()}`,
                        label.toLowerCase() as any
                      )}
                    </ul>
                  )}
                </li>
              ))}

              <li><Link to="/about" onClick={toggleMenu}>About Me</Link></li>
              <li><Link to="/podcast" onClick={toggleMenu}>Podcast</Link></li>
              <li><Link to="/contact" onClick={toggleMenu}>Contact Me</Link></li>

              <li>
                {user ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <img
                        src={user.photoURL || "/avatar.png"}
                        alt="profile"
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-sm">{user.displayName || user.email}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setShowLoginModal(true);
                      toggleMenu();
                    }}
                    className="mt-2 w-full py-2 px-4 bg-blue-600 text-white rounded-md text-sm font-semibold"
                  >
                    Login / Signup
                  </button>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </nav>
  );
};

export default Navbar;
