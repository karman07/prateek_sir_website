import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';
import { BASE_URL } from '@/constants/base';
import { motion } from 'framer-motion';

interface Props {
  onClose: () => void;
}

const LoginModal: React.FC<Props> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const toggleMode = () => {
    setForm({ name: '', email: '', password: '' });
    setIsLogin(!isLogin);
    setMessage('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');
    try {
      if (!isLogin) {
        const registerRes = await axios.post(`${BASE_URL}/auth/register`, {
          ...form,
          role: 'user',
        });

        if (registerRes.data) {
          const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
            email: form.email,
            password: form.password,
          });

          localStorage.setItem('token', loginRes.data.accessToken);
          localStorage.setItem('user', JSON.stringify(loginRes.data.user));
          onClose();
          window.location.reload(); // reload after modal closes
          return;
        }
      } else {
        const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
          email: form.email,
          password: form.password,
        });

        localStorage.setItem('token', loginRes.data.accessToken);
        localStorage.setItem('user', JSON.stringify(loginRes.data.user));
        onClose();
        window.location.reload(); // reload after modal closes
        return;
      }
    } catch (err: any) {
      setMessage(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl shadow-2xl w-[90%] max-w-xl p-10 relative"
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">
          {isLogin ? 'Login to your account' : 'Create a new account'}
        </h2>

        <div className="grid gap-5">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-5 py-3 border border-slate-300 rounded-lg text-base text-slate-800 outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              value={form.name}
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-5 py-3 border border-slate-300 rounded-lg text-base text-slate-800 outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-5 py-3 border border-slate-300 rounded-lg text-base text-slate-800 outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="w-full mt-6 py-3 rounded-lg font-semibold text-white text-lg shadow-md transition-all"
          style={{
            background: 'linear-gradient(to right, #3b82f6, #6366f1)',
            opacity: loading ? 0.7 : 1,
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
        </motion.button>

        <div className="mt-4 text-center text-sm text-slate-500">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            className="text-blue-600 hover:underline cursor-pointer font-medium"
            onClick={toggleMode}
          >
            {isLogin ? 'Register' : 'Login'}
          </span>
        </div>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-center text-sm font-medium text-red-600"
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default LoginModal;
