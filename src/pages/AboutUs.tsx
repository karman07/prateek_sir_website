import React from 'react';
import { motion } from 'framer-motion';
import { useAdminPositions } from '../contexts/AdminPositionsContext';
import {
  BookOpen,
  Award,
  GraduationCap,
  Rocket,
  Zap,
} from 'lucide-react';
import Image2 from '../assets/image.png';

const AboutPage: React.FC = () => {
  const { positions } = useAdminPositions();

  const sectionTitle = (Icon: any, color: string, title: string) => (
    <h3 className="text-3xl font-bold text-[#0B1F3A] flex items-center gap-3 border-b border-slate-200 pb-2">
      <Icon className={color} /> {title}
    </h3>
  );

  return (
    <div className="bg-gradient-to-br from-white via-slate-50 to-white text-slate-800 min-h-screen px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-20 space-y-28">
      
      {/* About Section */}
      <div className="flex flex-col md:flex-row items-center gap-12">
        {/* Left Content */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-[#0B1F3A] leading-snug">
            Dr. Parteek Kumar Bhatia
          </h2>
          <p className="text-lg text-indigo-600 font-medium mb-8">
            AI Researcher | Professor | Author | NVIDIA Gold Tier Ambassador
          </p>

          <div className="text-slate-700 text-base leading-7 space-y-5">
            <p>
              Dr. Parteek Kumar Bhatia is an Associate Professor in the School of
              Electrical Engineering and Computer Science at Washington State
              University (WSU), Pullman, WA, USA. 
            </p>
            <p>
              Prior to joining WSU, he served as a Professor and Associate Dean of
              Student Affairs at the Thapar Institute of Engineering and Technology,
              Patiala, India. He has also held visiting faculty positions at Whitman
              College, USA, and the LAMBDA Lab at Tel Aviv University, Israel.
            </p>
            <p>
              He holds a Ph.D. in Computer Science from Thapar Institute, a
              Master’s degree from BITS Pilani, and completed postdoctoral research
              at Tel Aviv University. He is a recipient of the prestigious Young
              Faculty Research Fellowship from the Ministry of Electronics &
              Information Technology, Government of India.
            </p>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src={Image2}
            alt="Dr. Parteek Bhatia"
            className="rounded-3xl shadow-xl max-w-md w-full object-cover border border-slate-200"
          />
        </motion.div>
      </div>

      {/* Research & Impact */}
      <motion.div
        className="space-y-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {sectionTitle(Rocket, 'text-indigo-500', 'Research & Impact')}
        <p className="text-slate-700 leading-7">
          Dr. Bhatia’s research focuses on Machine Learning, Explainable AI (XAI),
          Large Language Models (LLMs), and AI for Social Good. He has secured
          approximately $246,000 USD in competitive research funding and authored
          over 100 publications. He is a Gold Medalist at the UNL Olympiads II, III,
          and IV, and a Gold Tier NVIDIA Deep Learning Institute Campus Ambassador.
          As of June 2025, he has trained 517 students worldwide through NVIDIA
          workshops.
        </p>
      </motion.div>

      {/* Selected Research Projects */}
      <motion.div
        className="space-y-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {sectionTitle(Zap, 'text-pink-500', 'Selected Research Projects')}
        <ul className="list-disc pl-6 space-y-2 text-slate-700">
          <li>Automatic Generation of Sign Language from Hindi Text.</li>
          <li>Digital Village: AI-based precision agriculture for small farms.</li>
          <li>
            Indradhanush: Integrated WordNet for Indian Languages enabling cross-lingual semantic access.
          </li>
          <li>Collaborative projects on inclusive education and sustainable agriculture.</li>
        </ul>
      </motion.div>

      {/* Books Authored */}
      <motion.div
        className="space-y-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {sectionTitle(BookOpen, 'text-green-500', 'Books Authored')}
        <ul className="list-disc pl-6 space-y-2 text-slate-700">
          <li>Machine Learning with Python: Principles and Practical Techniques</li>
          <li>Data Mining and Data Warehousing</li>
          <li>Simplified Approach to Database Management System</li>
          <li>Simplified Approach to Oracle</li>
          <li>NoSQL in a Day</li>
        </ul>
      </motion.div>

      {/* Educational Outreach */}
      <motion.div
        className="space-y-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {sectionTitle(GraduationCap, 'text-orange-500', 'Educational Outreach')}
        <p className="text-slate-700 leading-7">
          Dr. Bhatia teaches online MOOCs on Udemy with over 45,000 learners. His
          YouTube channel, “Parteek Bhatia: Simplifying Computer Education,”
          features tutorials in Machine Learning, Big Data, DBMS, SQL, PL/SQL, and
          NoSQL.
        </p>
      </motion.div>

      {/* Quick Highlights */}
      <motion.div
        className="space-y-6 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {sectionTitle(Award, 'text-yellow-500', 'Quick Highlights')}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700">
          <li>🏆 Young Faculty Research Fellow, MeitY, Govt. of India</li>
          <li>🎖 Gold Tier NVIDIA DLI Ambassador</li>
          <li>💰 $246K+ Research Funding Secured</li>
          <li>📚 100+ Publications | 6 Books</li>
          <li>🌐 Global Outreach: USA, India, Israel, UK</li>
        </ul>
      </motion.div>

      {/* Administrative Positions */}
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-3xl font-bold mb-8 text-[#0B1F3A]">
          Administrative Positions
        </h3>
        <ul className="space-y-4 text-left">
          {positions.map((pos) => (
            <li
              key={pos._id}
              className="bg-white border border-slate-200 rounded-xl px-6 py-4 shadow hover:shadow-md transition"
            >
              <span className="text-slate-700">{pos.description}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default AboutPage;
