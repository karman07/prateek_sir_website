import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/constants/base'; 

export interface ResearchProject {
  _id: string;
  title: string;
  amount: string;
  fundingAgency: string;
  scheme: string;
  duration: string;
  investigators: string;
  discription: string;
  link?: string;
}

const ResearchContext = createContext<ResearchProject[]>([]);

export const useResearch = () => useContext(ResearchContext);

export const ResearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [researchProjects, setResearchProjects] = useState<ResearchProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchResearchProjects = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/research-projects`);
        setResearchProjects(res.data);
      } catch (error) {
        console.error('Failed to fetch research projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResearchProjects();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-16 text-lg text-slate-500 animate-pulse">
        Loading research projects...
      </div>
    );
  }

  return (
    <ResearchContext.Provider value={researchProjects}>
      {children}
    </ResearchContext.Provider>
  );
};
