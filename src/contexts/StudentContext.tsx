import React, { createContext, useContext } from 'react';

type Student = {
  _id: string;
  name: string;
  thesisTitle: string;
  degree: 'PhD' | 'Masters';
  year: string;
  image: string;
};

const students: Student[] = [
  {
    _id: '1',
    name: 'Dr. Anjali Verma',
    thesisTitle: 'AI in Healthcare Applications',
    degree: 'PhD',
    year: '2023',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    _id: '2',
    name: 'Dr. Rahul Sharma',
    thesisTitle: 'Blockchain for Secure Medical Records',
    degree: 'PhD',
    year: '2022',
    image: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
  {
    _id: '3',
    name: 'Dr. Sneha Kapoor',
    thesisTitle: 'Edge Computing for Smart Cities',
    degree: 'PhD',
    year: '2023',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    _id: '4',
    name: 'Megha Kapoor',
    thesisTitle: 'Deep Learning in NLP',
    degree: 'Masters',
    year: '2024',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    _id: '5',
    name: 'Amit Joshi',
    thesisTitle: 'Data Privacy in Federated Learning',
    degree: 'Masters',
    year: '2023',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
  },
  {
    _id: '6',
    name: 'Ritika Sen',
    thesisTitle: 'AI for Social Media Monitoring',
    degree: 'Masters',
    year: '2024',
    image: 'https://randomuser.me/api/portraits/women/51.jpg',
  },
  {
    _id: '7',
    name: 'Ritika Sen',
    thesisTitle: 'AI for Social Media Monitoring',
    degree: 'Masters',
    year: '2024',
    image: 'https://randomuser.me/api/portraits/women/51.jpg',
  },
];

const StudentContext = createContext<Student[]>([]);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <StudentContext.Provider value={students}>{children}</StudentContext.Provider>;
};

export const useStudents = () => useContext(StudentContext);
