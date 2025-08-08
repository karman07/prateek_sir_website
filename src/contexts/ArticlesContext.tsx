"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/constants/base";

export type Article = {
  year: number;
  authors: string;
  title: string;
  publication: string;
  monthYear: string;
};

const ArticlesContext = createContext<Article[]>([]);

export const ArticlesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/articles`) // Change to your API URL
      .then((res) => setArticles(res.data))
      .catch((err) => console.error("Error fetching articles:", err));
  }, []);

  return <ArticlesContext.Provider value={articles}>{children}</ArticlesContext.Provider>;
};

export const useArticles = () => useContext(ArticlesContext);
