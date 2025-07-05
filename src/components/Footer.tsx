import React from 'react';
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaTelegramPlane,
} from 'react-icons/fa';
import { COLORS } from '@/constants/colors';

const Footer: React.FC = () => {
  return (
    <footer style={{ backgroundColor: COLORS.primaryBg }} className="text-white pt-16 px-6 md:px-12">
      {/* Newsletter Section */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-semibold text-white">
          Stay in touch with us
        </h2>
        <p className="mt-2 text-slate-300">
          Receive the latest updates about our products & promotions
        </p>
        <div className="mt-6 flex justify-center gap-2 flex-col sm:flex-row items-center">
          <input
            type="email"
            placeholder="Your email"
            className="w-full sm:w-72 px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-slate-800"
          />
          <button
            className={`mt-2 sm:mt-0 px-6 py-2 rounded-md text-white font-medium transition ${COLORS.gradientAccent}`}
          >
            Subscribe
          </button>
        </div>
      </div>

      <hr className="border-slate-500" />

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
        {/* Column 1 */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-white">Prateek Bhatia</h3>
          <p className="text-slate-300">
            With a wide selection of fresh produce, pantry staples, and household essentials, we've got everything you need just a click away.
          </p>
          <div className="flex gap-4 mt-4 text-lg text-slate-300">
            <FaInstagram className="hover:text-pink-500 transition" />
            <FaFacebookF className="hover:text-blue-500 transition" />
            <FaTwitter className="hover:text-sky-400 transition" />
            <FaTelegramPlane className="hover:text-blue-400 transition" />
            <FaWhatsapp className="hover:text-green-400 transition" />
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-white">Categories</h3>
          <ul className="text-slate-300 space-y-2">
            <li>Weekly sale</li>
            <li>Special price</li>
            <li>Easter is coming</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-white">Company</h3>
          <ul className="text-slate-300 space-y-2">
            <li>Blog and news</li>
            <li>About us</li>
            <li>FAQ page</li>
            <li>Contact us</li>
            <li>Careers</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-white">Account</h3>
          <ul className="text-slate-300 space-y-2">
            <li>Your account</li>
            <li>Shipping & policies</li>
            <li>Refunds & replacements</li>
            <li>Order tracking</li>
            <li>Delivery info</li>
            <li>Taxes & fees</li>
          </ul>
        </div>

        {/* Column 5 */}
        <div>
          <h3 className="text-lg font-bold mb-3 text-white">Customer Service</h3>
          <ul className="text-slate-300 space-y-2">
            <li>Payment methods</li>
            <li>Money back guarantee</li>
            <li>Refunds & replacements</li>
            <li>Order tracking</li>
            <li>Delivery info</li>
            <li>Shipping</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
