import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import axios from 'axios';
import { BASE_URL } from '@/constants/base';

export interface Poem {
  _id: string; // from MongoDB
  title: string;
  content: string;
  youtubeLink: string;
}

const PoemContext = createContext<Poem[]>([]);

export const usePoems = () => useContext(PoemContext);

export const PoemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [poems, setPoems] = useState<Poem[]>([]);

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const response = await axios.get<Poem[]>(`${BASE_URL}/poems`);
        setPoems(response.data);
      } catch (error) {
        console.error('Failed to fetch poems:', error);
      }
    };

    fetchPoems();
  }, []);

  return <PoemContext.Provider value={poems}>{children}</PoemContext.Provider>;
};
