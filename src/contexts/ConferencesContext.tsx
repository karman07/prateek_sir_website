"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants/base";

// Type for a conference
export interface Conference {
  _id?: string;
  year: number;
  authors: string;
  title: string;
  venue?: string;
  location?: string;
  details?: string;
}

const ConferencesContext = createContext<Conference[]>([]);

export const ConferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get<Conference[]>(`${BASE_URL}/conferences`);
        setConferences(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchConferences();
  }, []);

  return (
    <ConferencesContext.Provider value={conferences}>
      {loading && <p className="text-center text-gray-500">Loading conferences...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && children}
    </ConferencesContext.Provider>
  );
};

export const useConferences = () => useContext(ConferencesContext);
