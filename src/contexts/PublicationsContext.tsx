import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/constants/base';
;

interface Publication {
  _id: string;
  year: number;
  authors: string;
  title: string;
  journal: string;
  volume?: string;
  issue?: string;
  pages?: string;
}

const PublicationsContext = createContext<Publication[]>([]);

export const PublicationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/publications`)
      .then(res => setPublications(res.data))
      .catch(err => console.error('Failed to fetch publications:', err));
  }, []);

  return (
    <PublicationsContext.Provider value={publications}>
      {children}
    </PublicationsContext.Provider>
  );
};

export const usePublications = () => useContext(PublicationsContext);
