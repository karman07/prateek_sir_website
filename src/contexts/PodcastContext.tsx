// contexts/PodcastContext.tsx
import React, { createContext, useContext } from 'react';

export interface Podcast {
  _id: string;
  topic: string;
  place: string;
  date: string;
}

const podcastData: Podcast[] = [
  {
    _id: '1',
    topic:
      'Invited Talk on “Empowering Educators with GenAI” delivered during the online Faculty Induction Programme (Guru Dakshata)',
    place:
      'MMTTC, Indira Gandhi National Tribal University (IGNTU), Amarkantak, Madhya Pradesh',
    date: 'December 23, 2024',
  },
  {
    _id: '2',
    topic:
      'Webinar on "AI for Social Good" conducted for students and faculty of Technical Institutions',
    place: 'AICTE Training and Learning Academy (ATAL), New Delhi',
    date: 'January 15, 2025',
  },
];

const PodcastContext = createContext<Podcast[]>(podcastData);

export const usePodcasts = () => useContext(PodcastContext);

export const PodcastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <PodcastContext.Provider value={podcastData}>
      {children}
    </PodcastContext.Provider>
  );
};
