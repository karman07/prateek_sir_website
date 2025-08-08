import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { COLORS } from '@/constants/colors';
import { useNavigate } from 'react-router-dom';
import Image2 from '../assets/image.png';

const AboutMe: React.FC = () => {
  const navigate = useNavigate();

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
            src={Image2}
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
            About <span className={COLORS.gradientText}>Me</span>
          </h2>

          <div className="text-base sm:text-lg mb-6 max-w-2xl text-slate-600 space-y-4">
            <p>
              Dr. Parteek Kumar Bhatia is an Associate Professor at Washington State University
              and a recognized leader in Machine Learning, Explainable AI, and AI for Social Good.
            </p>
            <p>
              He previously served as Professor and Associate Dean at Thapar Institute of
              Engineering & Technology (TIET), Patiala, India, and held visiting positions at
              Whitman College (USA) and Tel Aviv University (Israel).
            </p>
            <p>
              A Gold Tier NVIDIA DLI Ambassador and recipient of the MeitY Young Faculty Research Fellowship,
              he has secured over $246K in competitive research funding and published 100+ papers.
            </p>
            <p>
              He is the author of bestselling textbooks, including
              <em> Machine Learning with Python </em> and
              <em> Data Mining and Data Warehousing </em> (both published by Cambridge University Press).
              His online courses have reached over 45,000 learners worldwide.
            </p>
            <p>
              Explore his research, books, and educational initiatives below.
            </p>
          </div>

          <Button
            variant="default"
            className={`text-sm sm:text-base px-6 py-3 rounded-xl transition hover:scale-[1.03] ${COLORS.gradientAccent}`}
            onClick={() => navigate('/about')}
          >
            Read More
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
