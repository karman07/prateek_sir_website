import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '@/constants/colors';

export interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  duration: string;
  level: string;
  lessons: number;
  badge?: string;
  link?: string;
}

const CourseCard: React.FC<{ course: Course; idx?: number }> = ({ course, idx = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: idx * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-md overflow-hidden relative hover:shadow-lg transition duration-300 border border-slate-200 w-[360px] h-[500px] flex flex-col"
    >
      {/* Badge */}
      {course.badge && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-md z-10">
          {course.badge}
        </div>
      )}

      {/* Thumbnail */}
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-4">
        <div className="space-y-2">
          <h3 className="font-bold text-lg text-slate-800 line-clamp-2">{course.title}</h3>
          <p className="text-sm text-slate-600 line-clamp-2">{course.description}</p>

          <div className="flex items-center text-xs text-slate-500 gap-4 mt-2">
            <span>👨‍🏫 {course.instructor}</span>
            <span>🧭 {course.level}</span>
          </div>

          <div className="flex items-center text-xs text-slate-500 gap-4">
            <span>⏱️ {course.duration}</span>
            <span>📚 {course.lessons} lessons</span>
          </div>
        </div>

        <div className="mt-4">
          <a
            href={course.link || '#'}
            target="_blank"
            className="block w-full bg-slate-100 hover:bg-slate-200 text-center text-sm font-medium py-2 rounded-md transition"
            style={{ color: COLORS.primaryBg }}
          >
            View Course
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
