import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/constants/base';

export interface Chapter {
  _id?: string;
  chapter: string;
  book: string;
  type: string;
  fileUrl: string;
}

interface ChapterContextType {
  chapters: Chapter[];
}

const ChapterContext = createContext<ChapterContextType | undefined>(undefined);

const fallbackChapters: Chapter[] = [
  { chapter: "Beginning with Machine Learning", book: "ML Basics", type: "PPT", fileUrl: "#" },
  { chapter: "Introduction to Data Mining", book: "Data Mining and Data Warehousing: Principles and Practical Techniques", type: "PDF", fileUrl: "#" },
  { chapter: "Beginning with Weka and R", book: "ML Basics", type: "PPT", fileUrl: "#" },
];

export const ChapterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const fetchChapters = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/chapters`);
      setChapters(data.length > 0 ? data : fallbackChapters);
    } catch {
      setChapters(fallbackChapters);
    }
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  return (
    <ChapterContext.Provider value={{ chapters }}>
      {children}
    </ChapterContext.Provider>
  );
};

export const useChapters = () => {
  const context = useContext(ChapterContext);
  if (!context) throw new Error("useChapters must be used within ChapterProvider");
  return context;
};
