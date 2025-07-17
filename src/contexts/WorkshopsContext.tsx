import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/constants/base';

export interface Workshop {
  _id?: string;
  year: number;
  events: string[];
}

interface WorkshopsContextProps {
  workshops: Workshop[];
}

const WorkshopsContext = createContext<WorkshopsContextProps | undefined>(undefined);

// Fallback static data
const fallbackWorkshops: Workshop[] = [
  {
    year: 2017,
    events: [
      "Leadership Summit, ISB Mohali, 22-23 Sept 2017.",
      "IGC-I4I-ISI India Development Policy Conference, 13 July 2017, New Delhi.",
    ],
  },
  {
    year: 2016,
    events: [
      "MHRD-GIAN program on “Smart Sensors and Internet of Things” conducted by Faculty of Electrical Engineering of Jamia Millia Islamia University, New Delhi from 21st – 31st March’2016.",
    ],
  },
  {
    year: 2015,
    events: [
      "Faculty Enablement Program on Campus Connect “Big Data and Analytics” from 21st to 25th September 2015 at Chandigarh College of Engineering & Technology.",
      "Workshop on Big Data Analytics at Indian Statistical Institute Kolkata Co-organized by ACM Student Chapter August 20-21, 2015.",
    ],
  },
];

export const WorkshopsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);

  const fetchWorkshops = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/workshops`);
      setWorkshops(data.length > 0 ? data : fallbackWorkshops);
    } catch (error) {
      console.error('Failed to fetch workshops:', error);
      setWorkshops(fallbackWorkshops);
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  return (
    <WorkshopsContext.Provider value={{ workshops }}>
      {children}
    </WorkshopsContext.Provider>
  );
};

export const useWorkshops = () => {
  const context = useContext(WorkshopsContext);
  if (!context) throw new Error('useWorkshops must be used within WorkshopsProvider');
  return context;
};
