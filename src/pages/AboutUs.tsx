import React from 'react';
import { motion } from 'framer-motion';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-white mt-16 py-16 px-6 md:px-24 flex flex-col md:flex-row items-center justify-between gap-12">
      {/* Left Content with Animation */}
      <motion.div
        className="md:w-1/2"
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-6 text-[#0B1F3A]">About Dr. Kumar Bhatia</h2>
        <div className="text-slate-700 text-base leading-7 space-y-4">
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

      {/* Right Image with Animation */}
      <motion.div
        className="md:w-1/2 flex justify-center"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <img
          src="https://media-del1-2.cdn.whatsapp.net/v/t61.24694-24/473397809_29023379657308623_1084404693783406138_n.jpg?ccb=11-4&oh=01_Q5Aa1wFlnCX3_2-MpRHyQpSHwTsdML0AHL0EGFlEz9Ty9Kao2g&oe=6870E9F3&_nc_sid=5e03e0&_nc_cat=102"
          alt="Dr. Parteek Bhatia"
          className="rounded-3xl shadow-xl w-full max-w-md object-cover"
        />
      </motion.div>
    </div>
  );
};

export default AboutUs;
