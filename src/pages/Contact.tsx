import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../constants/colors';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Contact: React.FC = () => {
  return (
    <div className="bg-white py-20 px-6 md:px-24 mt-16">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-[#0B1F3A] text-center mb-14"
      >
        Contact Me
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-[#f8fafc] p-8 rounded-2xl shadow-xl space-y-6"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[${COLORS.accent}] bg-white"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[${COLORS.accent}] bg-white"
              placeholder="Your email"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[${COLORS.accent}] bg-white"
              placeholder="Your message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0B1F3A] hover:bg-[#4EA8DE] text-white font-medium py-3 rounded-xl transition"
          >
            Send Message
          </button>
        </motion.form>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-6 text-slate-700"
        >
          <p className="text-lg leading-relaxed">
            Feel free to reach out for collaborations, queries, or just to say hello! I'm always open to discussing
            new ideas or opportunities.
          </p>

          <div className={`bg-[${COLORS.lightBg}] p-5 rounded-xl shadow-sm flex items-center gap-4`}>
            <FiMail className="text-2xl text-[#0B1F3A]" />
            <div>
              <h4 className="text-[#0B1F3A] font-semibold mb-1">Email</h4>
              <p>your.email@example.com</p>
            </div>
          </div>

          <div className={`bg-[${COLORS.lightBg}] p-5 rounded-xl shadow-sm flex items-center gap-4`}>
            <FiPhone className="text-2xl text-[#0B1F3A]" />
            <div>
              <h4 className="text-[#0B1F3A] font-semibold mb-1">Phone</h4>
              <p>+91-12345-67890</p>
            </div>
          </div>

          <div className={`bg-[${COLORS.lightBg}] p-5 rounded-xl shadow-sm flex items-center gap-4`}>
            <FiMapPin className="text-2xl text-[#0B1F3A]" />
            <div>
              <h4 className="text-[#0B1F3A] font-semibold mb-1">Location</h4>
              <p>Punjab, India</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
