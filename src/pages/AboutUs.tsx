import React from 'react';
import { motion } from 'framer-motion';
import { useAdminPositions } from '../contexts/AdminPositionsContext';
import Image2 from '../assets/image.png'

const AboutPage: React.FC = () => {
  const { positions } = useAdminPositions();

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
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-[#0B1F3A] leading-snug">
            About Dr. Kumar Bhatia
          </h2>
          <div className="text-slate-700 text-base leading-7 space-y-5">
            <p>
              Machine Learning, Explainable AI, Large Language Models, and AI Applications for Social Good. He is the
              recipient of the Young Faculty Research Fellowship from the Ministry of Electronics & Information Technology,
              Govt. of India.
            </p>
            <p>
              Dr. Kumar has demonstrated excellence in research, securing approximately $246,000 USD in funding from
              prestigious international and national agencies. He has published more than 100 research papers and articles
              in reputable journals, conferences, and magazines. He won Gold Medals at the UNL Olympiad II, III, and IV,
              conducted by the UNDL Foundation in 2013 and 2014.
            </p>
            <p>
              A well-known author, Dr. Bhatia has published textbooks on machine learning, databases and data mining. His
              latest book, <strong>Machine Learning with Python: Principles and Practical Techniques</strong>, was published
              by Cambridge University Press in 2025. He is also the author of popular books such as <em>Data Mining and Data
              Warehousing</em>, <em>Simplified Approach to DBMS</em>, <em>Visual Basic</em>, <em>Oracle</em>, and <em>NoSQL in
              a Day</em>.
            </p>
            <p>
              Dr. Kumar completed multiple research projects including “Automatic Generation of Sign Language from Hindi
              Text for Communication and Education of Hearing Impaired People”, and projects funded by the Royal Academy of
              Engineering (UK) and the Government of India.
            </p>
            <p>
              Passionate about teaching the masses through modern platforms like MOOCs, Dr. Bhatia runs multiple online
              courses on Udemy with over 45,000 students. He also manages a YouTube channel, “Parteek Bhatia: Simplifying
              Computer Education,” where he shares sessions on Machine Learning, Big Data, DBMS, SQL, PL/SQL, and NoSQL.
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
            className="rounded-3xl shadow-2xl max-w-md w-full object-cover border border-slate-200"
          />
        </motion.div>
      </div>

      {/* Administrative Positions */}
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-4xl font-bold mb-12 text-[#0B1F3A]">
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
