import React, { useState } from 'react';
import axios from 'axios';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { firebaseApp } from '@/firebase/firebase';
import { X } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { COLORS } from '@/constants/colors';
import { BASE_URL } from '@/constants/base';

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

interface Props {
  onClose: () => void;
}

const LoginModal: React.FC<Props> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [verifyDialog, setVerifyDialog] = useState(false);
  const [verifyLink, setVerifyLink] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const toggleMode = () => {
    setForm({ name: '', email: '', password: '' });
    setIsLogin(!isLogin);
    setMessage('');
    setVerifyDialog(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');
    setVerifyDialog(false);
    try {
      const url = isLogin ? `${BASE_URL}/auth/login` : `${BASE_URL}/auth/register`;
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : {
            ...form,
            role: 'user',
          };
      const res = await axios.post(url, payload);

      if (!isLogin && res.data?.emailVerificationLink) {
        setVerifyLink(res.data.emailVerificationLink);
        setVerifyDialog(true);
      } else {
        setMessage(res.data.message || 'Success');
      }
    } catch (err: any) {
      setMessage(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setVerifyDialog(false);
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const res = await axios.post(`${BASE_URL}/auth/firebase-login`, { idToken });
      setMessage('Google login successful');
    } catch (err: any) {
      setMessage(err?.response?.data?.message || 'Google sign-in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[90%] max-w-xl p-10 relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6 text-slate-800">
          {isLogin ? 'Login to your account' : 'Create a new account'}
        </h2>

        <div className="grid gap-5">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg text-base outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={form.name}
              onChange={handleChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-base outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg text-base outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button
          className="w-full mt-6 py-3 rounded-lg font-medium text-white transition duration-300 text-lg"
          style={{
            backgroundColor: COLORS.primaryBg,
            opacity: loading ? 0.7 : 1,
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
        </button>

        <button
          className="mt-4 w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-100 text-base flex items-center justify-center gap-2"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        <div className="mt-4 text-center text-sm text-gray-500">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={toggleMode}
          >
            {isLogin ? 'Register' : 'Login'}
          </span>
        </div>

        {message && (
          <p className="mt-4 text-center text-sm text-red-500">{message}</p>
        )}

        {verifyDialog && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-md text-sm">
            A verification email has been sent to your email address. Please verify to activate your account.
            <br />
            <a
              href={verifyLink}
              className="text-blue-600 underline mt-1 inline-block"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click here to open verification link
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
