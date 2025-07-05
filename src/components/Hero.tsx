import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { COLORS } from '@/constants/colors';

const slides = [
  {
    background:
      'https://media.licdn.com/dms/image/v2/D5622AQF9TYwsurVDcA/feedshare-shrink_2048_1536/B56Zew5I3eHQAo-/0/1751019458925?e=1754524800&v=beta&t=XrJlePBvu6YX-ZstNzMPzOVbnMPiPHMZ8XKhpH1bJfo',
    title: 'About Me',
    description: 'Learn about my background, experience, and journey so far.',
    link: '/about',
  },
  {
    background:
      'https://media.licdn.com/dms/image/v2/D5622AQHIPG3oA3J3rg/feedshare-shrink_2048_1536/B56Zew5I4lGQAo-/0/1751019459774?e=1754524800&v=beta&t=HuXcDfZGH3kqOnGwtNGmkbZZ8yZu85xDf-DjLwcVnXw',
    title: 'My Books',
    description: 'Explore the books I’ve authored on technology and innovation.',
    link: '/books',
  },
  {
    background:
      'https://media.licdn.com/dms/image/v2/D5622AQFZwrGmSxja3g/feedshare-shrink_2048_1536/B56Zew5I4rGQAs-/0/1751019460128?e=1754524800&v=beta&t=uoHdZwNTZQ-SUYf3vbD9XA7lENDuujvwXQTBmwS2lsQ',
    title: 'My Research',
    description: 'Dive into my published research and academic contributions.',
    link: '/research',
  },
];

const Hero: React.FC = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden px-6 sm:px-10">
      {/* Background image with fade transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slides[index].background})` }}
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.3, scale: 1.02 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60 z-10" />

      {/* Content */}
      <motion.div
        className="z-20 text-center max-w-xl p-6 sm:p-10 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.45)',
          color: COLORS.textPrimary,
        }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <AnimatePresence mode="wait">
          <motion.h1
            key={`title-${index}`}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-snug"
            style={{ color: COLORS.gradientAccent}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {slides[index].title}
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={`desc-${index}`}
            className="text-base sm:text-lg md:text-xl text-white/80 mb-6 px-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {slides[index].description}
          </motion.p>
        </AnimatePresence>

        <motion.div
          key={`btn-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="default"
            className="px-6 py-3 rounded-xl text-base font-semibold hover:scale-105 transition-transform duration-300 shadow-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
            onClick={() => navigate(slides[index].link)}
          >
            Learn More
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
