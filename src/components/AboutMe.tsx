import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { COLORS } from '@/constants/colors';

const AboutMe: React.FC = () => {
  return (
    <section className="w-full px-4 py-16 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-white text-slate-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Left Image */}
        <motion.div
          className="w-full md:w-[350px] h-[350px] flex-shrink-0 overflow-hidden rounded-2xl shadow-lg border border-slate-200"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://media-del1-2.cdn.whatsapp.net/v/t61.24694-24/473397809_29023379657308623_1084404693783406138_n.jpg?ccb=11-4&oh=01_Q5Aa1wFlnCX3_2-MpRHyQpSHwTsdML0AHL0EGFlEz9Ty9Kao2g&oe=6870E9F3&_nc_sid=5e03e0&_nc_cat=102"
            alt="About Me"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            About <span style={{ color: COLORS.accent }}>Me</span>
          </h2>

          <p className="text-base sm:text-lg mb-6 max-w-2xl text-slate-600">
            I'm a passionate technologist, educator, and researcher dedicated to building meaningful digital
            experiences. With a focus on innovation, I enjoy working on scalable projects that push the boundaries of
            technology while empowering the next generation of creators.
          </p>

          <Button
            variant="default"
            className="text-sm sm:text-base px-6 py-3 rounded-xl transition hover:scale-[1.03]"
            style={{ backgroundColor: COLORS.accent, color: '#fff' }}
            onClick={() => (window.location.href = '/about')}
          >
            Read More
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
