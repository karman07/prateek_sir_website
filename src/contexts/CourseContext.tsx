import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/constants/base';

export interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  instructor: string;
  duration: string;
  level: string;
  lessons: number;
  badge?: string;
  link?: string;
  priority?: number; // New field
}

const CourseContext = createContext<Course[]>([]);

export const useCourses = () => useContext(CourseContext);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get<Course[]>(`${BASE_URL}/courses`);
        // Always default priority to 0 and then sort
        const sortedCourses = res.data
          .map(course => ({
            ...course,
            priority: course.priority ?? 0, // ensure never undefined
          }))
          .sort((a, b) => b.priority! - a.priority!); // higher first
        setCourses(sortedCourses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        setCourses([]); // still return empty array if error
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-500">Loading courses...</p>
        </div>
      </div>
    );
  }

  return <CourseContext.Provider value={courses}>{children}</CourseContext.Provider>;
};
