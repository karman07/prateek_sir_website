import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { COLORS } from '@/constants/colors';

const Navbar: React.FC = () => {
  const [active, setActive] = useState('features');
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ['Home', 'Books', 'Courses', 'Contact Us'];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 px-6 sm:px-10 py-4 backdrop-blur-md border-b border-white/10"
      style={{ backgroundColor: COLORS.overlay, color: COLORS.textPrimary }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
       
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
          Prateek Bhatia
        </h1>

       
        <ul className="hidden md:flex gap-8 font-medium text-sm sm:text-base">
          {navItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => setActive(item)}
                className={`capitalize transition duration-300 ${
                  active === item
                    ? `text-[${COLORS.activeNav}] underline underline-offset-4`
                    : 'text-white hover:text-blue-300'
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 px-2">
          <ul className="flex flex-col gap-4 bg-white/5 p-4 rounded-lg shadow-lg border border-white/10">
            {navItems.map((item) => (
              <li key={item}>
                <button
                  onClick={() => {
                    setActive(item);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left capitalize transition duration-300 ${
                    active === item
                      ? `text-[${COLORS.activeNav}] underline underline-offset-4`
                      : 'text-white hover:text-blue-300'
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
