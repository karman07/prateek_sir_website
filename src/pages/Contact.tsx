import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../constants/colors';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import { BASE_URL } from '@/constants/base';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('subject', formData.subject);
    data.append('message', formData.message);

    try {
      const res = await fetch(`${BASE_URL}/contact`, {
        method: 'POST',
        body: data,
      });

      if (!res.ok) throw new Error('Failed to send message');

      alert('✅ Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      alert('❌ Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-[#f8fafc] p-8 rounded-2xl shadow-xl space-y-6"
        >
          {['name', 'email', 'subject'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-slate-700 mb-1 capitalize">
                {field}
              </label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                id={field}
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                className={`w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[${COLORS.accent}] bg-white`}
                placeholder={`Your ${field}`}
                required
              />
            </div>
          ))}

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className={`w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[${COLORS.accent}] bg-white`}
              placeholder="Your message"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#0B1F3A] hover:bg-[#4EA8DE] text-white font-medium py-3 rounded-xl transition"
          >
            {submitting ? 'Sending...' : 'Send Message'}
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
