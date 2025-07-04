import React, { createContext, useContext } from 'react';

export interface Course {
  _id: string
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

const courses: Course[] = [
  {
    _id: '1',
    title: 'The Ultimate Guide to Python for Beginners',
    description: 'Learn Python programming from scratch in this step-by-step series.',
    thumbnail: 'https://img.youtube.com/vi/_uQrJ0TkZlc/hqdefault.jpg',
    instructor: 'Parteek Bhatia',
    duration: '18h 30m',
    level: 'Beginner',
    lessons: 120,
    badge: 'Free',
    link: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
  },
  {
    _id: '2',
    title: 'Data Science Full Course - Parteek Bhatia',
    description: 'Master data science using real-world projects and in-depth concepts.',
    thumbnail: 'https://img.youtube.com/vi/tPYj3fFJGjk/hqdefault.jpg',
    instructor: 'Parteek Bhatia',
    duration: '25h',
    level: 'Intermediate',
    lessons: 95,
    badge: 'YouTube',
    link: 'https://www.youtube.com/watch?v=tPYj3fFJGjk',
  },
  {
    _id: '3',
    title: 'Machine Learning Bootcamp with Python',
    description: 'Comprehensive course on ML algorithms with hands-on projects.',
    thumbnail: 'https://img.youtube.com/vi/GwIo3gDZCVQ/hqdefault.jpg',
    instructor: 'Parteek Bhatia',
    duration: '22h',
    level: 'Intermediate',
    lessons: 110,
    badge: 'Watch Now',
    link: 'https://www.youtube.com/watch?v=GwIo3gDZCVQ',
  },
  {
    _id: '4',
    title: 'Machine Learning Bootcamp with Python',
    description: 'Comprehensive course on ML algorithms with hands-on projects.',
    thumbnail: 'https://img.youtube.com/vi/GwIo3gDZCVQ/hqdefault.jpg',
    instructor: 'Parteek Bhatia',
    duration: '22h',
    level: 'Intermediate',
    lessons: 110,
    badge: 'Watch Now',
    link: 'https://www.youtube.com/watch?v=GwIo3gDZCVQ',
  },
  
];

const CourseContext = createContext<Course[]>(courses);

export const useCourses = () => useContext(CourseContext);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <CourseContext.Provider value={courses}>{children}</CourseContext.Provider>;
};
