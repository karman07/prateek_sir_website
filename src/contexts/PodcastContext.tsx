import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/constants/base';

export interface Podcast {
  _id: string;
  topic: string;
  place: string;
  date: string;
}

const PodcastContext = createContext<Podcast[]>([]);
const PodcastLoadingContext = createContext<boolean>(false);

export const usePodcasts = () => useContext(PodcastContext);
export const usePodcastsLoading = () => useContext(PodcastLoadingContext);

export const PodcastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const res = await axios.get<Podcast[]>(`${BASE_URL}/podcasts`);
        setPodcasts(res.data);
      } catch (err) {
        console.error('Failed to fetch podcasts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  return (
    <PodcastContext.Provider value={podcasts}>
      <PodcastLoadingContext.Provider value={loading}>
        {children}
      </PodcastLoadingContext.Provider>
    </PodcastContext.Provider>
  );
};
