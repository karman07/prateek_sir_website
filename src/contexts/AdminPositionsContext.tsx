import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/constants/base';

interface Position {
  _id?: string;
  description: string;
}

interface AdminPositionsContextProps {
  positions: Position[];
}

const AdminPositionsContext = createContext<AdminPositionsContextProps | undefined>(undefined);

// 🔒 Static fallback data
const defaultPositions: Position[] = [
  { description: 'Associate Dean of Student Affairs from July 2018 to July 2020.' },
  { description: 'Associate Coordinating Warden from Sept 2016 to July 2018.' },
  { description: 'Warden of Hostel-J from February 2011 to August 2016.' },
  { description: 'PhD Coordinator of Department.' },
  { description: 'President of Creative Computing Society from March 2012 to Feb 2014.' },
  { description: 'Vice-President of Pratigya from March 2012.' },
  { description: 'Time table Coordinator of Department from 2006 to 2013.' },
  { description: 'Vice-President of Creative Computing Society from 2010 to February 2012.' },
  { description: 'Warden of Hostel-H from August 2010 to February 2011.' },
  { description: 'Officiating Warden of Hostel-H from February 2010 to August 2011.' },
];

export const AdminPositionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [positions, setPositions] = useState<Position[]>([]);

  const fetchPositions = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/positions`);
      if (Array.isArray(data) && data.length > 0) {
        setPositions(data);
      } else {
        setPositions(defaultPositions);
      }
    } catch (err) {
      console.error('Failed to fetch positions, using static fallback data.');
      setPositions(defaultPositions);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  return (
    <AdminPositionsContext.Provider value={{ positions }}>
      {children}
    </AdminPositionsContext.Provider>
  );
};

export const useAdminPositions = () => {
  const context = useContext(AdminPositionsContext);
  if (!context) throw new Error('useAdminPositions must be used within AdminPositionsProvider');
  return context;
};
