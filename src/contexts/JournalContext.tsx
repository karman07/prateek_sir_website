import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/constants/base';

export interface Journal {
  _id?: string;
  authors: string;
  title: string;
  journal: string;
  year: string;
  volume?: string;
  number?: string;
  pages: string;
}

interface JournalContextProps {
  journals: Journal[];
}

const JournalContext = createContext<JournalContextProps | undefined>(undefined);

const fallbackJournals: Journal[] = [
  {
    authors: 'Garg, Priya, M. K. Sharma, and Parteek Kumar.',
    title: '“Improving Hate Speech Classification Through Ensemble Learning and Explainable AI Techniques.”',
    journal: 'Arabian Journal for Science and Engineering',
    year: '2024',
    pages: '1-14',
  },
  {
    authors: 'Goyal, Kashish, Parteek Kumar, and Karun Verma.',
    title: '“Tomato ripeness and shelf-life prediction system using machine learning.”',
    journal: 'Journal of Food Measurement and Characterization',
    year: '2024',
    pages: '1-16',
  },
  {
    authors: 'Goyal, Kashish, Parteek Kumar, and Karun Verma.',
    title: '“XAI-empowered IoT multi-sensor system for real-time milk adulteration detection.”',
    journal: 'Food Control',
    year: '2024',
    pages: '110495',
  },
  {
    authors: 'Ghanaeim, Alaa, Evgeny Kagan, Parteek Kumar, Tal Raviv, Peter Glynn, and Irad Ben-Gal.',
    title: '“Unsupervised Classification under Uncertainty: The Distance-Based Algorithm.”',
    journal: 'Mathematics',
    year: '2023',
    volume: '11',
    number: '23',
    pages: '4784',
  },
];

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [journals, setJournals] = useState<Journal[]>([]);

  const fetchJournals = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/journals`);
      setJournals(data.length > 0 ? data : fallbackJournals);
    } catch (error) {
      console.error('Failed to fetch journals:', error);
      setJournals(fallbackJournals);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  return (
    <JournalContext.Provider value={{ journals }}>
      {children}
    </JournalContext.Provider>
  );
};

export const useJournals = () => {
  const context = useContext(JournalContext);
  if (!context) throw new Error('useJournals must be used within JournalProvider');
  return context;
};
