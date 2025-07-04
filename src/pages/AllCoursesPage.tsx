import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import CourseCard from '@/components/CourseCard';
import { useCourses } from '@/contexts/CourseContext';
import { COLORS } from '@/constants/colors';

const AllCoursesPage: React.FC = () => {
  const courses = useCourses();
  const [search, setSearch] = useState('');

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white px-4 py-28 md:px-8 flex flex-col items-center">
      {/* Heading */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-12 text-slate-800"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Explore <span style={{ color: COLORS.accent }}>Courses</span>
      </motion.h1>

      {/* Search */}
      <div className="w-full max-w-xl mb-16 relative">
        <Search className="absolute left-3 top-3 text-slate-400" size={20} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search courses by title..."
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Course Grid */}
      {filteredCourses.length === 0 ? (
        <p className="text-center text-slate-500 text-lg">No courses found.</p>
      ) : (
        <div className="w-full max-w-screen-xl px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 justify-items-center">
            {filteredCourses.map((course, idx) => (
              <div key={course._id} className="w-full flex justify-center">
                <CourseCard course={course} idx={idx} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCoursesPage;
