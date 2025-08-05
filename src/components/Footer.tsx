import React, { useState, useEffect } from 'react';
import { FaInstagram, FaFacebookF, FaTwitter, FaWhatsapp, FaTelegramPlane, FaLinkedin, FaGithub, FaYoutube } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { COLORS } from '@/constants/colors';
import { BASE_URL } from '@/constants/base';
import { useBooks } from '@/contexts/BooksContext';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const books = useBooks();
  const navigate = useNavigate();

  useEffect(() => {
    const subscribed = localStorage.getItem('subscribed');
    if (subscribed === 'true') setIsSubscribed(true);
  }, []);

  const handleSubscribe = async () => {
    if (!email.trim()) return alert('Please enter a valid email');

    try {
      await fetch(`${BASE_URL}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      localStorage.setItem('subscribed', 'true');
      setIsSubscribed(true);
    } catch (error) {
      console.error('Subscription failed:', error);
      alert('Subscription failed. Try again later.');
    }
  };

  return (
    <footer
      style={{ backgroundColor: COLORS.primaryBg }}
      className="text-white pt-16 px-6 md:px-12"
    >
      {/* Newsletter */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold">Stay in touch with us</h2>
        <p className="mt-2 text-slate-300">
          Receive the latest updates about our work, research & events
        </p>
        <div className="mt-6 flex justify-center gap-2 flex-col sm:flex-row items-center">
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-72 px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-slate-800"
          />
          <button
            onClick={handleSubscribe}
            disabled={isSubscribed}
            className={`mt-2 sm:mt-0 px-6 py-2 rounded-md text-white font-medium transition ${COLORS.gradientAccent}`}
          >
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </button>
        </div>
      </div>

      <hr className="border-slate-600" />

      <div className="max-w-7xl mx-auto py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 text-sm text-center">
        {/* Research */}
        <div>
          <h3 className="text-lg font-bold mb-3">Research</h3>
          <ul className="text-slate-300 space-y-2">
            <li><Link to="/research">Research Projects</Link></li>
            <li><Link to="/journals">SCI Publications</Link></li>
            <li><Link to="/chapterlist">Conferences & Book Chapters</Link></li>
            <li><Link to="/students">PhD & Master Students</Link></li>
          </ul>
        </div>

        {/* Books (from Context) */}
        <div>
          <h3 className="text-lg font-bold mb-3">Books</h3>
          <ul className="text-slate-300 space-y-2">
            {books.slice(0, 4).map((book) => (
              <li
                key={book._id}
                className="hover:text-blue-400 cursor-pointer transition"
                onClick={() => navigate(`/books/${book._id}`)}
              >
                {book.title}
              </li>
            ))}
            <li><Link to="/resources">Instructor & Student Resources</Link></li>
          </ul>
        </div>

        {/* Professional Profiles */}
        <div>
          <h3 className="text-lg font-bold mb-3">Professional Profiles</h3>
          <ul className="text-slate-300 space-y-2">
            <li><a href="https://scholar.google.com/citations?user=bK76Z3YAAAAJ" target="_blank" rel="noopener noreferrer">Google Scholar</a></li>
            <li><a href="https://www.linkedin.com/in/parteekbhatia" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href="https://facebook.com/parteek.bhatia" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://github.com/parteekbhatia" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </div>

        {/* Creative Corner */}
        <div>
          <h3 className="text-lg font-bold mb-3">Creative Corner</h3>
          <ul className="text-slate-300 space-y-2">
            <li><Link to="/poems">My Poems & Songs</Link></li>
            <li><a href="#" target="_blank">My Poem Book</a></li>
            <li><a href="https://www.youtube.com/@ParteekBhatia" target="_blank" rel="noopener noreferrer">YouTube Channel</a></li>
            <li><Link to="/podcast">Talks & Podcasts</Link></li>
          </ul>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-4 mt-4 text-xl text-slate-300">
        <a href="https://instagram.com" target="_blank"><FaInstagram className="hover:text-pink-500 transition" /></a>
        <a href="https://facebook.com" target="_blank"><FaFacebookF className="hover:text-blue-500 transition" /></a>
        <a href="https://twitter.com" target="_blank"><FaTwitter className="hover:text-sky-400 transition" /></a>
        <a href="https://telegram.org" target="_blank"><FaTelegramPlane className="hover:text-blue-400 transition" /></a>
        <a href="https://wa.me" target="_blank"><FaWhatsapp className="hover:text-green-400 transition" /></a>
        <a href="https://linkedin.com" target="_blank"><FaLinkedin className="hover:text-sky-600 transition" /></a>
        <a href="https://github.com" target="_blank"><FaGithub className="hover:text-gray-400 transition" /></a>
        <a href="https://youtube.com" target="_blank"><FaYoutube className="hover:text-red-500 transition" /></a>
      </div>

      {/* Copyright */}
      <div className="text-center py-6 border-t border-slate-700 text-slate-400 text-sm mt-6">
        © {new Date().getFullYear()} Parteek Bhatia. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
