import React, { useState, useEffect } from 'react';
import {
  FaFacebookF,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaBook,
  FaFlask,
  FaPaintBrush,
  FaGoogle,
  FaGraduationCap,
  FaMicrophone,
  FaYoutube as FaYoutubeIcon,
  FaEnvelopeOpenText
} from 'react-icons/fa';
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
        <h2 className="text-2xl sm:text-3xl font-semibold flex justify-center items-center gap-2">
          <FaEnvelopeOpenText /> Stay in touch with us
        </h2>
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
          <h3 className="text-lg font-bold mb-3 flex items-center justify-center gap-2">
            Research
          </h3>
          <ul className="text-slate-300 space-y-2">
            <li><Link to="/research"><FaFlask className="inline mr-2" /> Research Projects</Link></li>
            <li><Link to="/journals"><FaBook className="inline mr-2" /> SCI Publications</Link></li>
            <li><Link to="/conferences"><FaBook className="inline mr-2" /> Conferences</Link></li>
            <li><Link to="/students"><FaGraduationCap className="inline mr-2" /> PhD & Master Students</Link></li>
          </ul>
        </div>

        {/* Books (from Context) */}
        <div>
          <h3 className="text-lg font-bold mb-3 flex items-center justify-center gap-2">
            Books
          </h3>
          <ul className="text-slate-300 space-y-2">
            {books.slice(0, 4).map((book) => (
              <li
                key={book._id}
                className="hover:text-blue-400 cursor-pointer transition flex items-center justify-center gap-2"
                onClick={() => navigate(`/books/${book._id}`)}
              >
                <FaBook /> {book.title}
              </li>
            ))}
         
          </ul>
        </div>

        {/* Professional Profiles */}
        <div>
          <h3 className="text-lg font-bold mb-3 flex items-center justify-center gap-2">
            Professional Profiles
          </h3>
          <ul className="text-slate-300 space-y-2">
            <li><a href="https://scholar.google.com/citations?user=w5-YIk0AAAAJ&hl=en" target="_blank" rel="noopener noreferrer"><FaGoogle className="inline mr-2" /> Google Scholar</a></li>
            <li><a href=" https://www.linkedin.com/in/parteek-kumar-0237ab33/" target="_blank" rel="noopener noreferrer"><FaLinkedin className="inline mr-2" /> LinkedIn</a></li>
            <li><a href="https://www.facebook.com/parteek.bhatia.54/" target="_blank" rel="noopener noreferrer"><FaFacebookF className="inline mr-2" /> Facebook</a></li>
            <li><a href="https://github.com/bhatiaparteek" target="_blank" rel="noopener noreferrer"><FaGithub className="inline mr-2" /> GitHub</a></li>
          </ul>
        </div>

        {/* Creative Corner */}
        <div>
          <h3 className="text-lg font-bold mb-3 flex items-center justify-center gap-2">
             Creative Corner
          </h3>
          <ul className="text-slate-300 space-y-2">
            <li><Link to="/poems"><FaPaintBrush className="inline mr-2" /> My Poems & Songs</Link></li>
            <li><a href="https://www.youtube.com/@parteekbhatia?sub_confirmation=1" target="_blank" rel="noopener noreferrer"><FaYoutubeIcon className="inline mr-2" /> YouTube Channel</a></li>
            <li><Link to="/podcast"><FaMicrophone className="inline mr-2" /> Talks & Podcasts</Link></li>
          </ul>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-4 mt-4 text-xl text-slate-300">
        <a href="https://www.facebook.com/parteek.bhatia.54/" target="_blank"><FaFacebookF className="hover:text-blue-500 transition" /></a>
        <a href=" https://www.linkedin.com/in/parteek-kumar-0237ab33/" target="_blank"><FaLinkedin className="hover:text-sky-600 transition" /></a>
        <a href="https://github.com/bhatiaparteek" target="_blank"><FaGithub className="hover:text-gray-400 transition" /></a>
        <a href="https://www.youtube.com/@parteekbhatia" target="_blank"><FaYoutube className="hover:text-red-500 transition" /></a>
      </div>

      {/* Copyright */}
      <div className="text-center py-6 border-t border-slate-700 text-slate-400 text-sm mt-6">
        © {new Date().getFullYear()} Parteek Bhatia. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
