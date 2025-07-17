import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/constants/base';

type Student = {
  _id: string;
  name: string;
  thesisTitle: string;
  degree: 'PhD' | 'Masters';
  year: string;
  image?: string; 
};

const staticStudents: Student[] = [
  {
    _id: '1',
    name: 'Mr. Varinderpal Singh',
    thesisTitle: 'Word Sense Disambiguation for Punjabi Language',
    degree: 'PhD',
    year: '2013',
    image: 'https://parteekbhatia.com/wp-content/uploads/2019/04/Cheque_2.jpg',
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
    name: 'Dr.Sawinder Kaur',
    thesisTitle: 'Fake Content Detection System for Multimodal',
    degree: 'PhD',
    year: '2018',
    image: 'https://parteekbhatia.com/wp-content/uploads/2019/04/1.jpg',
  },
  {
    _id: '4',
    name: 'Anjuman Chawla',
    thesisTitle: 'UNL Punjabi Deconverter',
    degree: 'Masters',
    year: '2006',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    _id: '5',
    name: 'Anjali Gupta',
    thesisTitle: 'A Multilingual Meaning Based Search Engine',
    degree: 'Masters',
    year: '2006',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
  },
  {
    _id: '6',
    name: 'Gaurav Gupta',
    thesisTitle: 'Morphology and Case Marking for UNL-Punjabi Deconverter',
    degree: 'Masters',
    year: '2007',
    image: '',
  },
  {
    _id: '7',
    name: 'Amandeep Kaur',
    thesisTitle: 'Punjabi Language Interface to Database',
    degree: 'Masters',
    year: '2007',
    image: 'https://randomuser.me/api/portraits/women/51.jpg',
  },
];

const StudentContext = createContext<Student[]>([]);

export const StudentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(staticStudents);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get<Student[]>(`${BASE_URL}/students`);
        if (res.data && res.data.length > 0) {
          setStudents(res.data);
        } else {
          console.warn('No student data from API, using static data.');
        }
      } catch (error) {
        console.error('Error fetching students from API:', error);
        // fallback to static data
      }
    };

    fetchStudents();
  }, []);

  return <StudentContext.Provider value={students}>{children}</StudentContext.Provider>;
};

export const useStudents = () => useContext(StudentContext);
