import React from 'react';
import CourseCard from './CourseCard';
import { useCourses } from '@/contexts/CourseContext';
import { COLORS } from '@/constants/colors';

const CourseList: React.FC = () => {
  const courses = useCourses();

  return (
    <section
      className="w-full px-4 py-16 sm:px-6 md:px-12 lg:px-20 xl:px-32"
      style={{ backgroundColor: '#fff', color: COLORS.textPrimary }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-slate-800">
          My Online <span style={{ color: COLORS.accent }}>Courses</span>
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
          {courses.map((course, idx) => (
            <CourseCard key={course.id} course={course} idx={idx} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/courses"
            className="inline-block text-white px-6 py-2 rounded-lg text-sm font-medium transition"
            style={{ backgroundColor: COLORS.accent }}
          >
            View More Courses →
          </a>
        </div>
      </div>
    </section>
  );
};

export default CourseList;
