import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[75vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden px-4">
      {/* Background slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index + '-bg'}
          className="absolute inset-0 bg-cover bg-[center_top] sm:bg-center z-0"
          style={{ backgroundImage: `url(${slides[index].background})` }}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.01 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{ backgroundColor: COLORS.overlay }}
      />

      {/* Content */}
      <motion.div
        className="z-20 text-center max-w-md md:max-w-xl mx-auto backdrop-blur-sm px-4 py-6 sm:px-6 sm:py-8 rounded-2xl border shadow-lg"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          color: COLORS.textPrimary,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <AnimatePresence mode="wait">
          <motion.h1
            key={index + '-title'}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 leading-tight h-[60px]"
            style={{ color: COLORS.accent }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {slides[index].title}
          </motion.h1>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.p
            key={index + '-desc'}
            className="text-sm sm:text-base md:text-lg mb-5 px-2"
            style={{ color: COLORS.textMuted }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {slides[index].description}
          </motion.p>
        </AnimatePresence>

        <motion.div
          key={index + '-btn'}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="default"
            className="text-sm sm:text-base px-5 py-3 rounded-xl transition hover:scale-[1.03]"
            style={{ backgroundColor: COLORS.accent, color: '#fff' }}
            onClick={() => (window.location.href = slides[index].link)}
          >
            Learn More
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
