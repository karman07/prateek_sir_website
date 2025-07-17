import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaTelegramPlane,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { COLORS } from '@/constants/colors';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const subscribed = localStorage.getItem('subscribed');
    if (subscribed === 'true') setIsSubscribed(true);
  }, []);

  const handleSubscribe = async () => {
    if (!email.trim()) return alert('Please enter a valid email');

    try {
      await axios.post('http://localhost:3000/subscribe', { email }); // adjust URL if needed
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
      {/* Newsletter Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          Stay in touch with us
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
        <div>
          <h3 className="text-lg font-bold mb-3 text-white">Parteek Bhatia</h3>
          <p className="text-slate-300">
            Passionate technologist, educator, and researcher creating meaningful digital experiences for a better future.
          </p>
          <div className="flex justify-center gap-4 mt-4 text-xl text-slate-300">
            <a href="#"><FaInstagram className="hover:text-pink-500 transition" /></a>
            <a href="#"><FaFacebookF className="hover:text-blue-500 transition" /></a>
            <a href="#"><FaTwitter className="hover:text-sky-400 transition" /></a>
            <a href="#"><FaTelegramPlane className="hover:text-blue-400 transition" /></a>
            <a href="#"><FaWhatsapp className="hover:text-green-400 transition" /></a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 text-white">My Work</h3>
          <ul className="text-slate-300 space-y-2">
            <li><Link to="/books">Books</Link></li>
            <li><Link to="/podcast">Podcast</Link></li>
            <li><Link to="/journals">Journals</Link></li>
            <li><Link to="/workshops">Workshops</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 text-white">My Achievements</h3>
          <ul className="text-slate-300 space-y-2">
            <li><Link to="/about">About Me</Link></li>
            <li><Link to="/contact">Contact Me</Link></li>
            <li><Link to="/podcast">Podcast</Link></li>
            <li><Link to="/chapterlist">Content</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-3 text-white">Tools & Links</h3>
          <ul className="text-slate-300 space-y-2">
            <li>GitHub</li>
            <li>Google Scholar</li>
            <li>ResearchGate</li>
            <li>LinkedIn</li>
            <li>ORCID</li>
          </ul>
        </div>
      </div>

      <div className="text-center py-6 border-t border-slate-700 text-slate-400 text-sm">
        © {new Date().getFullYear()} Parteek Bhatia. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
